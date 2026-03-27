import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CRON_SECRET = process.env.CRON_SECRET || "";
const UNSUBSCRIBE_SECRET = process.env.CRON_SECRET || "enclair-unsub-secret";
const TEST_EMAIL = "s.coly@dairia-avocats.com";

const WP_API_URL =
  "https://dairia-blog.bl-nk.io/wp-json/wp/v2/posts?categories=658&per_page=5&orderby=date&order=desc";

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
}

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
];

function getRandomTip(): { tip: string; source: string } {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return juridicalTips[weekNumber % juridicalTips.length];
}

function buildNewsletterHTML(
  articles: WPPost[],
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
            const title = stripHtml(a.title.rendered);
            const excerpt = truncateExcerpt(stripHtml(a.excerpt.rendered));
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
  <title>En Clair #${issueNumber} [TEST]</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f4f0;font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">

<div style="display:none;font-size:1px;color:#f5f4f0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  [TEST] En Clair #${issueNumber} — Le brief juridique de la semaine
</div>

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f4f0;">
  <tr><td align="center" style="padding:24px 16px;">

    <!-- Test banner -->
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
      <tr><td style="padding:12px 20px;background-color:#fff3cd;border-radius:8px 8px 0 0;text-align:center;">
        <p style="margin:0;font-size:13px;color:#856404;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          MODE TEST — Cet email n'a ete envoye qu'a ${TEST_EMAIL}
        </p>
      </td></tr>
    </table>

    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:0 0 8px 8px;overflow:hidden;max-width:600px;">

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

      <tr><td style="padding:28px 32px 8px;">
        <p style="margin:0;font-size:16px;color:#333;line-height:1.65;font-family:Georgia,'Times New Roman',serif;">
          ${articles.length > 0 ? `Bonjour,<br><br>Voici les ${articles.length} article${articles.length > 1 ? "s" : ""} a ne pas manquer cette semaine. Bonne lecture.` : "Bonjour,<br><br>Semaine calme cote actualite juridique. On revient vendredi prochain avec du contenu frais."}
        </p>
      </td></tr>

      <tr><td style="padding:24px 32px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${articleBlocks}
        </table>
      </td></tr>

      <tr><td style="padding:8px 32px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f6;border-radius:8px;border-left:4px solid #c8a97e;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#c8a97e;text-transform:uppercase;letter-spacing:1.2px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Le saviez-vous ?</p>
            <p style="margin:8px 0 0;font-size:15px;color:#333;line-height:1.6;font-family:Georgia,'Times New Roman',serif;">${tip.tip}</p>
            <p style="margin:8px 0 0;font-size:13px;color:#999;font-style:italic;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${tip.source}</p>
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:0 32px 32px;text-align:center;">
        <a href="https://enclair.media?utm_source=newsletter&utm_medium=email&utm_campaign=test" style="display:inline-block;padding:14px 36px;background-color:#1a1a1a;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Tous les articles &rarr;</a>
      </td></tr>

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

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch articles from WordPress
    const res = await fetch(WP_API_URL, {
      headers: { "User-Agent": "EnClair-Newsletter/1.0" },
    });
    let articles: WPPost[] = [];
    if (res.ok) {
      const posts: WPPost[] = await res.json();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      articles = posts.filter((p) => new Date(p.date) >= oneWeekAgo);
    }

    // Use a test issue number (don't increment the real counter)
    const testIssueNum = 999;

    const subject = `[TEST] En Clair #${testIssueNum} — ${
      articles.length > 0
        ? stripHtml(articles[0].title.rendered)
        : "Votre brief juridique hebdomadaire"
    }`;

    const html = buildNewsletterHTML(articles, testIssueNum, TEST_EMAIL);

    // Send only to test email
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "En Clair <newsletter@enclair.media>",
        to: [TEST_EMAIL],
        subject,
        html,
      }),
    });

    if (!sendRes.ok) {
      const errorBody = await sendRes.text();
      console.error("Test send failed:", errorBody);
      return NextResponse.json(
        { error: "Failed to send test email", details: errorBody },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Test newsletter sent to ${TEST_EMAIL}`,
      articlesCount: articles.length,
      subject,
    });
  } catch (error) {
    console.error("Test newsletter error:", error);
    return NextResponse.json(
      { error: "Failed", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
