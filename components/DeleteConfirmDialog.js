export default function DeleteConfirmDialog({ project, onConfirm, onCancel }) {
  return (
    <div className="flex flex-col gap-4">
      <h2
        id="delete-confirm-title"
        className="text-lg font-semibold text-slate-900"
      >
        Delete &apos;{project.projectName}&apos;?
      </h2>
      <p className="text-sm text-slate-600">This action cannot be undone.</p>
      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          autoFocus
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
