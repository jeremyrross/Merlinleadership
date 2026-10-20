"use client";

import Script from "next/script";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export default function TalkRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [turnstileReady, setTurnstileReady] = useState(false);
  const widgetId = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (turnstileReady && containerRef.current && !widgetId.current) {
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: "light",
        appearance: "interaction-only",
        callback: (token: string) => {
          tokenRef.current = token;
        },
      });
    }
  }, [turnstileReady]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token: tokenRef.current }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        if (widgetId.current) window.turnstile.reset(widgetId.current);
      }
    } catch {
      setStatus("error");
      if (widgetId.current) window.turnstile.reset(widgetId.current);
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <p className="font-serif italic text-2xl text-neutral-900 mb-3">
          {name.split(" ")[0] ? `Thanks, ${name.split(" ")[0]}.` : "Thanks for your interest."}
        </p>
        <p className="text-neutral-600 max-w-[40ch] mx-auto">
          There&apos;s been more interest in these than I expected. I&apos;m
          working through requests in order, and I&apos;ll reach out when I
          get to yours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setTurnstileReady(true)}
      />

      <Input
        label="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        label="What are you interested in?"
        placeholder="Optional. A sentence or two is plenty."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div ref={containerRef} />

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "I'm interested"}
      </Button>

      {status === "error" && (
        <p className="text-[#d64545] text-sm text-center">
          Something went wrong. Try again, or email{" "}
          <a href="mailto:begin@merlinleadership.com" className="underline">
            begin@merlinleadership.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
