import { useEffect, useState } from "react";

import { DEFAULT_LOCATION } from "@/lib/constants";

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigator.geolocation) {
      setCoords(DEFAULT_LOCATION);
      setLoading(false);
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoading(false);
        setError(null);
      },
      () => {
        setCoords(DEFAULT_LOCATION);
        setLoading(false);
        setError("Permission denied or unavailable");
      },
    );
  }, []);

  return { coords, loading, error };
}
