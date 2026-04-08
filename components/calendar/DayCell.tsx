"use client";

import type { HolidayTag } from "@/lib/holidays";

export type DayCellProps = {
  date: Date;
  disabled?: boolean;
  isTodayCell: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  inRangeMiddle: boolean;
  onlyAnchor: boolean;
  holiday: string | null;
  holidayKind: HolidayTag | null;
  onSelect: (d: Date) => void;
};

export default function DayCell({
  date,
  disabled = false,
  isTodayCell,
  isRangeStart,
  isRangeEnd,
  inRangeMiddle,
  onlyAnchor,
  holiday,
  holidayKind,
  onSelect,
}: DayCellProps) {
  const isEndpoint = isRangeStart || isRangeEnd || onlyAnchor;

  return (
    <button
      type="button"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        if (disabled) return;
        onSelect(date);
      }}
      aria-label={
        holiday
          ? `${date.getDate()}, ${holiday}`
          : `Select ${date.toDateString()}`
      }
      aria-pressed={isEndpoint || inRangeMiddle}
      className={[
        "relative flex min-h-[44px] flex-col touch-manipulation items-center justify-center rounded-xl border text-sm font-medium sm:min-h-[48px]",
        "select-none transition-all duration-200 ease-out",
        disabled
          ? "cursor-not-allowed border-stone-200/60 bg-stone-100 text-stone-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400"
          : "cursor-pointer border-stone-200/40 bg-white text-stone-900 shadow-sm dark:border-stone-600 dark:bg-stone-700 dark:text-stone-50 dark:shadow-lg dark:shadow-black/25",
        !disabled &&
          "hover:z-[2] hover:scale-[1.05] hover:shadow-lg hover:shadow-stone-900/10 active:scale-[0.96] dark:hover:shadow-black/30",
        !disabled &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-stone-900",
        isTodayCell &&
          !isEndpoint &&
          !inRangeMiddle &&
          "ring-2 ring-amber-500 ring-offset-2 ring-offset-[var(--cal-paper-2)] dark:ring-amber-400 dark:ring-offset-stone-900",
        inRangeMiddle &&
          "z-[1] border-sky-300 bg-sky-100 text-sky-950 dark:border-sky-600 dark:bg-sky-950/60 dark:text-sky-50",
        isEndpoint &&
          "z-[1] border-2 border-sky-600 bg-sky-50 text-sky-950 shadow-md dark:border-sky-400 dark:bg-sky-900/80 dark:text-sky-50",
        isEndpoint && "animate-cal-endpoint",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "tabular-nums leading-none",
          isTodayCell ? "font-semibold" : "font-medium",
          disabled
            ? "text-stone-500 dark:text-stone-400"
            : "text-stone-900 dark:text-stone-50",
          inRangeMiddle && "text-sky-950 dark:text-sky-50",
          isEndpoint && "text-sky-950 dark:text-sky-50",
        ].join(" ")}
      >
        {date.getDate()}
      </span>
      {holiday && !disabled && (
        <span
          className={[
            "absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
            holidayKind === "cultural"
              ? "bg-violet-500 shadow-sm shadow-violet-500/40"
              : "bg-rose-500 shadow-sm shadow-rose-500/40",
          ].join(" ")}
          title={holiday}
        />
      )}
    </button>
  );
}
