function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-5 w-2/3 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-slate-200" />
        <div className="h-5 w-14 rounded-full bg-slate-200" />
      </div>
      <div className="mt-3 h-3 w-1/3 rounded bg-slate-200" />
    </div>
  );
}

export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
