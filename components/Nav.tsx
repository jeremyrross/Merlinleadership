"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D1B2A]/95 backdrop-blur-sm border-b border-white/5 py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="w-7 h-7 border border-[#C9A84C] flex items-center justify-center">
            <span className="text-[#C9A84C] text-xs font-display font-medium tracking-wider">M</span>
          </span>
          <span className="text-sm font-sans font-light tracking-[0.18em] text-white/90 uppercase">
            Merlin Leadership
          </span>
        </a>

        {/* CTA */}
        <a
          href="#contact"
          className="text-xs tracking-widest uppercase text-[#C9A84C] border border-[#C9A84C]/40 hover:border-[#C9A84C] px-5 py-2.5 transition-all duration-300 hover:bg-[#C9A84C]/5"
        >
          Work Together
        </a>
      </div>
    </header>
  );
}
