import type { Metadata } from "next";
import "./globals.css";
import "./commercial.css";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: `${brand.name} — ателье красоты в Москве · Услуги и цены`,
  description: `Окрашивание, уход за лицом, маникюр и макияж в ${brand.name}. Услуги, цены, мастера и онлайн-запись. ${brand.address}.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
