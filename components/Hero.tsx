export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0D1B2A]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #C9A84C 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <span className="gold-line" />
            <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-sans font-light">
              Strategic Advisory
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] text-white mb-8">
            Clarity at the{" "}
            <span className="italic text-[#C9A84C]">highest</span>
            <br />
            level of the game.
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-white/55 font-light leading-relaxed max-w-xl mb-14">
            Merlin Leadership partners with executives and boards to cut through complexity,
            sharpen strategy, and make the moves that matter most.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] text-[#0D1B2A] text-sm font-semibold tracking-widest uppercase px-8 py-4 hover:bg-[#D4B96A] transition-colors duration-300"
            >
              Start a Conversation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center text-sm tracking-widest uppercase text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-8 py-4 transition-all duration-300"
            >
              Our Work
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 right-6 flex flex-col items-center gap-3 opacity-30">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white -rotate-90 mb-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
