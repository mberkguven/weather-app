import { useQuery } from "@tanstack/react-query";

import { getLocations } from "@/lib/api";
import { Location } from "@/types";

export function useLocationsQuery(query: string | null) {
  return useQuery({
    queryKey: ["locations", query],
    queryFn: async (): Promise<Location[]> => {
      if (!query) return [];
      return getLocations(query);
    },
    enabled: !!query && query.length > 2,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
