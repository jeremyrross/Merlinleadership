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

      {/* Mountain banner */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm glow behind summit */}
        <div
          className="absolute"
          style={{
            width: "50%",
            height: "70%",
            bottom: "15%",
            right: "5%",
            background:
              "radial-gradient(ellipse 40% 50% at 62% 72%, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)",
          }}
        />
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A4A6A" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1B3050" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#162D44" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0F2035" stopOpacity="0.65" />
            </linearGradient>
            <radialGradient id="peakglow" cx="50%" cy="0%" r="60%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Layer 1 — distant range */}
          <path
            d="M0,560 L0,420 L80,390 L160,410 L260,360 L360,390 L480,330 L580,365 L680,305 L780,340 L880,280 L960,310 L1060,255 L1140,285 L1240,255 L1340,275 L1440,258 L1440,560 Z"
            fill="url(#mtn1)"
          />

          {/* Layer 2 — mid range */}
          <path
            d="M0,560 L0,460 L120,420 L240,445 L380,380 L500,420 L620,355 L740,400 L860,330 L960,370 L1060,295 L1120,270 L1160,255 L1200,265 L1280,310 L1380,290 L1440,300 L1440,560 Z"
            fill="url(#mtn2)"
          />

          {/* Peak glow mask */}
          <ellipse
            cx="1080"
            cy="180"
            rx="140"
            ry="200"
            fill="url(#peakglow)"
          />

          {/* Layer 3 — foreground, matches bg */}
          <path
            d="M0,560 L0,500 L120,475 L220,490 L320,468 L400,478 L460,455 L510,462 L560,442 L610,450 L660,425 L710,415 L760,390 L810,365 L860,330 L900,295 L930,255 L955,210 L975,165 L990,125 L1000,95 L1010,72 L1020,95 L1035,130 L1050,105 L1065,145 L1085,175 L1110,200 L1145,230 L1185,255 L1230,272 L1280,258 L1330,275 L1380,262 L1440,270 L1440,560 Z"
            fill="#0D1B2A"
          />

          {/* Gold ridge catch — sunlight on the peak edge */}
          <polyline
            points="1000,95 1010,72 1020,95 1035,130 1050,105"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeLinejoin="round"
          />
        </svg>
      </div>

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
