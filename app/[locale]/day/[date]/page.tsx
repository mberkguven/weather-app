"use client";

import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { CurrentWeather } from "@/components/current-weather";
import { Dashboard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useAppContext } from "@/contexts/AppContext";
import { useWeatherQuery } from "@/hooks";
import { useRouter } from "@/i18n/navigation";
import { getForecastDetailData } from "@/lib/utils";
import { Language } from "@/types";

export default function DayDetailPage() {
  const { date } = useParams();
  const router = useRouter();
  const locale = useLocale() as Language;
  const t = useTranslations();
  const { coords, units, geoLoading } = useAppContext();
  const { data, isLoading, isError } = useWeatherQuery(coords, units, locale);

  if (geoLoading || isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data) return <div>Could not load weather data.</div>;

  const forecastData = getForecastDetailData(date, data.forecast.list);

  if (!forecastData) {
    return <div>No forecast data for this day.</div>;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${locale}`);
    }
  };

  return (
    <div className="container max-w-screen-lg">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2"
        onClick={handleBack}
      >
        <ArrowLeft size={18} />
        <span>{t("app.back")}</span>
      </Button>
      <CurrentWeather data={forecastData} city={data.forecast.city} />
      <Dashboard data={forecastData} />
    </div>
  );
}
