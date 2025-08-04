"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme as useNextTheme } from "next-themes";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useGeolocation } from "@/hooks";
import { Coord, Theme, Units } from "@/types";

/* eslint-disable unused-imports/no-unused-vars */
export interface WeatherSettings {
  coords: Coord | null;
  units: Units;
  setCoords: (coords: Coord | null) => void;
  setUnits: (units: Units) => void;
}

export interface ThemeSettings {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface GeolocationState {
  geoError: string | null;
  geoLoading: boolean;
}
/* eslint-enable unused-imports/no-unused-vars */

export interface AppContextValue
  extends WeatherSettings,
    ThemeSettings,
    GeolocationState {}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { theme: nextTheme, setTheme } = useNextTheme();
  const theme = (nextTheme ?? "dark") as Theme;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [coords, setCoords] = useState<Coord | null>(null);
  const [units, setUnits] = useState<Units>(() => {
    return (searchParams.get("units") as Units) || "metric";
  });

  const {
    coords: geoCoords,
    loading: geoLoading,
    error: geoError,
  } = useGeolocation();

  const updateURL = useCallback(
    (newCoords: Coord | null, newUnits: Units) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newCoords) {
        params.set("lat", String(newCoords.lat));
        params.set("lon", String(newCoords.lon));
      } else {
        params.delete("lat");
        params.delete("lon");
      }

      params.set("units", newUnits);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  useEffect(() => {
    if (geoCoords) {
      setCoords(geoCoords);
    }
  }, [geoCoords]);

  useEffect(() => {
    updateURL(coords, units);
  }, [coords, units, updateURL]);

  const contextValue = useMemo<AppContextValue>(
    () => ({
      theme,
      setTheme,
      coords,
      setCoords,
      units,
      setUnits,
      geoError,
      geoLoading,
    }),
    [theme, setTheme, coords, units, geoError, geoLoading],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
