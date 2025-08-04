import { cache } from "react";

import { CityWeatherParams, Location, WeatherParams } from "@/types";

import API_ENDPOINTS from "./endpoints";

export const fetcher = async (url: string) => {
  const resp = await fetch(url, {
    next: { revalidate: 3600 },
  });
  if (!resp.ok) throw Error(resp.statusText);
  return await resp.json();
};

export const getLocations = cache(
  async (query: string): Promise<Location[]> => {
    const params = new URLSearchParams({
      type: "location",
      query: encodeURIComponent(query),
    });

    const response = (await fetcher(`/api/weather?${params}`)) as {
      locations: Location[];
    };

    return response.locations;
  },
);

export const getWeather = cache((params: WeatherParams) =>
  fetcher(API_ENDPOINTS.weather(params)),
);

export const getWeatherByCity = cache((params: CityWeatherParams) =>
  fetcher(API_ENDPOINTS.weatherByCity(params)),
);

export const getForecastByCoords = cache((params: WeatherParams) =>
  fetcher(API_ENDPOINTS.forecastByCoords(params)),
);

export const getForecastByCity = cache((params: CityWeatherParams) =>
  fetcher(API_ENDPOINTS.forecastByCity(params)),
);
