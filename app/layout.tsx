import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: `${brand.name} — искусство быть собой`,
  description: `Авторские ритуалы красоты в самом сердце Москвы. ${brand.name} — beauty atelier с вниманием к деталям.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
