import { DropletsIcon, EyeIcon, ThermometerIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAppContext } from "@/contexts/AppContext";
import { formatDistance, formatTemperature, getDescription } from "@/lib/utils";
import { List } from "@/types";

import { Widget } from "./ui/widget";

export const Dashboard = ({ data }: { data: List }) => {
  const t = useTranslations();
  const { temp, feels_like, humidity } = data.main;
  const { units } = useAppContext();

  const widgets = [
    {
      title: t("app.feels_like"),
      message: getDescription.feelsLike(feels_like, temp, t),
      value: formatTemperature(feels_like, units),
      icon: <ThermometerIcon size={16} />,
    },
    {
      title: t("app.humidity"),
      message: getDescription.humidity(humidity, t),
      value: `${humidity}%`,
      icon: <DropletsIcon size={16} />,
    },
    {
      title: t("app.visibility"),
      message: getDescription.visibility(data.visibility, t),
      value: formatDistance(data.visibility),
      icon: <EyeIcon size={16} />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      {widgets.map((widget) => (
        <Widget key={widget.title} {...widget} />
      ))}
    </div>
  );
};
