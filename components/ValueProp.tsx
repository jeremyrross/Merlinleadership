const pillars = [
  {
    number: "01",
    title: "Strategic Clarity",
    body: "We help leadership teams see through noise, align on what matters, and move with conviction — even in ambiguous environments.",
  },
  {
    number: "02",
    title: "Executive Advisory",
    body: "A trusted thought partner for CEOs, founders, and boards navigating high-stakes decisions, transitions, and growth inflection points.",
  },
  {
    number: "03",
    title: "Organizational Alignment",
    body: "From C-suite to front line, we close the gap between strategy and execution — building cultures where clarity compounds.",
  },
];

export default function ValueProp() {
  return (
    <section className="bg-[#0D1B2A] py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 md:mb-28 items-end">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-line" />
              <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light">
                How We Help
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white leading-tight">
              Where strategy meets{" "}
              <span className="italic">execution.</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg font-light leading-relaxed md:pt-4">
            Most firms deliver frameworks. We deliver decisions. Our work is built
            around the specific challenges of your organization — never a template.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="bg-[#0D1B2A] p-10 group hover:bg-[#152336] transition-colors duration-400"
            >
              <span className="block text-[#C9A84C]/30 text-xs tracking-[0.2em] font-sans mb-8">
                {p.number}
              </span>
              <div className="w-8 h-px bg-[#C9A84C]/40 mb-8 group-hover:w-12 transition-all duration-300" />
              <h3 className="font-display text-xl font-medium text-white mb-4">
                {p.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed font-light">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
