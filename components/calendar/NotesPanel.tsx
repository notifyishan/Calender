"use client";

export default function NotesPanel({
  monthLabel,
  monthDraft,
  onMonthDraftChange,
  onMonthBlur,
  rangeKey,
  selectionLabel,
  rangeDraft,
  onRangeDraftChange,
  onRangeBlur,
  waitingForEndDate,
}: {
  monthLabel: string;
  monthDraft: string;
  onMonthDraftChange: (v: string) => void;
  onMonthBlur: () => void;
  rangeKey: string | null;
  selectionLabel: string | null;
  rangeDraft: string;
  onRangeDraftChange: (v: string) => void;
  onRangeBlur: () => void;
  waitingForEndDate: boolean;
}) {
  return (
    <div className="grid gap-0 border-t border-stone-200/80 bg-[#fffef8] lg:grid-cols-2 dark:border-stone-700/80 dark:bg-stone-950/50">
      <div className="border-stone-200/80 p-4 sm:p-5 lg:border-r dark:border-stone-700/80">
        <label
          htmlFor="month-memo"
          className="mb-1.5 block font-serif text-base font-semibold text-stone-800 dark:text-stone-100"
        >
          Month notes
        </label>
        <p className="mb-3 text-xs text-stone-500 dark:text-stone-400">
          General memo for {monthLabel}. Stored locally in your browser.
        </p>
        <textarea
          id="month-memo"
          value={monthDraft}
          onChange={(e) => onMonthDraftChange(e.target.value)}
          onBlur={onMonthBlur}
          rows={5}
          className="w-full resize-y rounded-xl border border-amber-200/70 bg-[linear-gradient(transparent_1.5rem,rgba(231,229,224,0.85)_1px)] bg-[length:100%_1.5rem] bg-[#fffdf7] px-3 py-2 text-sm leading-6 text-stone-800 shadow-inner outline-none transition-shadow duration-200 placeholder:text-stone-400 focus:border-amber-400 focus:shadow-md focus:ring-2 focus:ring-amber-200/60 dark:border-amber-900/40 dark:bg-[linear-gradient(transparent_1.5rem,rgba(68,64,60,0.5)_1px)] dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-600 dark:focus:ring-amber-900/40"
          placeholder="Goals, reminders, birthdays this month…"
        />
      </div>
      <div className="p-4 sm:p-5">
        <label
          htmlFor="range-memo"
          className="mb-1.5 block font-serif text-base font-semibold text-stone-800 dark:text-stone-100"
        >
          Selection notes
        </label>
        {!rangeKey ? (
          <div className="space-y-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {waitingForEndDate ? (
              <p>
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  Step 2:
                </span>{" "}
                Tap an <strong>end date</strong> on the calendar, or tap{" "}
                <strong>One day</strong> under the grid.
              </p>
            ) : (
              <p>
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  Step 1:
                </span>{" "}
                Tap a <strong>start date</strong> on the calendar.
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="mb-3 text-xs font-medium text-sky-700 dark:text-sky-300">
              {selectionLabel}
            </p>
            <textarea
              id="range-memo"
              value={rangeDraft}
              onChange={(e) => onRangeDraftChange(e.target.value)}
              onBlur={onRangeBlur}
              rows={5}
              className="w-full resize-y rounded-xl border border-sky-200/80 bg-[linear-gradient(transparent_1.5rem,rgba(231,229,224,0.85)_1px)] bg-[length:100%_1.5rem] bg-[#f8fcff] px-3 py-2 text-sm leading-6 text-stone-800 shadow-inner outline-none transition-shadow duration-200 placeholder:text-stone-400 focus:border-sky-400 focus:shadow-md focus:ring-2 focus:ring-sky-200/70 dark:border-sky-900/50 dark:bg-[linear-gradient(transparent_1.5rem,rgba(68,64,60,0.5)_1px)] dark:bg-sky-950/30 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/50"
              placeholder="Notes for this selection…"
            />
          </>
        )}
      </div>
    </div>
  );
}
