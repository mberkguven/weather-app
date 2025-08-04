"use client";

import { useLocale } from "next-intl";

import { CurrentWeather } from "@/components/current-weather";
import { Dashboard } from "@/components/dashboard";
import { GeolocationError } from "@/components/ui/geolocation-error";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { WeeklyForecast } from "@/components/weekly-forecast";
import { useAppContext } from "@/contexts/AppContext";
import { useWeatherQuery } from "@/hooks";
import { Language } from "@/types";

export default function Home() {
  const locale = useLocale() as Language;
  const { coords, units, geoLoading, geoError } = useAppContext();
  const {
    data,
    isLoading: weatherLoading,
    isError,
  } = useWeatherQuery(coords, units, locale);

  if (geoLoading || weatherLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data) return;

  const [today] = data.forecast.list;

  return (
    <div className="container max-w-screen-lg">
      <div className="flex-1">
        {geoError && <GeolocationError />}
        <CurrentWeather data={today} city={data.forecast.city} />
        <Dashboard data={today} />
        <WeeklyForecast data={data.forecast} />
      </div>
    </div>
  );
}
