import { STATUS_STYLES } from "@/components/StatusBadge";
import { VALID_STATUSES } from "@/lib/validateProject";

const RING_COLORS = {
  All: "ring-slate-500",
  Planning: "ring-slate-400",
  "In Progress": "ring-teal-400",
  "On Hold": "ring-amber-400",
  Completed: "ring-green-400",
};

export default function DashboardSummary({ projects, activeStatus, onStatusClick }) {
  if (projects.length === 0) {
    return null;
  }

  const items = [
    { status: "All", styles: "bg-slate-800 text-white", count: projects.length },
    ...VALID_STATUSES.map((status) => ({
      status,
      styles: STATUS_STYLES[status],
      count: projects.filter((p) => p.status === status).length,
    })),
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map(({ status, styles, count }) => {
        const isActive = activeStatus === status;
        return (
          <button
            key={status}
            type="button"
            aria-pressed={isActive}
            onClick={() => onStatusClick(status)}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 transition hover:opacity-90 ${styles} ${
              isActive ? `ring-2 ring-offset-2 ${RING_COLORS[status]}` : ""
            }`}
          >
            <span className="text-2xl font-bold">{count}</span>
            <span className="text-sm font-medium">{status}</span>
          </button>
        );
      })}
    </div>
  );
}
