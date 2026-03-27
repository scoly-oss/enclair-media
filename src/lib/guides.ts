const WP_API = "https://dairia-blog.bl-nk.io/wp-json/wp/v2";
const GUIDES_CATEGORY = 1000;

export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  sources?: string[];
  featuredImage?: string;
}

export interface Guide extends GuideMeta {
  contentHtml: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'").replace(/&nbsp;/g, " ").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").trim();
}

function estimateReadTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

export async function getAllGuides(): Promise<GuideMeta[]> {
  const res = await fetch(
    `${WP_API}/posts?categories=${GUIDES_CATEGORY}&per_page=100&orderby=date&order=desc&_fields=id,slug,title,excerpt,date,_embedded&_embed`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  const posts = await res.json();
  return posts.map((p: any) => ({
    slug: p.slug,
    title: stripHtml(p.title.rendered),
    excerpt: stripHtml(p.excerpt.rendered).slice(0, 160),
    date: p.date.split("T")[0],
    tags: [],
    readTime: "5 min",
    featuredImage: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || undefined,
  }));
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const res = await fetch(
    `${WP_API}/posts?slug=${slug}&categories=${GUIDES_CATEGORY}&_fields=id,slug,title,excerpt,date,content,_embedded&_embed`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return null;
  const posts = await res.json();
  if (!posts.length) return null;
  const p = posts[0];
  const contentHtml = p.content.rendered;
  return {
    slug: p.slug,
    title: stripHtml(p.title.rendered),
    excerpt: stripHtml(p.excerpt.rendered).slice(0, 160),
    date: p.date.split("T")[0],
    tags: [],
    readTime: estimateReadTime(contentHtml),
    contentHtml,
    featuredImage: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || undefined,
  };
}

/**
 * Extract H2 headings from HTML content for table of contents.
 */
export function extractHeadings(html: string): { id: string; text: string }[] {
  const regex = /<h2[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h2>/gi;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const id = match[1] || text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}

/**
 * Add id attributes to H2 tags in HTML for anchor linking.
 */
export function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, "").trim();
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    // Don't double-add id if already present
    if (/id="/.test(attrs)) return `<h2${attrs}>${content}</h2>`;
    return `<h2 id="${id}"${attrs}>${content}</h2>`;
  });
}
