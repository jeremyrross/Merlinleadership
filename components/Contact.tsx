export default function Contact() {
  return (
    <section id="contact" className="bg-[#0D1B2A] py-28 md:py-36 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 20% 50%, #C9A84C 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="gold-line" />
            <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light">
              Work Together
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-medium text-white leading-tight mb-6">
            Every engagement begins with{" "}
            <span className="italic">one conversation.</span>
          </h2>

          <p className="text-white/50 text-lg font-light leading-relaxed mb-14">
            If you're facing a challenge that demands sharp thinking and
            honest counsel, we'd like to hear about it.
          </p>

          {/* Contact options */}
          <div className="space-y-6">
            <a
              href="mailto:hello@merlinleadership.com"
              className="group flex items-center justify-between w-full md:w-auto md:inline-flex border border-white/10 hover:border-[#C9A84C]/50 px-8 py-5 transition-all duration-300 hover:bg-[#C9A84C]/5"
            >
              <span className="text-sm tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                hello@merlinleadership.com
              </span>
              <svg className="ml-6 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <p className="mt-8 text-white/25 text-xs tracking-wide font-light">
            All inquiries are treated with complete discretion.
          </p>
        </div>
      </div>
    </section>
  );
}
