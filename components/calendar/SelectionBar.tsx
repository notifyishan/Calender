"use client";

export default function SelectionBar({
  selectionLabel,
  onClear,
  waitingForEndDate,
  onFinishSingleDay,
}: {
  selectionLabel: string | null;
  onClear: () => void;
  waitingForEndDate: boolean;
  onFinishSingleDay: () => void;
}) {
  if (!selectionLabel) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-stone-200/80 bg-stone-50/50 px-4 py-3 motion-safe:transition-opacity motion-safe:duration-300 sm:gap-3 sm:px-5 dark:border-stone-700/80 dark:bg-stone-900/30">
      <span className="min-w-0 flex-1 text-sm text-stone-600 dark:text-stone-400">
        <span className="font-semibold text-stone-800 dark:text-stone-200">
          {waitingForEndDate ? "Start" : "Selected"}
        </span>
        <span className="mx-1.5 text-stone-400">·</span>
        {selectionLabel}
        {waitingForEndDate && (
          <span className="mt-1 block text-xs font-normal text-stone-500 dark:text-stone-500">
            Tap an end date on the grid, or use “One day” below.
          </span>
        )}
      </span>
      {waitingForEndDate && (
        <button
          type="button"
          onClick={onFinishSingleDay}
          className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-900 transition-all duration-200 hover:bg-sky-100 active:scale-95 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/70"
        >
          One day
        </button>
      )}
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-all duration-200 hover:border-stone-300 hover:bg-stone-50 active:scale-95 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
      >
        Clear
      </button>
    </div>
  );
}
