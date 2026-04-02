"use client";

import Image from "next/image";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const widgetId = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (turnstileReady && containerRef.current && !widgetId.current) {
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: "dark",
        appearance: "interaction-only",
        callback: (token: string) => { tokenRef.current = token; },
      });
    }
  }, [turnstileReady]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: tokenRef.current }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        if (widgetId.current) window.turnstile.reset(widgetId.current);
      }
    } catch {
      setStatus("error");
      if (widgetId.current) window.turnstile.reset(widgetId.current);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85"
        alt="Mountain peak"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0D1B2A]/80" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #C9A84C 0%, transparent 70%)",
        }}
      />

      {/* Turnstile script */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setTurnstileReady(true)}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-6">
        {/* Logo mark */}
        <div className="border border-[#C9A84C]/60 w-12 h-12 flex items-center justify-center mb-10">
          <span className="text-[#C9A84C] font-display text-lg font-medium">M</span>
        </div>

        <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light mb-6">
          Merlin Leadership
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6">
          Something is <span className="italic text-[#C9A84C]">coming.</span>
        </h1>

        <p className="text-white/40 text-sm tracking-widest uppercase font-light mb-12">
          Strategic Advisory — Launching Soon
        </p>

        <p className="text-white/50 text-sm font-light mb-4">
          Be the first to know when we launch.
        </p>

        {/* Subscribe form */}
        {status === "success" ? (
          <p className="text-[#C9A84C] text-sm tracking-widest uppercase font-light">
            You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md gap-3">
            <div className="flex w-full">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-[#C9A84C]/40 text-white placeholder-white/30 text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading" || !agreed}
                className="bg-[#C9A84C] text-[#0D1B2A] text-xs tracking-[0.2em] uppercase font-medium px-6 py-3 hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-40"
              >
                {status === "loading" ? "..." : "Begin"}
              </button>
            </div>

            {/* Consent checkbox */}
            <label className="flex items-start gap-2 cursor-pointer text-left">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-[2px] accent-[#C9A84C]"
              />
              <span className="text-white/30 text-[10px] leading-relaxed">
                I agree to receive email updates from Merlin Leadership. See our{" "}
                <a href="/privacy" className="text-[#C9A84C]/70 hover:text-[#C9A84C] underline transition-colors">
                  Privacy Policy
                </a>.
              </span>
            </label>

            {/* Invisible Turnstile */}
            <div ref={containerRef} />
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-transparent px-6 py-2 flex items-center justify-end gap-4">
        <a href="/privacy" className="text-white/30 text-[9px] tracking-widest hover:text-white/50 transition-colors">
          Privacy Policy
        </a>
        <p className="text-white/30 text-[9px] tracking-widest">
          © 2026 Merlin Leadership
        </p>
      </div>
    </main>
  );
}
