const STATUS_STYLES = {
  Planning: "bg-slate-100 text-slate-700",
  "In Progress": "bg-teal-100 text-teal-700",
  "On Hold": "bg-amber-100 text-amber-700",
  Completed: "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
