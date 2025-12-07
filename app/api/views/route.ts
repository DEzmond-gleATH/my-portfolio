import { kv } from "@vercel/kv";

const KEY = "portfolio:views";

export async function POST() {
  // increment counter and return the new value
  const views = await kv.incr(KEY);
  return new Response(JSON.stringify({ views }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  const views = (await kv.get<number>(KEY)) ?? 0;
  return new Response(JSON.stringify({ views }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
