import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAppContext } from "@/contexts/AppContext";
import { useDayName } from "@/hooks";
import { Link } from "@/i18n/navigation";
import { formatTemperature } from "@/lib/utils";
import { Forecast, List } from "@/types";

import { Card, CardContent, CardHeader } from "./ui/card";
import { WeatherIcon } from "./ui/weather-icon";

export const WeeklyForecastItem = ({
  item,
  timezone,
}: {
  item: List;
  timezone: number;
}) => {
  const dayName = useDayName(timezone, item.dt, "short");
  const { units } = useAppContext();
  const dt_txt = item.dt_txt;
  return (
    <Link
      key={item.dt}
      href={`/day/${encodeURIComponent(dt_txt)}`}
      className="flex justify-between md:flex-col gap-4 items-center hover:bg-accent/40 rounded transition-colors cursor-pointer p-2 md:p-4"
      scroll={false}
    >
      <span className="opacity-60 flex-1">{dayName}</span>
      <WeatherIcon
        className="text-2xl"
        code={item.weather[0].id}
        pod={item.sys.pod}
      />
      <span className="flex-1 text-right">
        {formatTemperature(item.main.temp, units)}
      </span>
    </Link>
  );
};

export const WeeklyForecast = ({ data }: { data: Forecast }) => {
  const list = data.list.filter((item) => item.dt_txt.match(/09:00:00/));
  const t = useTranslations();

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center text-sm gap-2">
          <CalendarIcon size={16} />
          <span>{t("app.weekly_forecast")}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {list.map((item) => (
            <WeeklyForecastItem
              key={item.dt}
              item={item}
              timezone={data.city.timezone}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
