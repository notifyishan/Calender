/** US + common observances — dot + tooltip on grid */
export function holidayLabel(d: Date): string | null {
  const m = d.getMonth();
  const day = d.getDate();
  const w = d.getDay();

  if (m === 0 && day === 1) return "New Year's Day";
  if (m === 0 && w === 1 && day >= 15 && day <= 21) return "MLK Day";
  if (m === 1 && day === 14) return "Valentine's Day";
  if (m === 6 && day === 4) return "Independence Day";
  if (m === 8 && w === 1 && day <= 7) return "Labor Day";
  if (m === 9 && w === 1 && day >= 8 && day <= 14) return "Columbus Day";
  if (m === 10 && day === 11) return "Veterans Day";
  if (m === 10 && w === 4 && day >= 22 && day <= 28) return "Thanksgiving";
  if (m === 11 && day === 25) return "Christmas";
  if (m === 9 && day === 31) return "Halloween";

  return null;
}

export type HolidayTag = "federal" | "cultural";

export function holidayKind(d: Date): HolidayTag | null {
  const label = holidayLabel(d);
  if (!label) return null;
  if (
    label === "Valentine's Day" ||
    label === "Halloween" ||
    label === "Christmas"
  ) {
    return "cultural";
  }
  return "federal";
}
