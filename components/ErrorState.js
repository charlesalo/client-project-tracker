export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-6 py-16 text-center">
      <p className="text-base font-semibold text-red-700">
        Something went wrong loading your projects.
      </p>
      <p className="mt-1 text-sm text-red-600">Please try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
