import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

// Rate limiting: 3 requests per minute per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
});

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez dans une minute." }, { status: 429 });
    }

    const body = await req.json();
    const { email, consent, website } = body;

    // Honeypot — bot detection (hidden field)
    if (website) {
      return NextResponse.json({ message: "Inscription réussie" });
    }

    // Type checking
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Email validation
    const normalized = email.toLowerCase().trim();
    if (normalized.length > 254 || !EMAIL_REGEX.test(normalized)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // RGPD: consent is mandatory
    if (!consent) {
      return NextResponse.json({ error: "Le consentement est obligatoire" }, { status: 400 });
    }

    // Check if already subscribed — same response to prevent enumeration
    const exists = await redis.sismember("subscribers", normalized);
    if (exists) {
      return NextResponse.json({ message: "Inscription réussie" });
    }

    // Store subscriber with RGPD-compliant consent proof
    await redis.sadd("subscribers", normalized);
    await redis.hset(`subscriber:${normalized}`, {
      email: normalized,
      subscribedAt: new Date().toISOString(),
      consentAt: new Date().toISOString(),
      consentText: "J'accepte de recevoir la newsletter En Clair par email.",
      ip: ip,
      source: "enclair.media",
      active: "true",
    });

    return NextResponse.json({ message: "Inscription réussie" });
  } catch (error) {
    console.error("Newsletter error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Unsubscribe endpoint
export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // Remove from set and delete metadata
    await redis.srem("subscribers", normalized);
    await redis.del(`subscriber:${normalized}`);

    return NextResponse.json({ message: "Désinscription effectuée" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
