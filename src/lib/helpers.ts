import { accidentType } from "@/store/dash-store";

export function calculateStats(data: accidentType[] | null) {
  if (!data) return {
    totalFatalAccidents: 0,
    totalNonFatalAccidents: 0,
    totalRoadAccidents: 0,
    totalPersonsInjured: 0,
  };

  return {
    totalFatalAccidents: data.filter(a => a.severity.toLowerCase() === "fatal").length,
    totalNonFatalAccidents: data.filter(a => a.severity.toLowerCase() !== "fatal").length,
    totalRoadAccidents: data.length,
    totalPersonsInjured: data.reduce((sum, a) => sum + (a.injuries || 0), 0),
  };
}


export function getChange(current: number, previous: number) {
  if (previous === 0) return { change: "N/A", changeType: "up" as const };
  const diff = current - previous;
  const percent = Math.abs((diff / previous) * 100).toFixed(1);
  return {
    change: `${percent}%`,
    changeType: diff >= 0 ? "up" : "down" as const,
  };
}

export function cleanText(text: string) {
  // Replace 2+ consecutive new lines with a single new line
  return text.replace(/\n{2,}/g, "\n").trim();
}

