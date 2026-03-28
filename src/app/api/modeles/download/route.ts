import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return Redis.fromEnv();
}

async function checkRateLimit(ip: string) {
  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
  });
  return ratelimit.limit(`modele-download:${ip}`);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const { success } = await checkRateLimit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, slug } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Modèle invalide" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    if (normalized.length > 254 || !EMAIL_REGEX.test(normalized)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const redis = await getRedis();

    // Check if already subscribed
    const exists = await redis.sismember("subscribers", normalized);

    if (!exists) {
      // Store with RGPD consent proof
      await redis.sadd("subscribers", normalized);
      await redis.hset(`subscriber:${normalized}`, {
        email: normalized,
        subscribedAt: new Date().toISOString(),
        consentAt: new Date().toISOString(),
        consentText:
          "J'accepte de recevoir la newsletter En Clair par email.",
        ip,
        source: `enclair.media/modeles/${slug}`,
        active: "true",
      });

      // Count total subscribers
      const totalSubscribers = await redis.scard("subscribers");

      // Notify
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "En Clair <newsletter@enclair.media>",
            to: "s.coly@dairia-avocats.com",
            subject: `Nouvel abonné modèle En Clair (#${totalSubscribers})`,
            html: `<div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:32px;">
              <h2 style="color:#1a1a1a;margin:0 0 16px;">Nouvel abonné (modèle)</h2>
              <div style="background:#f8f7f4;border-radius:12px;padding:20px;margin-bottom:20px;">
                <p style="margin:0 0 8px;color:#333;font-size:16px;"><strong>${normalized}</strong></p>
                <p style="margin:0 0 8px;color:#555;font-size:14px;">Modèle : <strong>${slug}</strong></p>
                <p style="margin:0;color:#888;font-size:14px;">${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
              </div>
              <p style="color:#888;font-size:14px;margin:0;">Total abonnés : <strong style="color:#1a1a1a;">${totalSubscribers}</strong></p>
            </div>`,
          }),
        });
      } catch {
        // Don't fail if notification fails
      }
    }

    // Track which model was downloaded
    await redis.sadd(`modele-downloads:${slug}`, normalized);

    return NextResponse.json({
      success: true,
      downloadUrl: `/modeles/${slug}.pdf`,
    });
  } catch (error) {
    console.error("Modele download error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
