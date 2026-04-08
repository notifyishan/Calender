export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

/** Calendar grid cells: null = padding */
export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const pad = first.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < pad; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

export function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

/** True if calendar date is strictly before today's calendar date. */
export function isBeforeToday(d: Date): boolean {
  const today = new Date();
  const t0 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return t1 < t0;
}

export function inRange(d: Date, start: Date, end: Date): boolean {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  ).getTime();
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  return t >= lo && t <= hi;
}

export function rangeStorageKey(start: Date, end: Date): string {
  const k1 = dateKey(start);
  const k2 = dateKey(end);
  return k1 <= k2 ? `${k1}_${k2}` : `${k2}_${k1}`;
}
