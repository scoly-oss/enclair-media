import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.resolve('content/articles');
const BASE_URL = 'https://enclair.media/articles';

// ── Parse all articles ──────────────────────────────────────────────────────

function loadArticles() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const slug = filename.replace('.md', '');
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf-8');
    const { data } = matter(raw);

    const firstDash = raw.indexOf('---');
    const secondDash = raw.indexOf('---', firstDash + 3);
    const bodyStart = raw.indexOf('\n', secondDash) + 1;

    return {
      slug,
      filename,
      title: data.title || '',
      tags: (data.tags || []).map(t => t.toLowerCase().trim()),
      category: (data.category || '').toLowerCase().trim(),
      bodyRaw: raw.substring(bodyStart),
      frontmatterRaw: raw.substring(0, bodyStart),
    };
  });
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Unicode-aware word boundary for French text (accented chars)
const WB_BEFORE = '(?<![\\w\\u00C0-\\u024F])';
const WB_AFTER = '(?![\\w\\u00C0-\\u024F])';

function wordBoundaryRegex(text, flags = 'i') {
  return new RegExp(WB_BEFORE + escapeRegex(text) + WB_AFTER, flags);
}

// ── Build keyword index: keyword phrase → slug ──────────────────────────────
// For each article, generate phrases that when found in another article's body,
// should link to this article.

function buildKeywordsForArticle(article) {
  const keywords = [];

  // Tags (multi-word tags are high quality; single-word tags must be very specific)
  const genericSingleWords = new Set([
    'procédure','licenciement','indemnité','indemnités','employeur','salarié',
    'embauche','formation','cotisations','déclaration','sanctions','sanction',
    'exonérations','exonération','contrôle','redressement','emploi','contrat',
    'preuve','jurisprudence','convention','obligation','publication','calcul',
    'contestation','contribution','participation','prescription','remboursement',
    'apprentissage','professionnalisation','optimisation','automatisation',
    'environnement','intéressement','prud\'hommes',
  ]);
  for (const tag of article.tags) {
    const isMultiWord = tag.includes(' ') || tag.includes('-');
    if (tag.length >= 5 && (isMultiWord || !genericSingleWords.has(tag))) {
      keywords.push({ text: tag, weight: 10 + tag.length });
    }
  }

  // Title fragments
  const title = article.title.toLowerCase()
    .replace(/[«»""':?!]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Split on punctuation/dashes
  const parts = title.split(/[,\-–—]/).map(p => p.trim()).filter(p => p.length >= 6);
  for (const part of parts) {
    const cleaned = part
      .replace(/^(les?|la|l'|un|une|des|du|de|ce|ces|qui|que|quand|pour|comment|pourquoi|votre|vos|quel|quelle|quels|quelles)\s+/gi, '')
      .trim();
    if (cleaned.length >= 8) {
      keywords.push({ text: cleaned, weight: 5 + cleaned.length });
    }
  }

  // 2-3 word phrases from meaningful title words
  const stopWords = new Set([
    'les','des','une','dans','pour','avec','que','qui','son','ses','sur','par','est',
    'pas','plus','tout','sans','mais','vous','elle','aux','ces','entre','sont','leur',
    'peut','fait','dont','quand','quel','cette','votre','vos','aussi','encore','comment',
    'pourquoi','mode','emploi','guide','complet','nouveau','nouvelle','nouveaux','nouvelles',
    'changements','change','vraiment','devrait','pouvez','faire','savoir','devez','toujours',
  ]);
  const words = title.split(/[\s,\-–—]+/).filter(w => w.length >= 4 && !stopWords.has(w));

  for (let i = 0; i < words.length - 1; i++) {
    const pair = words[i] + ' ' + words[i + 1];
    if (pair.length >= 8) {
      keywords.push({ text: pair, weight: 4 + pair.length });
    }
  }

  // Single long keywords from title (must be very specific, 13+ chars)
  for (const w of words) {
    if (w.length >= 13 && !genericSingleWords.has(w)) {
      keywords.push({ text: w, weight: 2 + w.length });
    }
  }

  // From slug: meaningful multi-word combos
  const slugWords = article.slug.split('-').filter(w => w.length >= 4 && !stopWords.has(w));
  for (let i = 0; i < slugWords.length - 1; i++) {
    const pair = slugWords[i] + ' ' + slugWords[i + 1];
    if (pair.length >= 9) {
      keywords.push({ text: pair, weight: 3 + pair.length });
    }
  }

  // Deduplicate, sort by weight desc
  const seen = new Set();
  const unique = [];
  for (const kw of keywords) {
    const key = kw.text.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(kw);
    }
  }
  unique.sort((a, b) => b.weight - a.weight);
  return unique;
}

// ── Find best matches for an article ────────────────────────────────────────

function findBestMatches(currentArticle, allArticles, excludeSlugs = new Set()) {
  const candidates = [];
  const bodyLower = currentArticle.bodyRaw.toLowerCase();

  for (const other of allArticles) {
    if (other.slug === currentArticle.slug) continue;
    if (excludeSlugs.has(other.slug)) continue;

    const commonTags = currentArticle.tags.filter(t => other.tags.includes(t));
    const tagBonus = commonTags.length * 4;
    const catBonus = (currentArticle.category === other.category && currentArticle.category) ? 1 : 0;

    const keywords = buildKeywordsForArticle(other);

    let bestMatch = null;
    let bestScore = 0;

    for (const { text, weight } of keywords) {
      if (text.length < 5) continue;

      // For shorter phrases, use word-boundary matching
      let idx;
      if (text.length < 12) {
        const regex = wordBoundaryRegex(text);
        const m = regex.exec(currentArticle.bodyRaw);
        if (!m) continue;
        idx = m.index;
      } else {
        idx = bodyLower.indexOf(text);
        if (idx === -1) continue;
      }

      const score = weight + tagBonus + catBonus;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = { phrase: text, idx };
      }
    }

    if (bestMatch && bestScore > 6) {
      candidates.push({
        article: other,
        score: bestScore,
        phrase: bestMatch.phrase,
        idx: bestMatch.idx,
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, 6); // take extras for fallback
}

// ── Find a valid insertion point for a phrase ───────────────────────────────
// Tries multiple occurrences to avoid headings, existing links, etc.

function findValidInsertionPoint(body, phrase) {
  const modLower = body.toLowerCase();
  let searchFrom = 0;

  for (let attempt = 0; attempt < 10; attempt++) {
    let idx, matchedLen;

    if (phrase.length < 12) {
      const regex = wordBoundaryRegex(phrase);
      regex.lastIndex = 0;
      const sub = body.substring(searchFrom);
      const m = regex.exec(sub);
      if (!m) return null;
      idx = searchFrom + m.index;
      matchedLen = m[0].length;
    } else {
      idx = modLower.indexOf(phrase, searchFrom);
      if (idx === -1) return null;
      matchedLen = phrase.length;
    }

    const matchedText = body.substring(idx, idx + matchedLen);

    // Safety: not inside existing markdown link
    const before = body.substring(Math.max(0, idx - 500), idx);
    const lastOpen = before.lastIndexOf('[');
    const lastClose = before.lastIndexOf(']');
    if (lastOpen > lastClose) { searchFrom = idx + matchedLen; continue; }

    // Safety: not inside heading
    const lineStart = body.lastIndexOf('\n', idx);
    const linePrefix = body.substring(lineStart === -1 ? 0 : lineStart, idx);
    if (/^\s*#{1,6}\s/.test(linePrefix)) { searchFrom = idx + matchedLen; continue; }

    // Safety: not inside a URL
    const nearBefore = body.substring(Math.max(0, idx - 100), idx);
    if (/\]\(https?:\/\/[^)]*$/.test(nearBefore) || /https?:\/\/[^\s)]*$/.test(nearBefore)) {
      searchFrom = idx + matchedLen; continue;
    }

    // Safety: not inside code block
    const bodyBefore = body.substring(0, idx);
    const codeBlocks = bodyBefore.split('```').length - 1;
    if (codeBlocks % 2 === 1) { searchFrom = idx + matchedLen; continue; }

    return { idx, matchedLen, matchedText };
  }

  return null;
}

// ── Insert links into body ──────────────────────────────────────────────────

function insertLinksInBody(body, matches, maxLinks = 3) {
  let modified = body;
  const insertedSlugs = new Set();
  let linksInserted = 0;

  for (const match of matches) {
    if (linksInserted >= maxLinks) break;
    if (insertedSlugs.has(match.article.slug)) continue;

    const linkUrl = `${BASE_URL}/${match.article.slug}`;
    if (modified.includes(linkUrl)) {
      insertedSlugs.add(match.article.slug);
      continue;
    }

    const phrase = match.phrase;

    // Find phrase in body, trying multiple occurrences if first one is in a heading/link
    const result = findValidInsertionPoint(modified, phrase);
    if (!result) continue;

    const { idx, matchedLen, matchedText } = result;

    const link = `[${matchedText}](${linkUrl})`;
    modified = modified.substring(0, idx) + link + modified.substring(idx + matchedLen);

    insertedSlugs.add(match.article.slug);
    linksInserted++;
  }

  return { modified, linksInserted, insertedSlugs };
}

// ── Get already-linked slugs from a body ────────────────────────────────────

function getLinkedSlugs(body) {
  const slugs = new Set();
  const regex = /\]\(https:\/\/enclair\.media\/articles\/([^)]+)\)/g;
  let m;
  while ((m = regex.exec(body)) !== null) {
    slugs.add(m[1]);
  }
  return slugs;
}

// ── Main ────────────────────────────────────────────────────────────────────

let articles = loadArticles();
console.log(`Loaded ${articles.length} articles`);

let totalLinksInserted = 0;
let articlesModified = 0;

// Pass 1
for (const article of articles) {
  const matches = findBestMatches(article, articles);
  if (matches.length === 0) continue;

  const { modified, linksInserted } = insertLinksInBody(article.bodyRaw, matches, 3);
  if (linksInserted === 0) continue;

  const newFile = article.frontmatterRaw + modified;
  fs.writeFileSync(path.join(ARTICLES_DIR, article.filename), newFile, 'utf-8');

  totalLinksInserted += linksInserted;
  articlesModified++;
}

console.log(`Pass 1: ${articlesModified} articles, ${totalLinksInserted} links`);

// Pass 2: find articles with < 2 links and try harder
articles = loadArticles(); // reload
let pass2Links = 0;

for (const article of articles) {
  const linkedSlugs = getLinkedSlugs(article.bodyRaw);
  const linkCount = linkedSlugs.size;

  if (linkCount >= 2) continue;

  const needed = 2 - linkCount;
  const matches = findBestMatches(article, articles, linkedSlugs);

  if (matches.length === 0) continue;

  const { modified, linksInserted } = insertLinksInBody(article.bodyRaw, matches, needed);
  if (linksInserted === 0) continue;

  const newFile = article.frontmatterRaw + modified;
  fs.writeFileSync(path.join(ARTICLES_DIR, article.filename), newFile, 'utf-8');

  pass2Links += linksInserted;
  if (linkCount === 0) articlesModified++;
}

totalLinksInserted += pass2Links;
console.log(`Pass 2: ${pass2Links} additional links`);

// Final report
articles = loadArticles();
const stats = { under2: [], exactly2: 0, exactly3: 0 };

for (const article of articles) {
  const count = getLinkedSlugs(article.bodyRaw).size;
  if (count < 2) stats.under2.push({ slug: article.slug, count });
  else if (count === 2) stats.exactly2++;
  else stats.exactly3++;
}

console.log(`\n=== FINAL REPORT ===`);
console.log(`Total links inserted: ${totalLinksInserted}`);
console.log(`Articles with 2 links: ${stats.exactly2}`);
console.log(`Articles with 3 links: ${stats.exactly3}`);
console.log(`Articles with < 2 links: ${stats.under2.length}`);

if (stats.under2.length > 0) {
  console.log(`\nArticles still under 2 links:`);
  for (const a of stats.under2) {
    console.log(`  - ${a.slug}: ${a.count}`);
  }
}
