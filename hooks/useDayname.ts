import { useFormatter } from "next-intl";
import { useMemo } from "react";

export function useDayName(
  timezone: number,
  datetime: number,
  format: "short" | "long",
) {
  const formatDate = useFormatter();
  const localTime = useMemo(() => {
    let utc_time = new Date(datetime * 1000);
    return new Date(utc_time.getTime() + timezone * 1000);
  }, [datetime, timezone]);

  return formatDate.dateTime(localTime, { weekday: format });
}
