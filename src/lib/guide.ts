import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const guideDirectory = path.join(process.cwd(), "content/guide");

export interface ModuleMeta {
  slug: string;
  number: number;
  title: string;
  readTime: string;
  part: "fondamentaux" | "mise-en-oeuvre" | "situations-particulieres";
  partLabel: string;
}

export interface Module extends ModuleMeta {
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
}

function getPartInfo(num: number): { part: ModuleMeta["part"]; partLabel: string } {
  if (num <= 4) return { part: "fondamentaux", partLabel: "Les fondamentaux" };
  if (num <= 8) return { part: "mise-en-oeuvre", partLabel: "La mise en oeuvre" };
  return { part: "situations-particulieres", partLabel: "Les situations particulières" };
}

function estimateReadTime(text: string): string {
  const words = text.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

/**
 * Process callout blocks marked with <!-- callout-start --> and <!-- callout-end -->
 * into styled HTML callout boxes.
 */
function processCallouts(htmlContent: string): string {
  // Replace callout markers with styled divs
  let result = htmlContent;
  result = result.replace(
    /<!--\s*callout-start\s*-->/g,
    '<div class="guide-callout">'
  );
  result = result.replace(
    /<!--\s*callout-end\s*-->/g,
    "</div>"
  );
  return result;
}

/**
 * Add id attributes to h2 and h3 tags for anchor linking.
 */
function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(
    /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
    (_match, tag, attrs, content) => {
      const text = content.replace(/<[^>]+>/g, "").trim();
      const id = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (/id="/.test(attrs)) return `<${tag}${attrs}>${content}</${tag}>`;
      return `<${tag} id="${id}"${attrs}>${content}</${tag}>`;
    }
  );
}

/**
 * Extract h2 and h3 headings from HTML content for table of contents.
 */
function extractHeadings(htmlContent: string): { id: string; text: string; level: number }[] {
  const regex = /<(h[23])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const level = match[1] === "h2" ? 2 : 3;
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    const id =
      match[2] ||
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

export function getAllModules(): ModuleMeta[] {
  if (!fs.existsSync(guideDirectory)) return [];
  const fileNames = fs.readdirSync(guideDirectory);
  const modules = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(guideDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const { part, partLabel } = getPartInfo(data.number);
      return {
        slug: data.slug as string,
        number: data.number as number,
        title: data.title as string,
        readTime: estimateReadTime(content),
        part,
        partLabel,
      };
    });
  return modules.sort((a, b) => a.number - b.number);
}

export async function getModuleBySlug(slug: string): Promise<Module | null> {
  if (!fs.existsSync(guideDirectory)) return null;
  const fileNames = fs.readdirSync(guideDirectory);
  const match = fileNames.find((f) => {
    const fullPath = path.join(guideDirectory, f);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data.slug === slug;
  });
  if (!match) return null;

  const fullPath = path.join(guideDirectory, match);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);

  let contentHtml = processedContent.toString();
  contentHtml = processCallouts(contentHtml);
  contentHtml = addHeadingIds(contentHtml);

  const headings = extractHeadings(contentHtml);
  const { part, partLabel } = getPartInfo(data.number);

  return {
    slug: data.slug as string,
    number: data.number as number,
    title: data.title as string,
    readTime: estimateReadTime(content),
    part,
    partLabel,
    contentHtml,
    headings,
  };
}
