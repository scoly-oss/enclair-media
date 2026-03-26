import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CRON_SECRET = process.env.CRON_SECRET || "";

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return Redis.fromEnv();
}

async function getSubscribers(): Promise<string[]> {
  const redis = await getRedis();
  const members = await redis.smembers("subscribers");
  return members as string[];
}

async function getLatestArticles() {
  // Import articles from the content system
  const { getAllArticles } = await import("@/lib/articles");
  const articles = getAllArticles();
  // Get articles from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return articles.filter((a) => new Date(a.date) >= oneWeekAgo).slice(0, 5);
}

function buildNewsletterHTML(articles: { title: string; slug: string; excerpt: string; category: string }[], issueNumber: number) {
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const articleBlocks = articles.map((a) => `
    <tr><td style="padding:0 0 28px;">
      <p style="margin:0 0 4px;font-size:12px;color:#c8a97e;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${a.category}</p>
      <h2 style="margin:0 0 10px;font-size:20px;color:#1a1a1a;line-height:1.3;"><a href="https://enclair.media/articles/${a.slug}" style="color:#1a1a1a;text-decoration:none;">${a.title}</a></h2>
      <p style="margin:0;font-size:15px;color:#555;line-height:1.6;">${a.excerpt}</p>
      <p style="margin:10px 0 0;"><a href="https://enclair.media/articles/${a.slug}" style="color:#1a1a1a;font-size:14px;font-weight:600;text-decoration:underline;">Lire →</a></p>
    </td></tr>
    <tr><td style="padding:0 0 28px;"><hr style="border:none;border-top:1px solid #eee;margin:0;"></td></tr>
  `).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;"><tr><td align="center" style="padding:20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;">
  <tr><td style="padding:40px 32px 24px;border-bottom:3px solid #1a1a1a;">
    <h1 style="margin:0;font-size:28px;font-weight:700;color:#1a1a1a;letter-spacing:-0.5px;">En Clair</h1>
    <p style="margin:8px 0 0;font-size:14px;color:#888;">Le droit et l'économie qui comptent · N°${issueNumber} · ${date}</p>
  </td></tr>
  <tr><td style="padding:32px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${articleBlocks || `<tr><td><p style="font-size:16px;color:#333;line-height:1.7;">Pas de nouveaux articles cette semaine. On revient vendredi prochain avec du contenu frais.</p></td></tr>`}
      <tr><td style="text-align:center;padding:24px 0;">
        <a href="https://enclair.media" style="display:inline-block;padding:14px 32px;background:#1a1a1a;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;border-radius:8px;">Tous les articles →</a>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:24px 32px;background:#f8f7f4;border-top:1px solid #eee;text-align:center;">
    <p style="margin:0 0 8px;font-size:13px;color:#999;">En Clair — Le droit et l'économie qui comptent.</p>
    <p style="margin:0 0 8px;font-size:13px;color:#999;">Édité par <a href="https://dairia-avocats.com" style="color:#888;">DAIRIA Avocats</a> · <a href="https://sofianecoly.com" style="color:#888;">Sofiane Coly</a></p>
    <p style="margin:0;font-size:12px;color:#bbb;">Vous recevez cet email car vous vous êtes inscrit sur enclair.media<br><a href="https://enclair.media/desinscrire" style="color:#bbb;">Se désinscrire</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers" });
    }

    const articles = await getLatestArticles();

    // Get issue number from Redis
    const redis = await getRedis();
    const issueNum = ((await redis.incr("newsletter:issue_number")) as number) || 1;

    const html = buildNewsletterHTML(
      articles.map((a) => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        category: a.category,
      })),
      issueNum
    );

    const subject = articles.length > 0
      ? `En Clair #${issueNum} — ${articles[0].title}`
      : `En Clair #${issueNum} — Votre brief hebdomadaire`;

    // Send to all subscribers (batch, max 50 per call)
    const batchSize = 50;
    let sent = 0;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "En Clair <newsletter@enclair.media>",
          to: batch,
          subject,
          html,
        }),
      });
      sent += batch.length;
    }

    // Notify Sofiane
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "En Clair <newsletter@enclair.media>",
        to: "s.coly@dairia-avocats.com",
        subject: `📨 Newsletter #${issueNum} envoyée à ${sent} abonnés`,
        html: `<p>Newsletter En Clair #${issueNum} envoyée à <strong>${sent} abonnés</strong>.</p><p>${articles.length} articles inclus.</p>`,
      }),
    });

    return NextResponse.json({ message: `Sent to ${sent} subscribers`, issue: issueNum });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
