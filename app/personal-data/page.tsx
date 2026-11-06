import type { Metadata } from "next";
import LegalPlaceholder from "@/components/legal-placeholder";

export const metadata: Metadata = {
  title: "Обработка персональных данных — ÉLAN",
  robots: { index: false, follow: false },
};

export default function PersonalDataPage() {
  return <LegalPlaceholder title="Согласие на обработку персональных данных" category="ÉLAN · ПЕРСОНАЛЬНЫЕ ДАННЫЕ" />;
}
