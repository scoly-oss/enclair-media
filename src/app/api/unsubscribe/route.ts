import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const UNSUBSCRIBE_SECRET = process.env.CRON_SECRET || "enclair-unsub-secret";

function generateUnsubscribeToken(email: string): string {
  return crypto
    .createHmac("sha256", UNSUBSCRIBE_SECRET)
    .update(email.toLowerCase())
    .digest("hex")
    .substring(0, 32);
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return Redis.fromEnv();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.redirect(
      new URL("/desabonnement?status=error", req.url)
    );
  }

  const normalizedEmail = email.toLowerCase().trim();
  const expectedToken = generateUnsubscribeToken(normalizedEmail);

  if (token !== expectedToken) {
    console.error(`Invalid unsubscribe token for ${normalizedEmail}`);
    return NextResponse.redirect(
      new URL("/desabonnement?status=error", req.url)
    );
  }

  try {
    const redis = await getRedis();

    // Remove from subscribers set
    await redis.srem("subscribers", normalizedEmail);

    // Update subscriber record
    const exists = await redis.exists(`subscriber:${normalizedEmail}`);
    if (exists) {
      await redis.hset(`subscriber:${normalizedEmail}`, {
        active: "false",
        unsubscribedAt: new Date().toISOString(),
        unsubscribeMethod: "email-link",
      });
    }

    console.log(`Unsubscribed: ${normalizedEmail}`);

    return NextResponse.redirect(
      new URL("/desabonnement?status=success", req.url)
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.redirect(
      new URL("/desabonnement?status=error", req.url)
    );
  }
}
