"use client";

export default function CalendarHeader({
  monthLabel,
  onPrev,
  onNext,
  disablePastDates,
  onToggleDisablePast,
}: {
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
  disablePastDates: boolean;
  onToggleDisablePast: () => void;
}) {
  return (
    <div className="space-y-3 border-b border-stone-200/80 px-4 py-3 sm:px-5 dark:border-stone-700/80">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-stone-200/90 bg-white text-lg text-stone-700 shadow-sm transition-all duration-200 hover:border-stone-300 hover:shadow-md active:scale-95 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-stone-500"
          aria-label="Previous month"
        >
          ‹
        </button>
        <h2 className="font-serif text-lg font-semibold tracking-tight text-stone-900 sm:text-xl dark:text-stone-50">
          {monthLabel}
        </h2>
        <button
          type="button"
          onClick={onNext}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-stone-200/90 bg-white text-lg text-stone-700 shadow-sm transition-all duration-200 hover:border-stone-300 hover:shadow-md active:scale-95 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-stone-500"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          role="switch"
          aria-checked={!disablePastDates}
          onClick={onToggleDisablePast}
          className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-stone-50/80 px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100 dark:border-stone-600 dark:bg-stone-800/80 dark:text-stone-400 dark:hover:bg-stone-800"
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${disablePastDates ? "bg-emerald-500" : "bg-stone-300 dark:bg-stone-600"}`}
          />
          {disablePastDates ? "Past dates locked" : "Past dates selectable"}
        </button>
        <div className="flex w-full flex-wrap items-center justify-center gap-3 text-[10px] text-stone-400 dark:text-stone-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Federal
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Cultural
          </span>
        </div>
      </div>
    </div>
  );
}
