export function StatsBar() {
  const stats = [
    { value: 'O(1)', label: 'Route Lookup' },
    { value: '15', label: 'Pipeline Stages' },
    { value: '8', label: 'HTTP Methods' },
    { value: '100%', label: 'Type Safe' },
  ];

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 px-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
