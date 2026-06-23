const PRIORITY_STYLES = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

export default function PriorityBadge({ priority }) {
  const styles = PRIORITY_STYLES[priority] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {priority}
    </span>
  );
}
