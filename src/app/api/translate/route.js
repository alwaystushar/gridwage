import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text, target } = await req.json();

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Translate API key not configured" },
        { status: 500 }
      );
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        target: target,
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.statusText}`);
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || "";

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed: " + error.message },
      { status: 500 }
    );
  }
}
