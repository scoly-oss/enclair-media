import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // Check if already subscribed
    const exists = await redis.sismember("subscribers", normalized);
    if (exists) {
      return NextResponse.json({ message: "Déjà inscrit" });
    }

    // Add to set + store metadata
    await redis.sadd("subscribers", normalized);
    await redis.hset(`subscriber:${normalized}`, {
      email: normalized,
      subscribedAt: new Date().toISOString(),
      source: "enclair.media",
    });

    // Increment counter
    await redis.incr("subscribers:count");

    return NextResponse.json({ message: "Inscription réussie" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await redis.scard("subscribers");
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
