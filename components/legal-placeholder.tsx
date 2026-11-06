import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/content";

export default function LegalPlaceholder({ title, category }: { title: string; category: string }) {
  return (
    <main className="legal-page">
      <header className="legal-header"><Link href="/" aria-label={`${brand.name} — на главную`} className="brand-mark">{brand.name}<span className="brand-sub">BEAUTY ATELIER</span></Link><span>МОСКВА · БОЛЬШАЯ НИКИТСКАЯ</span></header>
      <section className="legal-content">
        <p className="section-meta">{category}</p>
        <h1>{title}</h1>
        <div className="legal-notice">{brand.phone && <><p>По вопросам обработки персональных данных свяжитесь с администратором ателье.</p><a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone} <ArrowUpRight size={15} /></a></>}</div>
        <Link className="legal-back" href="/"><ArrowLeft size={14} /> ВЕРНУТЬСЯ В АТЕЛЬЕ</Link>
      </section>
      <footer className="legal-footer">© {brand.name} BEAUTY ATELIER · 2026</footer>
    </main>
  );
}
