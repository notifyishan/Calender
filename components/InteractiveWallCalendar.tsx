"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import HeroSection from "@/components/calendar/HeroSection";
import NotesPanel from "@/components/calendar/NotesPanel";
import SelectionBar from "@/components/calendar/SelectionBar";
import {
  dateKey,
  monthGrid,
  monthKey,
  rangeStorageKey,
} from "@/lib/calendar";
import { HERO_BY_MONTH } from "@/lib/hero-images";
import {
  LS_MONTH_NOTES,
  LS_RANGE_NOTES,
  loadStringMap,
  saveStringMap,
} from "@/lib/storage";

export default function InteractiveWallCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [anchor, setAnchor] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [disablePastDates, setDisablePastDates] = useState(false);

  const [monthNotes, setMonthNotes] = useState<Record<string, string>>({});
  const [rangeNotes, setRangeNotes] = useState<Record<string, string>>({});
  const [monthDraft, setMonthDraft] = useState("");
  const [rangeDraft, setRangeDraft] = useState("");
  const [storeReady, setStoreReady] = useState(false);

  useEffect(() => {
    setMonthNotes(loadStringMap(LS_MONTH_NOTES));
    setRangeNotes(loadStringMap(LS_RANGE_NOTES));
    setStoreReady(true);
  }, []);

  const mk = monthKey(year, month);

  useEffect(() => {
    if (!storeReady) return;
    setMonthDraft(monthNotes[mk] ?? "");
  }, [mk, monthNotes, storeReady]);

  const rangeKey = useMemo(() => {
    if (!anchor || !endDate) return null;
    return rangeStorageKey(anchor, endDate);
  }, [anchor, endDate]);

  useEffect(() => {
    if (!storeReady) return;
    if (!rangeKey) {
      setRangeDraft("");
      return;
    }
    setRangeDraft(rangeNotes[rangeKey] ?? "");
  }, [rangeKey, rangeNotes, storeReady]);

  const persistMonthNotes = useCallback(() => {
    setMonthNotes((prev) => {
      const next = { ...prev, [mk]: monthDraft };
      saveStringMap(LS_MONTH_NOTES, next);
      return next;
    });
  }, [mk, monthDraft]);

  const persistRangeNotes = useCallback(() => {
    if (!rangeKey) return;
    setRangeNotes((prev) => {
      const next = { ...prev, [rangeKey]: rangeDraft };
      saveStringMap(LS_RANGE_NOTES, next);
      return next;
    });
  }, [rangeKey, rangeDraft]);

  const cells = useMemo(() => monthGrid(year, month), [year, month]);

  function onDayClick(d: Date) {
    const y = d.getFullYear();
    const m = d.getMonth();
    const day = d.getDate();
    const picked = new Date(y, m, day);

    if (!anchor || (anchor && endDate)) {
      setAnchor(picked);
      setEndDate(null);
      return;
    }
    setEndDate(picked);
  }

  function finishSingleDay() {
    if (!anchor) return;
    const y = anchor.getFullYear();
    const mo = anchor.getMonth();
    const day = anchor.getDate();
    setEndDate(new Date(y, mo, day));
  }

  function clearSelection() {
    setAnchor(null);
    setEndDate(null);
  }

  function goMonth(delta: number) {
    const t = new Date(year, month + delta, 1);
    setYear(t.getFullYear());
    setMonth(t.getMonth());
    clearSelection();
  }

  const heroSrc = HERO_BY_MONTH[month % 12];
  const monthLabel = new Date(year, month, 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const selectionLabel = useMemo(() => {
    if (!anchor) return null;
    if (!endDate || dateKey(anchor) === dateKey(endDate)) {
      return anchor.toLocaleDateString("default", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    const a = anchor <= endDate ? anchor : endDate;
    const b = anchor <= endDate ? endDate : anchor;
    return `${a.toLocaleDateString("default", { month: "short", day: "numeric" })} – ${b.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })}`;
  }, [anchor, endDate]);

  const showSelectionBar = Boolean(anchor || endDate);
  const waitingForEndDate = Boolean(anchor && !endDate);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="pointer-events-auto overflow-hidden rounded-3xl border border-stone-200/90 bg-[var(--cal-paper)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.03)] dark:border-stone-700/80 dark:bg-stone-900 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <HeroSection
            imageSrc={heroSrc}
            monthLabel={monthLabel}
            subtitle="Tap start, then end. Use “One day” under the grid for a single date. Third tap starts a new range. Notes stay on this device."
          />

          <div className="relative z-10 flex min-h-[min(60vh,520px)] min-w-0 flex-1 flex-col border-stone-200/80 bg-[var(--cal-paper-2)] lg:border-l dark:border-stone-700/80 dark:bg-stone-900/80">
            <CalendarHeader
              monthLabel={monthLabel}
              onPrev={() => goMonth(-1)}
              onNext={() => goMonth(1)}
              disablePastDates={disablePastDates}
              onToggleDisablePast={() => setDisablePastDates((v) => !v)}
            />
            <CalendarGrid
              cells={cells}
              anchor={anchor}
              endDate={endDate}
              onDayClick={onDayClick}
              disablePastDates={disablePastDates}
            />
            {showSelectionBar && (
              <SelectionBar
                selectionLabel={selectionLabel}
                onClear={clearSelection}
                waitingForEndDate={waitingForEndDate}
                onFinishSingleDay={finishSingleDay}
              />
            )}
          </div>
        </div>

        <NotesPanel
          monthLabel={monthLabel}
          monthDraft={monthDraft}
          onMonthDraftChange={setMonthDraft}
          onMonthBlur={persistMonthNotes}
          rangeKey={rangeKey}
          selectionLabel={selectionLabel}
          rangeDraft={rangeDraft}
          onRangeDraftChange={setRangeDraft}
          onRangeBlur={persistRangeNotes}
          waitingForEndDate={waitingForEndDate}
        />
      </div>
    </div>
  );
}
