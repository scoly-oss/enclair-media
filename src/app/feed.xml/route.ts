import { getAllArticles, getCategoryLabel } from "@/lib/articles";

export async function GET() {
  const articles = getAllArticles().slice(0, 50);

  const escapeXml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = articles
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>https://enclair.media/articles/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${escapeXml(getCategoryLabel(article.category))}</category>
      <guid isPermaLink="true">https://enclair.media/articles/${article.slug}</guid>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>En Clair</title>
    <link>https://enclair.media</link>
    <description>Droit social, paie, jurisprudence — le brief pour les dirigeants, DRH, DAF et experts-comptables</description>
    <language>fr</language>
    <atom:link href="https://enclair.media/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
