const services = [
  {
    title: "Board & Executive Advisory",
    description:
      "Ongoing strategic counsel for boards and C-suite leaders navigating inflection points — from market pivots to succession planning.",
    scope: ["Quarterly advisory retainers", "Board facilitation", "CEO coaching"],
  },
  {
    title: "Strategy Development",
    description:
      "Structured engagements to build, stress-test, and mobilize your organization's strategy with clarity and stakeholder alignment.",
    scope: ["Strategic planning", "Competitive positioning", "Growth roadmaps"],
  },
  {
    title: "Organizational Effectiveness",
    description:
      "Closing the gap between strategy and performance through leadership alignment, team design, and cultural change initiatives.",
    scope: ["Leadership team alignment", "Change management", "Culture diagnostics"],
  },
  {
    title: "Critical Decision Support",
    description:
      "Rapid-response advisory for M&A, capital allocation, restructuring, or any high-stakes decision where getting it right is non-negotiable.",
    scope: ["M&A advisory", "Scenario planning", "Stakeholder strategy"],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0a1520] py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="gold-line" />
          <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light">
            Services
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-end">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white leading-tight">
            Engagements built around{" "}
            <span className="italic">your</span> challenge.
          </h2>
          <p className="text-white/50 text-base font-light leading-relaxed">
            Every engagement is scoped and structured to your context. We work in focused
            retainers, project-based sprints, and on-call advisory relationships.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-[#0a1520] p-10 hover:bg-[#0f1e2e] transition-colors duration-300 group"
            >
              <h3 className="font-display text-xl font-medium text-white mb-4 group-hover:text-[#C9A84C] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed font-light mb-8">
                {s.description}
              </p>
              <ul className="space-y-2">
                {s.scope.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs text-white/30">
                    <span className="w-3 h-px bg-[#C9A84C]/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-white/25 text-xs tracking-wider mt-10 font-light">
          Merlin Leadership works with a select number of clients at any time — by referral and invitation.
        </p>
      </div>
    </section>
  );
}
