"use client";

export default function GuideProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-medium text-alinea-500">
          Module {current} sur {total}
        </span>
        <span className="text-[12px] text-alinea-400">{pct}%</span>
      </div>
      <div className="h-1.5 bg-alinea-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
