import { useQuery } from "@tanstack/react-query";

import {
  fetchWeatherByCity,
  fetchWeatherData,
} from "@/services/weatherService";
import { Language, Units } from "@/types";

export function useWeatherQuery(
  coords: { lat: number; lon: number } | null,
  units: Units = "metric",
  lang: Language = "en",
) {
  return useQuery({
    queryKey: ["weather", coords?.lat, coords?.lon, units, lang],
    queryFn: () => {
      if (!coords) {
        throw new Error("Coordinates are required");
      }
      return fetchWeatherData(coords.lat, coords.lon, units, lang);
    },
    enabled: !!coords,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useWeatherByCityQuery(
  city: string | null,
  units: Units = "metric",
  lang: Language = "en",
) {
  return useQuery({
    queryKey: ["weather", "city", city, units, lang],
    queryFn: () => {
      if (!city) {
        throw new Error("City is required");
      }
      return fetchWeatherByCity(city, units, lang);
    },
    enabled: !!city,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
