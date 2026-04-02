"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xqegdyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
          <form onSubmit={handleSubmit} className="flex w-full max-w-md">
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
              disabled={status === "loading"}
              className="bg-[#C9A84C] text-[#0D1B2A] text-xs tracking-[0.2em] uppercase font-medium px-6 py-3 hover:bg-[#C9A84C]/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Begin"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0D1B2A] px-6 py-[3px] flex items-center justify-end">
        <p className="text-white/20 text-[7px] tracking-widest">
          © 2026 Merlin Leadership
        </p>
      </div>
    </main>
  );
}
