import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProjectCard({ project }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-lg font-bold text-slate-900">{project.clientName}</p>
      <p className="mt-1 text-sm text-slate-600">{project.projectName}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Due {formatDate(project.dueDate)}
      </p>
    </div>
  );
}
