import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/articles");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

let fixed = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.excerpt || data.excerpt.length <= 160) {
    skipped++;
    continue;
  }

  // Smart truncation: cut at sentence boundary, then at word boundary
  let excerpt = data.excerpt;

  // Try cutting at the last sentence that fits in 155 chars
  const sentences = excerpt.match(/[^.!?]+[.!?]+/g);
  if (sentences) {
    let shortened = "";
    for (const s of sentences) {
      if ((shortened + s).length <= 155) {
        shortened += s;
      } else {
        break;
      }
    }
    if (shortened.length >= 100) {
      excerpt = shortened.trim();
    } else {
      // Sentence approach too short, cut at word boundary
      excerpt = excerpt.substring(0, 152).replace(/\s+\S*$/, "").trim();
      if (!excerpt.endsWith(".")) excerpt += ".";
    }
  } else {
    excerpt = excerpt.substring(0, 152).replace(/\s+\S*$/, "").trim();
    if (!excerpt.endsWith(".")) excerpt += ".";
  }

  // Safety check
  if (excerpt.length > 160) {
    excerpt = excerpt.substring(0, 157) + "...";
  }

  data.excerpt = excerpt;
  const newContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newContent, "utf8");
  fixed++;
}

console.log(`Fixed: ${fixed} | Skipped: ${skipped} | Total: ${files.length}`);
