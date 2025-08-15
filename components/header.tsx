import { BookMarkedIcon, SunMoon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { CountdownButton } from "@/components/ui/countdown-button";
import { LanguageSwitcher } from "@/components/ui/lang-toggle";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UnitsToggle } from "@/components/ui/units-toggle";

import { LocationDialog } from "./location-dialog";
import { REPOSITORY_URL } from "@/lib/constants";

export const Header = () => {
  const t = useTranslations();
  return (
    <header className="sticky top-0 border-b z-50 bg-background/90 backdrop-blur">
      <div className="container max-w-screen-lg flex items-center h-14">
        <div className="flex gap-2 items-center mr-auto select-none">
          <SunMoon />
          <span className="font-medium">{t("app.title")}</span>
        </div>
        <div className="flex gap-2 ml-auto">
          <CountdownButton className="px-1.5" />
          <LanguageSwitcher />
          <UnitsToggle />
          <ModeToggle />
          <LocationDialog />
          <Button className="font-semibold px-1.5" asChild>
            <Link href={REPOSITORY_URL} target="_blank">
              <BookMarkedIcon size={18} className="md:mr-2" />
              <span className="sr-only md:not-sr-only">
                {t("app.source_code")}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
