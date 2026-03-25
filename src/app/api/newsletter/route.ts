import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data/subscribers.json");

function ensureDataDir() {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(SUBSCRIBERS_FILE)) fs.writeFileSync(SUBSCRIBERS_FILE, "[]");
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    ensureDataDir();
    const subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf8"));
    if (subscribers.some((s: { email: string }) => s.email === email)) {
      return NextResponse.json({ message: "Déjà inscrit" });
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ message: "Inscription réussie" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
