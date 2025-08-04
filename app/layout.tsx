import "./globals.css";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function generateMetadata() {
  return {
    title: "Weather App",
    description: "A modern weather application.",
  };
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
