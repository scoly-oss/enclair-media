import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CRON_SECRET = process.env.CRON_SECRET || "";
const UNSUBSCRIBE_SECRET = process.env.CRON_SECRET || "enclair-unsub-secret";

interface ArticleFeedItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}

// Unified article shape for the newsletter
interface NewsletterArticle {
  title: string;
  excerpt: string;
  link: string;
  date: string;
}

// --- Redis helpers ---

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return Redis.fromEnv();
}

async function getSubscribers(): Promise<string[]> {
  const redis = await getRedis();
  const members = await redis.smembers("subscribers");
  return (members as string[]).filter(
    (email) => typeof email === "string" && email.includes("@")
  );
}

// --- Articles feed (generated at build time) ---

async function getLatestArticles(): Promise<NewsletterArticle[]> {
  try {
    const res = await fetch("https://enclair.media/articles-feed.json", {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      console.error(`Articles feed error: ${res.status}`);
      return [];
    }
    const articles: ArticleFeedItem[] = await res.json();
    // Take the 5 most recent articles (already sorted by date desc)
    return articles.slice(0, 5).map((a) => ({
      title: a.title,
      excerpt: a.excerpt,
      link: `https://enclair.media/articles/${a.slug}`,
      date: a.date,
    }));
  } catch (error) {
    console.error("Failed to fetch articles feed:", error);
    return [];
  }
}

// --- Helpers ---

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n/g, " ")
    .trim();
}

function truncateExcerpt(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

function generateUnsubscribeToken(email: string): string {
  return crypto
    .createHmac("sha256", UNSUBSCRIBE_SECRET)
    .update(email.toLowerCase())
    .digest("hex")
    .substring(0, 32);
}

function getUnsubscribeUrl(email: string): string {
  const token = generateUnsubscribeToken(email);
  return `https://enclair.media/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

// --- Juridical tips for "Le saviez-vous ?" ---

const juridicalTips = [
  {
    tip: "Un licenciement notifié avant l'entretien préalable est nul, même si le motif est réel et sérieux.",
    source: "Cass. soc., 20 mars 2024",
  },
  {
    tip: "Le délai de prescription pour contester un licenciement est de 12 mois à compter de la notification.",
    source: "Art. L.1471-1 du Code du travail",
  },
  {
    tip: "Un salarié en arrêt maladie peut être licencié, mais jamais en raison de son état de santé.",
    source: "Art. L.1132-1 du Code du travail",
  },
  {
    tip: "L'employeur doit organiser un entretien professionnel tous les 2 ans, distinct de l'entretien annuel d'évaluation.",
    source: "Art. L.6315-1 du Code du travail",
  },
  {
    tip: "Le télétravail ne peut pas être imposé par l'employeur sauf circonstances exceptionnelles (pandémie, force majeure).",
    source: "Art. L.1222-11 du Code du travail",
  },
  {
    tip: "Une clause de non-concurrence sans contrepartie financière est nulle et ne peut produire aucun effet.",
    source: "Cass. soc., 10 juillet 2002",
  },
  {
    tip: "Le solde de tout compte signé sans réserve peut être dénoncé dans les 6 mois suivant sa signature.",
    source: "Art. L.1234-20 du Code du travail",
  },
  {
    tip: "L'indemnité légale de licenciement se calcule sur les 12 ou 3 derniers mois de salaire, au plus avantageux pour le salarié.",
    source: "Art. R.1234-4 du Code du travail",
  },
  {
    tip: "Un CDD ne peut être renouvelé que 2 fois, dans la limite de 18 mois au total (sauf exceptions).",
    source: "Art. L.1243-13 du Code du travail",
  },
  {
    tip: "L'absence de visite médicale d'embauche cause nécessairement un préjudice au salarié.",
    source: "Cass. soc., 17 octobre 2018",
  },
];

function getRandomTip(): { tip: string; source: string } {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return juridicalTips[weekNumber % juridicalTips.length];
}

// --- Email template ---

function buildNewsletterHTML(
  articles: NewsletterArticle[],
  issueNumber: number,
  recipientEmail: string
): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const unsubscribeUrl = getUnsubscribeUrl(recipientEmail);
  const tip = getRandomTip();

  const articleBlocks =
    articles.length > 0
      ? articles
          .map((a) => {
            const title = a.title;
            const excerpt = truncateExcerpt(a.excerpt);
            return `
    <tr><td style="padding:0 0 24px;">
      <h2 style="margin:0 0 8px;font-size:19px;color:#1a1a1a;line-height:1.35;font-family:Georgia,'Times New Roman',serif;">
        <a href="${a.link}?utm_source=newsletter&utm_medium=email&utm_campaign=enclair_${issueNumber}" style="color:#1a1a1a;text-decoration:none;">${title}</a>
      </h2>
      <p style="margin:0 0 10px;font-size:15px;color:#555;line-height:1.55;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${excerpt}</p>
      <a href="${a.link}?utm_source=newsletter&utm_medium=email&utm_campaign=enclair_${issueNumber}" style="color:#1a1a1a;font-size:14px;font-weight:600;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;border-bottom:2px solid #c8a97e;padding-bottom:1px;">Lire &rarr;</a>
    </td></tr>
    <tr><td style="padding:0 0 24px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #eee;"></td></tr></table></td></tr>`;
          })
          .join("")
      : `<tr><td style="padding:20px 0;">
      <p style="margin:0;font-size:16px;color:#555;line-height:1.7;font-family:Georgia,'Times New Roman',serif;">
        Pas de nouveaux articles cette semaine. L'actualite juridique etait calme — profitez-en pour rattraper les anciens numeros !
      </p>
    </td></tr>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>En Clair #${issueNumber}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f5f4f0;font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">

<!-- Preheader -->
<div style="display:none;font-size:1px;color:#f5f4f0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  En Clair #${issueNumber} — Le brief juridique de la semaine${articles.length > 0 ? ` : ${articles[0].title}` : ""}
</div>

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f4f0;">
  <tr><td align="center" style="padding:24px 16px;">

    <!-- Main container -->
    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;" class="responsive-table">

      <!-- HEADER -->
      <tr><td style="padding:36px 32px 28px;border-bottom:3px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#1a1a1a;letter-spacing:-0.5px;font-family:Georgia,'Times New Roman',serif;">En Clair</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;letter-spacing:0.3px;">Le brief juridique de la semaine &middot; N&deg;${issueNumber} &middot; ${date}</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- INTRO -->
      <tr><td style="padding:28px 32px 8px;">
        <p style="margin:0;font-size:16px;color:#333;line-height:1.65;font-family:Georgia,'Times New Roman',serif;">
          ${articles.length > 0 ? `Bonjour,<br><br>Voici les ${articles.length} article${articles.length > 1 ? "s" : ""} a ne pas manquer cette semaine. Bonne lecture.` : "Bonjour,<br><br>Semaine calme cote actualite juridique. On revient vendredi prochain avec du contenu frais."}
        </p>
      </td></tr>

      <!-- ARTICLES -->
      <tr><td style="padding:24px 32px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${articleBlocks}
        </table>
      </td></tr>

      <!-- LE SAVIEZ-VOUS ? -->
      <tr><td style="padding:8px 32px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f6;border-radius:8px;border-left:4px solid #c8a97e;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#c8a97e;text-transform:uppercase;letter-spacing:1.2px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Le saviez-vous ?</p>
            <p style="margin:8px 0 0;font-size:15px;color:#333;line-height:1.6;font-family:Georgia,'Times New Roman',serif;">${tip.tip}</p>
            <p style="margin:8px 0 0;font-size:13px;color:#999;font-style:italic;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${tip.source}</p>
          </td></tr>
        </table>
      </td></tr>

      <!-- CTA -->
      <tr><td style="padding:0 32px 32px;text-align:center;">
        <a href="https://enclair.media?utm_source=newsletter&utm_medium=email&utm_campaign=enclair_${issueNumber}" style="display:inline-block;padding:14px 36px;background-color:#1a1a1a;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Tous les articles &rarr;</a>
      </td></tr>

      <!-- FOOTER -->
      <tr><td style="padding:24px 32px;background-color:#faf9f6;border-top:1px solid #eee;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <strong style="color:#666;">En Clair</strong> &mdash; Le droit et l'economie qui comptent.
            </p>
            <p style="margin:0 0 12px;font-size:13px;color:#999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              Edite par <a href="https://dairia-avocats.com" style="color:#888;text-decoration:underline;">DAIRIA Avocats</a> &middot; <a href="https://sofianecoly.com" style="color:#888;text-decoration:underline;">Sofiane Coly</a>
            </p>
            <p style="margin:0;font-size:12px;color:#bbb;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              Vous recevez cet email car vous etes inscrit sur enclair.media.<br>
              <a href="${unsubscribeUrl}" style="color:#bbb;text-decoration:underline;">Se desinscrire</a>
            </p>
          </td></tr>
        </table>
      </td></tr>

    </table>

  </td></tr>
</table>

</body>
</html>`;
}

// --- Send via Resend ---

async function sendBatch(
  emails: string[],
  subject: string,
  htmlTemplate: (email: string) => string
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const batchSize = 50;
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    // Resend batch API: send individually for per-recipient unsubscribe links
    const promises = batch.map(async (email) => {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "En Clair <newsletter@enclair.media>",
            to: [email],
            subject,
            html: htmlTemplate(email),
            headers: {
              "List-Unsubscribe": `<${getUnsubscribeUrl(email)}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });

        if (!res.ok) {
          const errorBody = await res.text();
          console.error(`Resend error for ${email}: ${res.status} ${errorBody}`);
          errors.push(`${email}: ${res.status}`);
          failed++;
        } else {
          sent++;
        }
      } catch (error) {
        console.error(`Send error for ${email}:`, error);
        errors.push(`${email}: ${error instanceof Error ? error.message : "unknown"}`);
        failed++;
      }
    });

    await Promise.all(promises);

    // Small delay between batches to avoid rate limits
    if (i + batchSize < emails.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return { sent, failed, errors };
}

// --- Main handler ---

export async function GET(req: NextRequest) {
  // Vercel Cron sends GET requests with Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Get subscribers
    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      console.log("Newsletter: no subscribers found");
      return NextResponse.json({ message: "No subscribers", sent: 0 });
    }
    console.log(`Newsletter: ${subscribers.length} subscribers found`);

    // 2. Get latest articles from feed
    const articles = await getLatestArticles();
    console.log(`Newsletter: ${articles.length} articles from feed`);

    // 3. Get issue number
    const redis = await getRedis();
    const issueNum = (await redis.incr("newsletter:issue_number")) as number;
    console.log(`Newsletter: issue #${issueNum}`);

    // 4. Build subject
    const subject =
      articles.length > 0
        ? `En Clair #${issueNum} — ${articles[0].title}`
        : `En Clair #${issueNum} — Votre brief juridique hebdomadaire`;

    // 5. Send to all subscribers
    const result = await sendBatch(subscribers, subject, (email) =>
      buildNewsletterHTML(articles, issueNum, email)
    );

    console.log(
      `Newsletter #${issueNum}: ${result.sent} sent, ${result.failed} failed`
    );

    // 6. Notify Sofiane
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "En Clair <newsletter@enclair.media>",
          to: "s.coly@dairia-avocats.com",
          subject: `Newsletter #${issueNum} envoyee — ${result.sent}/${subscribers.length} abonnes`,
          html: `<div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:32px;">
            <h2 style="color:#1a1a1a;margin:0 0 16px;">Newsletter #${issueNum} envoyee</h2>
            <div style="background:#f8f7f4;border-radius:12px;padding:20px;margin-bottom:20px;">
              <p style="margin:0 0 8px;color:#333;font-size:16px;"><strong>${result.sent}</strong> emails envoyes sur <strong>${subscribers.length}</strong> abonnes</p>
              <p style="margin:0 0 8px;color:#333;font-size:14px;">${articles.length} article(s) inclus</p>
              ${result.failed > 0 ? `<p style="margin:0;color:#c00;font-size:14px;">${result.failed} echec(s) : ${result.errors.slice(0, 5).join(", ")}</p>` : '<p style="margin:0;color:#2a9d2a;font-size:14px;">Aucun echec</p>'}
            </div>
          </div>`,
        }),
      });
    } catch (notifError) {
      console.error("Failed to notify Sofiane:", notifError);
    }

    // 7. Log to Redis
    await redis.hset(`newsletter:log:${issueNum}`, {
      sentAt: new Date().toISOString(),
      totalSubscribers: subscribers.length,
      sent: result.sent,
      failed: result.failed,
      articlesCount: articles.length,
      subject,
    });

    return NextResponse.json({
      message: `Newsletter #${issueNum} sent`,
      sent: result.sent,
      failed: result.failed,
      totalSubscribers: subscribers.length,
      articlesCount: articles.length,
      issue: issueNum,
    });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return NextResponse.json(
      {
        error: "Newsletter send failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers
export async function POST(req: NextRequest) {
  return GET(req);
}
