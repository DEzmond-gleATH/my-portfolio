import { NextResponse } from "next/server";

const NAMESPACE = "faizan-portfolio";
const KEY = "views";

// make sure this route is always dynamic, not cached at build time
export const dynamic = "force-dynamic";

async function callCounterAPI(
  mode: "hit" | "get"
): Promise<number> {
  const url = `https://api.countapi.xyz/${mode}/${NAMESPACE}/${KEY}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("Counter API error:", res.status, res.statusText);
      return 0;
    }

    const data = await res.json();
    const value = (data as any).value;
    return typeof value === "number" ? value : 0;
  } catch (err) {
    console.error("Counter API fetch failed:", err);
    return 0;
  }
}

export async function POST() {
  const views = await callCounterAPI("hit"); // increment + return
  return NextResponse.json({ views });
}

export async function GET() {
  const views = await callCounterAPI("get"); // just read
  return NextResponse.json({ views });
}
