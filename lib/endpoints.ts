import { CityWeatherParams, WeatherParams } from "@/types";

import { API_KEY, API_URL } from "./constants";

const API_ENDPOINTS = {
  location: ({ query }: Record<string, string>) =>
    `${API_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,

  weather: ({ lat, lon, units, lang }: WeatherParams) =>
    `${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`,

  weatherByCity: ({ city, units, lang }: CityWeatherParams) =>
    `${API_URL}/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${API_KEY}`,

  forecastByCoords: ({ lat, lon, units, lang }: WeatherParams) =>
    `${API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`,

  forecastByCity: ({ city, units, lang }: CityWeatherParams) =>
    `${API_URL}/data/2.5/forecast?q=${city}&units=${units}&lang=${lang}&appid=${API_KEY}`,
};

export default API_ENDPOINTS;
