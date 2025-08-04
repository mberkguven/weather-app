"use client";

import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks";

interface CountdownButtonProps {
  className?: string;
}

export function CountdownButton({ className }: CountdownButtonProps) {
  const queryClient = useQueryClient();
  const { formattedTime, reset } = useCountdown(600, () => {
    refreshWeather();
  });

  const refreshWeather = () => {
    queryClient.invalidateQueries({ queryKey: ["weather"] });
    reset();
  };

  return (
    <Button variant="outline" onClick={refreshWeather} className={className}>
      <RefreshCw className="h-4 w-4 mr-2" />
      {formattedTime}
    </Button>
  );
}
