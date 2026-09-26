import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

// Fixed-window counter. Uses Upstash Redis (shared across every server
// instance) when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set;
// otherwise falls back to per-instance memory, which is best-effort only.
const memory = new Map<string, { count: number; resetAt: number }>();

async function hitUpstash(key: string, windowSec: number): Promise<number | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSec, "NX"],
      ]),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const count = Number(data?.[0]?.result);
    return Number.isFinite(count) ? count : null;
  } catch {
    return null;
  }
}

function hitMemory(key: string, windowSec: number): number {
  const now = Date.now();
  if (memory.size > 5000) {
    for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
  }
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

/** Returns true if this request is within the limit. */
export async function withinLimit(
  key: string,
  limit: number,
  windowSec: number
): Promise<boolean> {
  const count = (await hitUpstash(key, windowSec)) ?? hitMemory(key, windowSec);
  return count <= limit;
}

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function hashKey(value: string): string {
  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex").slice(0, 32);
}
