"use client";

import ThemeToggle from "@/components/calendar/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="border-b border-stone-200/80 bg-[var(--cal-paper)]/85 px-4 py-4 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/85 sm:py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="text-center sm:text-left">
          <h1 className="font-serif text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-2xl">
            Interactive wall calendar
          </h1>
          <p className="mt-1 max-w-xl text-sm text-stone-600 dark:text-stone-400">
            Range selection, month memos, and per-selection notes — saved in{" "}
            <code className="rounded bg-stone-200/80 px-1 text-xs dark:bg-stone-800">
              localStorage
            </code>
            .
          </p>
        </div>
        <ThemeToggle className="shrink-0" />
      </div>
    </header>
  );
}
