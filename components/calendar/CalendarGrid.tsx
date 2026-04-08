"use client";

import {
  dateKey,
  inRange,
  isBeforeToday,
  isToday,
} from "@/lib/calendar";
import { holidayKind, holidayLabel } from "@/lib/holidays";
import DayCell from "./DayCell";
import { WEEKDAYS } from "./constants";

export default function CalendarGrid({
  cells,
  anchor,
  endDate,
  onDayClick,
  disablePastDates,
}: {
  cells: (Date | null)[];
  anchor: Date | null;
  endDate: Date | null;
  onDayClick: (d: Date) => void;
  disablePastDates: boolean;
}) {
  return (
    <div
      className="touch-manipulation grid grid-cols-7 gap-1.5 bg-[var(--cal-line)]/35 p-3 sm:gap-2 sm:p-4 dark:bg-stone-700/25"
      role="grid"
      aria-label="Calendar dates"
    >
      {WEEKDAYS.map((w) => (
        <div
          key={w}
          className="py-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-stone-600 sm:text-xs dark:text-stone-300"
        >
          {w}
        </div>
      ))}
      {cells.map((d, i) => {
        if (!d) {
          return (
            <div
              key={`empty-${i}`}
              className="min-h-[44px] rounded-xl bg-[var(--cal-paper-2)]/40 sm:min-h-[48px] dark:bg-stone-900/20"
            />
          );
        }

        const key = dateKey(d);
        const past = isBeforeToday(d);
        const disabled = disablePastDates && past;
        let isStart = false;
        let isEnd = false;
        let inMiddle = false;
        if (anchor && endDate) {
          const lo = anchor <= endDate ? anchor : endDate;
          const hi = anchor <= endDate ? endDate : anchor;
          isStart = key === dateKey(lo);
          isEnd = key === dateKey(hi);
          inMiddle =
            inRange(d, anchor, endDate) && !isStart && !isEnd;
        }
        const onlyAnchor = Boolean(anchor && !endDate && key === dateKey(anchor));

        const hol = holidayLabel(d);
        const hKind = holidayKind(d);

        return (
          <DayCell
            key={key}
            date={d}
            disabled={disabled}
            isTodayCell={isToday(d)}
            isRangeStart={Boolean(isStart)}
            isRangeEnd={Boolean(isEnd)}
            inRangeMiddle={Boolean(inMiddle)}
            onlyAnchor={onlyAnchor}
            holiday={hol}
            holidayKind={hKind}
            onSelect={onDayClick}
          />
        );
      })}
    </div>
  );
}
