import { format, toZonedTime } from "date-fns-tz";

const BR_TIMEZONE = "America/Sao_Paulo";

export function formatDateToBR(date: Date) {
  const zonedDate = toZonedTime(date, BR_TIMEZONE);
  return format(zonedDate, "dd/MM/yyyy HH:mm:ss", { timeZone: BR_TIMEZONE });
}
