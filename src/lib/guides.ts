import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  sources?: string[];
}

export interface Guide extends GuideMeta {
  contentHtml: string;
}

export function getAllGuides(): GuideMeta[] {
  if (!fs.existsSync(guidesDirectory)) return [];
  const fileNames = fs.readdirSync(guidesDirectory);
  const guides = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(guidesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return { slug, ...data } as GuideMeta;
    });
  return guides.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const fullPath = path.join(guidesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();
  return { slug, contentHtml, ...data } as Guide;
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
