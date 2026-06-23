import { STATUS_STYLES } from "@/components/StatusBadge";
import { VALID_STATUSES } from "@/lib/validateProject";

export default function DashboardSummary({ projects }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {VALID_STATUSES.map((status) => {
        const count = projects.filter((p) => p.status === status).length;
        return (
          <div
            key={status}
            className={`flex flex-col items-center justify-center rounded-lg p-4 ${STATUS_STYLES[status]}`}
          >
            <span className="text-2xl font-bold">{count}</span>
            <span className="text-sm font-medium">{status}</span>
          </div>
        );
      })}
    </div>
  );
}
