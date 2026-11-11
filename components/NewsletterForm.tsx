"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTurnstile } from "@/lib/useTurnstile";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const { containerRef, getToken } = useTurnstile();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const token = await getToken();
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full">
      {status === "success" ? (
        <p className="text-teal-700 font-medium text-sm">
          You&apos;re on the list. Check your inbox shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-end gap-2.5">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="email"
                required
                label="Where should I send it?"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" variant="primary" size="lg" disabled={status === "loading" || !agreed}>
              {status === "loading" ? "…" : "Send it to me"}
            </Button>
          </div>

          <label className="flex items-start gap-2 cursor-pointer text-left">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-[3px] accent-teal-500"
            />
            <span className="text-neutral-400 text-xs leading-relaxed">
              I agree to receive email updates from {"Merlin Leadership Collective"}. See our{" "}
              <a href="/privacy" className="text-teal-700 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <div ref={containerRef} />

          {status === "error" && (
            <p className="text-[#d64545] text-xs">Something went wrong. Try again.</p>
          )}
        </form>
      )}
    </div>
  );
}
