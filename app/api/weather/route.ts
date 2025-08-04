import { NextRequest, NextResponse } from "next/server";

import {
  getForecastByCity,
  getForecastByCoords,
  getLocations,
  getWeather,
  getWeatherByCity,
} from "@/lib/api";
import { API_KEY } from "@/lib/constants";
import { CurrentWeather, Forecast, Language, Location, Units } from "@/types";

const VALID_UNITS: Units[] = ["metric", "imperial"];
const VALID_LANGUAGES: Language[] = ["en", "es", "tr"];

interface WeatherResponse {
  current: CurrentWeather;
  forecast: Forecast;
  location: string;
}

interface LocationResponse {
  locations: Location[];
}

const isValidLatitude = (lat: number): boolean => {
  return lat >= -90 && lat <= 90;
};

const isValidLongitude = (lon: number): boolean => {
  return lon >= -180 && lon <= 180;
};

const isValidUnits = (units: string): units is Units => {
  return VALID_UNITS.includes(units as Units);
};

const isValidLanguage = (lang: string): lang is Language => {
  return VALID_LANGUAGES.includes(lang as Language);
};

const validateQuery = (query: string): boolean => {
  return query.length >= 1 && query.length <= 100;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const query = searchParams.get("query");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const city = searchParams.get("city");
    const units = searchParams.get("units") || "metric";
    const lang = searchParams.get("lang") || "en";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "OpenWeather API key not configured" },
        { status: 500 },
      );
    }

    if (!isValidUnits(units)) {
      return NextResponse.json(
        {
          error:
            "Invalid units parameter. Must be one of: metric, imperial, kelvin",
        },
        { status: 400 },
      );
    }

    if (!isValidLanguage(lang)) {
      return NextResponse.json(
        { error: "Invalid language parameter. Must be one of: en, es, tr" },
        { status: 400 },
      );
    }

    if (type === "location") {
      if (!query) {
        return NextResponse.json(
          { error: "Query parameter is required for location search" },
          { status: 400 },
        );
      }

      if (!validateQuery(query)) {
        return NextResponse.json(
          { error: "Query must be between 1 and 100 characters" },
          { status: 400 },
        );
      }

      try {
        const locations = await getLocations(query);
        const response: LocationResponse = { locations };
        return NextResponse.json(response);
      } catch (error) {
        console.error("Location API error:", error);
        return NextResponse.json(
          { error: "Failed to fetch location data" },
          { status: 500 },
        );
      }
    }

    let currentData: CurrentWeather;
    let forecastData: Forecast;

    if (lat && lon) {
      const latNum = Number(lat);
      const lonNum = Number(lon);

      if (isNaN(latNum) || isNaN(lonNum)) {
        return NextResponse.json(
          { error: "Invalid coordinates. lat and lon must be valid numbers" },
          { status: 400 },
        );
      }

      if (!isValidLatitude(latNum)) {
        return NextResponse.json(
          { error: "Invalid latitude. Must be between -90 and 90" },
          { status: 400 },
        );
      }

      if (!isValidLongitude(lonNum)) {
        return NextResponse.json(
          { error: "Invalid longitude. Must be between -180 and 180" },
          { status: 400 },
        );
      }

      try {
        [currentData, forecastData] = await Promise.all([
          getWeather({ lat: latNum, lon: lonNum, units, lang }),
          getForecastByCoords({ lat: latNum, lon: lonNum, units, lang }),
        ]);
      } catch (error) {
        console.error("Weather API error for coordinates:", error);
        return NextResponse.json(
          {
            error: "Failed to fetch weather data for the specified coordinates",
          },
          { status: 500 },
        );
      }
    } else if (city) {
      if (city.length < 1 || city.length > 100) {
        return NextResponse.json(
          { error: "City name must be between 1 and 100 characters" },
          { status: 400 },
        );
      }

      try {
        [currentData, forecastData] = await Promise.all([
          getWeatherByCity({ city, units, lang }),
          getForecastByCity({ city, units, lang }),
        ]);
      } catch (error) {
        console.error("Weather API error for city:", error);
        return NextResponse.json(
          { error: "Failed to fetch weather data for the specified city" },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "Either lat/lon or city parameter is required" },
        { status: 400 },
      );
    }

    const response: WeatherResponse = {
      current: currentData,
      forecast: forecastData,
      location: currentData?.name || "Unknown Location",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Unexpected error in weather API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
