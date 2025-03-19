import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

if (!BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  throw new Error("Missing required environment variables: BOT_TOKEN or TELEGRAM_CHAT_ID");
}

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ success: false, error: "Image is required" }, { status: 400 });
    }

    const imageUrl = image.startsWith("http")
      ? image
      : `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${image}`;

    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        photo: imageUrl, // Publicly accessible image URL
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(`Telegram API Error: ${data.description}`);
    }

    return NextResponse.json({ success: true, result: data.result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
