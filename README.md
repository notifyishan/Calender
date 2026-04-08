# Interactive wall calendar

Next.js (App Router) + React + Tailwind CSS. Client-only persistence via `localStorage` (no backend).

## Features

- **Wall calendar layout**: Hero image changes with the month; calendar grid sits beside it on large screens and stacks on small screens.
- **Day range selection**: First tap sets the start date, second tap sets the end date (same day twice = single-day selection). A third selection starts a new range. Clear resets selection.
- **Visual states**: Distinct styles for range endpoints and days in between; today is highlighted.
- **Notes**: “Month memo” per month/year key; “Selection notes” tied to the chosen date range (or single day).
- **Responsive**: Side-by-side on desktop (`lg`); vertical stack on mobile with 44px+ tap targets.
- **Extras**: Holiday markers (federal vs cultural), scenic Unsplash hero per month, light/dark theme (persisted), optional lock on past dates, subtle selection pulse on range endpoints.
- **Components**: `HeroSection`, `CalendarHeader`, `CalendarGrid`, `DayCell`, `SelectionBar`, `NotesPanel`, `ThemeToggle`; `InteractiveWallCalendar` uses `useState` + `localStorage` on load/blur + `ThemeProvider`.

## Run locally

```bash
cd interactive-calendar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Choices

- **State**: React `useState` / `useMemo` — scope is small; no global store needed.
- **Dates**: Native `Date` + small helpers in `lib/calendar.ts` (no date library).
- **Persistence**: `localStorage` JSON maps keyed by month (`YYYY-MM`) and by range (`YYYY-MM-DD_YYYY-MM-DD`).
- **Images**: Remote images from `images.unsplash.com` via `next/image` (`next.config.ts` `remotePatterns`).

For submission, record a short demo video showing range selection, both note areas, and resizing between mobile and desktop widths.
