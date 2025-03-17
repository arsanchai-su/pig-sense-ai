import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    return NextResponse.json({ success: true, result: data.result });
  } catch (error :any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
