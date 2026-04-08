export const LS_MONTH_NOTES = "wall-cal-v1-month-notes";
export const LS_RANGE_NOTES = "wall-cal-v1-range-notes";

export function loadStringMap(key: string): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const p = JSON.parse(raw) as Record<string, string>;
    return typeof p === "object" && p !== null ? p : {};
  } catch {
    return {};
  }
}

export function saveStringMap(key: string, map: Record<string, string>) {
  localStorage.setItem(key, JSON.stringify(map));
}
