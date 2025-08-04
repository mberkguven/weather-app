import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalTime = (
  initialTime: Date,
  offsetSeconds: number,
): Date => {
  return new Date(initialTime.getTime() + offsetSeconds * 1000);
};

export const formatTemperature = (temp: number, units: string = "metric") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: units === "metric" ? "celsius" : "fahrenheit",
    unitDisplay: "narrow",
  });
  const value = Math.round(temp);
  return formatter.format(value);
};

export const formatDistance = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
    maximumFractionDigits: 0,
  });
  return formatter.format(value / 1000);
};

export const getDescription = {
  feelsLike: (
    feels_like: number,
    temp: number,
    // eslint-disable-next-line unused-imports/no-unused-vars
    t: (key: string) => string,
  ): string => {
    if (feels_like < temp) return t("messages.feels_colder");
    if (feels_like > temp) return t("messages.feels_warmer");
    return t("messages.feels_same");
  },
  humidity: (
    humidity: number,
    // eslint-disable-next-line unused-imports/no-unused-vars
    t: (key: string) => string,
  ): string => {
    if (humidity < 40) return t("messages.humidity_low");
    if (humidity < 70) return t("messages.humidity_modarate");
    return t("messages.humidity_high");
  },
  visibility: (
    visibility: number,
    // eslint-disable-next-line unused-imports/no-unused-vars
    t: (key: string) => string,
  ): string => {
    if (visibility >= 1000) return t("messages.visibility_clear");
    if (visibility >= 500) return t("messages.visibility_good");
    return t("messages.visibility_poor");
  },
};

export const getForecastDetailData = (
  date: string | string[],
  forecastList: any[],
): any => {
  const dateText = Array.isArray(date) ? date[0] : date;
  const decodedDateText = decodeURIComponent(dateText);
  const forecastItem = forecastList.find(
    (item: any) => item.dt_txt === decodedDateText,
  );

  return forecastItem;
};
