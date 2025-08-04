import "weather-icons/css/weather-icons.min.css";
import "../globals.css";

import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import { Header } from "@/components/header";
import { AppProvider } from "@/contexts/AppContext";
import { routing } from "@/i18n/routing";
import { QueryProvider } from "@/providers/QueryProvider";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={GeistSans.variable} suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <AppProvider>
                <Header />
                <main className="py-4">{children}</main>
              </AppProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
