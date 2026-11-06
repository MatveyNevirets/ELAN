import type { Metadata } from "next";
import LegalPlaceholder from "@/components/legal-placeholder";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — ÉLAN",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalPlaceholder title="Политика конфиденциальности" category="ÉLAN · КОНФИДЕНЦИАЛЬНОСТЬ" />;
}
