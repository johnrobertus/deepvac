export function TrustBarSection() {
  const items = [
    "High-vacuum testing down to ≤ 1 × 10^-6 mbar",
    "Thermal control down to -190 °C",
    "Standard series and custom TVAC systems",
    "Retrofit, service, and subsystem integration",
  ];

  return (
    <div className="border-y border-gray/10 py-10 px-6 bg-surface/50">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue/60 mt-1.5 flex-shrink-0" />
              <p className="text-xs text-gray/70 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
