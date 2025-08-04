"use client";

import { NavigationIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAppContext } from "@/contexts/AppContext";
import { useDisclosure } from "@/hooks";
import { useDebounce, useLocationsQuery } from "@/hooks";
import { DEFAULT_SUGGESTIONS } from "@/lib/constants";
import { Location } from "@/types";

import { Button, ButtonProps } from "./ui/button";

export const LocationButton = ({ ...props }: ButtonProps) => {
  const t = useTranslations();
  return (
    <Button variant="outline" {...props}>
      <NavigationIcon size={14} className="mr-2" />
      <p className="text-sm text-muted-foreground">
        {t("app.change_location")}
      </p>
    </Button>
  );
};

export const LocationItem = ({
  location,
  onSelect,
}: {
  location: Location;
  onSelect: () => void;
}) => {
  const value = [
    location.name,
    location.state,
    location.country,
    location.lat,
    location.lon,
  ]
    .filter(Boolean)
    .join(" ");

  const name = [location.name, location.state, location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <CommandItem value={value} onSelect={onSelect}>
      <NavigationIcon size={16} className="mr-2" />
      <p className="flex items-center gap-4">
        <span>{name}</span>
      </p>
    </CommandItem>
  );
};

export const LocationDialog = () => {
  const { setCoords } = useAppContext();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const { data: results = [], isLoading: loading } =
    useLocationsQuery(debouncedValue);
  const { isOpen, open, close, toggle } = useDisclosure();
  const t = useTranslations();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const handleLocationSelect = (location: Location) => {
    setCoords({ lat: location.lat, lon: location.lon });
    close();
  };

  return (
    <>
      <LocationButton onClick={open} />
      <CommandDialog open={isOpen} onOpenChange={toggle}>
        <CommandInput
          value={value}
          onValueChange={setValue}
          placeholder={t("app.search_city")}
        />
        <CommandList>
          {!loading && <CommandEmpty>{t("app.no_results")}</CommandEmpty>}

          {loading && (
            <div className="py-4 flex items-center justify-center">
              <span className="w-8 h-8 rounded-full border-4 border-r-foreground animate-spin" />
            </div>
          )}

          {value === "" && (
            <CommandGroup heading={t("app.suggestions")}>
              {DEFAULT_SUGGESTIONS.map((location: Location) => (
                <LocationItem
                  key={`${location.lat},${location.lon}`}
                  location={location}
                  onSelect={() => handleLocationSelect(location)}
                />
              ))}
            </CommandGroup>
          )}

          {results.length > 0 && !loading && (
            <CommandGroup heading={t("app.results")}>
              {(results as Location[]).map((location: Location) => (
                <LocationItem
                  key={`${String(location.lat)},${String(location.lon)}`}
                  location={location}
                  onSelect={() => handleLocationSelect(location)}
                />
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
