import { CurrentWeather, Forecast, Language, Units } from "@/types";

export interface WeatherData {
  current: CurrentWeather;
  forecast: Forecast;
  location: string;
}

export async function fetchWeatherData(
  lat: number,
  lon: number,
  units: Units = "metric",
  lang: Language = "en",
): Promise<WeatherData> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    units,
    lang,
  });

  const response = await fetch(`/api/weather?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchWeatherByCity(
  city: string,
  units: Units = "metric",
  lang: Language = "en",
): Promise<WeatherData> {
  const params = new URLSearchParams({
    city: encodeURIComponent(city),
    units,
    lang,
  });

  const response = await fetch(`/api/weather?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
