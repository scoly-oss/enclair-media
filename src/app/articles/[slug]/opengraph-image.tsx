import { ImageResponse } from "next/og";
import { getArticleBySlug, getAllArticles, getCategoryLabel } from "@/lib/articles";

export const runtime = "nodejs";
export const alt = "En Clair — Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryColors: Record<string, string> = {
  "droit-social": "#1D627A",
  economie: "#FF914C",
  jurisprudence: "#10B981",
  decryptage: "#8B5CF6",
  alerte: "#EF4444",
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const title = article?.title ?? "Article";
  const category = article?.category ?? "droit-social";
  const date = article?.date ?? "";
  const badgeColor = categoryColors[category] || "#1D627A";
  const categoryLabel = getCategoryLabel(category);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px 40px 70px",
          background: "linear-gradient(135deg, #0a2a35 0%, #1D627A 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: logo + category */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
            En Clair
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: badgeColor,
              padding: "8px 22px",
              borderRadius: 999,
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "260px",
          }}
        >
          {title.length > 120 ? title.slice(0, 117) + "..." : title}
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            enclair.media
          </div>
          {date && (
            <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
              {date}
            </div>
          )}
        </div>

        {/* Orange accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#FF914C",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
