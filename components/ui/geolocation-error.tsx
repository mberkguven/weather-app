import { MapPinOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const GeolocationError = () => {
  const t = useTranslations();
  return (
    <Card className="mb-4 p-4">
      <CardHeader className="p-0 mb-2">
        <div className="flex justify-between text-lg font-semibold"></div>

        <div className="flex items-center gap-1">
          <MapPinOff />
          <span className="font-medium">{t("errors.geo_location.title")}</span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="font-light text-sm">
          {t("errors.geo_location.description")}
        </div>
      </CardContent>
    </Card>
  );
};
