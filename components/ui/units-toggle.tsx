"use client";

import { ThermometerSun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { Units } from "@/types";

export function UnitsToggle() {
  const { units, setUnits } = useAppContext();

  const handleUnitsChange = (newUnits: Units) => {
    setUnits(newUnits);
  };

  return (
    <Button
      variant="outline"
      onClick={() =>
        handleUnitsChange(units === "metric" ? "imperial" : "metric")
      }
      title={units === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
      className="gap-1 px-2"
    >
      <ThermometerSun size={14} />
      <span>{units === "metric" ? "°C" : "°F"}</span>
    </Button>
  );
}
