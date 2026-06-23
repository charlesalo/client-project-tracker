export default function EmptyState({ onCreateClick }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-6 py-16 text-center">
      <svg
        className="h-10 w-10 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 13h6m-6 4h6m-7 4h8a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-3.414-3.414A1 1 0 0013.586 3H6a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
      <p className="mt-4 text-base font-semibold text-slate-700">
        No projects yet
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Create your first project to get started.
      </p>
      {onCreateClick && (
        <button
          type="button"
          onClick={onCreateClick}
          className="mt-4 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          Create Project
        </button>
      )}
    </div>
  );
}
