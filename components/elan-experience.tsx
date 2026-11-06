"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, X } from "lucide-react";
import { MotionConfig } from "motion/react";
import { usePageMotion } from "@/lib/use-page-motion";
import { brand, images } from "@/lib/content";
import ImageCover from "@/components/image-cover";
import BookingModal from "@/components/booking-modal";
import LookbookSection from "@/components/lookbook-section";
import { AboutSection, ContactsSection, FaqSection, ServicesSection, TeamSection, TestimonialsSection } from "@/components/interactive-sections";

const navLinks = [
  { label: "Услуги и цены", href: "#services" },
  { label: "Мастера", href: "#team" },
  { label: "О салоне", href: "#atelier" },
  { label: "Контакты", href: "#contact" },
];

export default function ElanExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>();
  const [heroButtonPassed, setHeroButtonPassed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const heroBookingRef = useRef<HTMLButtonElement>(null);
  const bookingTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const showStickyBooking = heroButtonPassed && !menuOpen && !bookingOpen;
  usePageMotion(pageRef);

  const openBooking = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
    bookingTriggerRef.current = event?.currentTarget ?? (document.activeElement instanceof HTMLButtonElement ? document.activeElement : null);
    setBookingService(undefined);
    setMenuOpen(false);
    setBookingOpen(true);
  }, []);

  const openServiceBooking = useCallback((service: string, trigger?: HTMLButtonElement) => {
    bookingTriggerRef.current = trigger ?? null;
    setBookingService(service);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    window.requestAnimationFrame(() => {
      const trigger = bookingTriggerRef.current;
      if (trigger && getComputedStyle(trigger).visibility === "visible" && trigger.getClientRects().length) {
        trigger.focus({ preventScroll: true });
      } else {
        menuToggleRef.current?.focus({ preventScroll: true });
      }
      bookingTriggerRef.current = null;
    });
  }, []);

  useEffect(() => {
    const button = heroBookingRef.current;
    if (!button) return;
    const observer = new IntersectionObserver(([entry]) => {
      setHeroButtonPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 30);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (bookingOpen || menuOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    if (!bookingOpen) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") closeBooking(); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [bookingOpen, closeBooking]);

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus({ preventScroll: true });
      }
      if (event.key !== "Tab") return;
      const elements = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href],button") ?? []);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
    <main ref={pageRef} className="elan-page commercial-page">
      <div className="site-content" inert={bookingOpen}>
        <header className={`site-header${scrolled ? " is-compact" : ""}`}>
          <a className="brand-mark" href="#top" aria-label={`${brand.name} — на главную`}>{brand.name}<span className="brand-sub">BEAUTY ATELIER</span></a>
          <nav className="header-center" aria-label="Основная навигация">{navLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <div className="header-actions">
            <button className={`header-booking${showStickyBooking ? " is-visible" : ""}`} onClick={openBooking} aria-haspopup="dialog" aria-hidden={!showStickyBooking} inert={!showStickyBooking}>Записаться <ArrowUpRight size={16} aria-hidden="true" /></button>
            {brand.phone && <a className="header-phone" href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>}
            <button ref={menuToggleRef} className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Открыть меню" aria-controls="site-menu" aria-expanded={menuOpen}>Меню</button>
          </div>
        </header>

        <div ref={menuRef} id="site-menu" className={`mobile-menu${menuOpen ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Навигация по сайту" aria-hidden={!menuOpen} inert={!menuOpen}>
          <button className="mobile-menu-close" onClick={() => { setMenuOpen(false); menuToggleRef.current?.focus(); }} aria-label="Закрыть меню"><X size={23} /></button>
          <nav aria-label="Разделы сайта">{navLinks.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav>
          <button className="mobile-book" onClick={openBooking} aria-haspopup="dialog">Записаться <ArrowUpRight size={18} aria-hidden="true" /></button>
          {brand.phone && <a className="mobile-menu-phone" href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>}
        </div>

        <div className="page-body" inert={menuOpen}>
          <section className="hero" id="top" aria-labelledby="hero-heading">
            <div className="hero-visual"><ImageCover src={images.hero} alt={`Редакционный портрет для ${brand.name}`} className="hero-image" priority sizes="(max-width: 620px) 100vw, 76vw" /></div>
            <div className="hero-vignette" aria-hidden="true" />
            <div className="hero-copy">
              <p className="hero-kicker">АТЕЛЬЕ КРАСОТЫ · МОСКВА</p>
              <h1 className="hero-title" id="hero-heading"><span><i className="hero-title-word">БЫТЬ</i></span><span><em className="hero-title-word">собой.</em></span></h1>
              <p className="hero-description">Окрашивание, уход за лицом, маникюр и макияж на Большой Никитской.</p>
              <div className="hero-offer">
                <button ref={heroBookingRef} className="hero-booking-button" onClick={openBooking} aria-haspopup="dialog" aria-describedby="hero-booking-note">Записаться <ArrowUpRight size={23} aria-hidden="true" /></button>
                <p className="hero-booking-note" id="hero-booking-note">Сначала выберите услугу. Без оплаты на сайте</p>
              </div>
              <a className="hero-scroll" href="#services">Посмотреть услуги и цены <ArrowDown size={14} aria-hidden="true" /></a>
            </div>
          </section>

          <ServicesSection onBook={openServiceBooking} />
          <TeamSection onBook={openServiceBooking} />
          <LookbookSection />
          <AboutSection />
          <TestimonialsSection />
          <FaqSection />
          <ContactsSection onBook={openBooking} />

          <footer className="site-footer">
            <a className="footer-wordmark" href="#top" aria-label={`${brand.name} — наверх`}>{brand.name}</a>
            <div className="footer-documents"><a href="/privacy">Политика конфиденциальности</a><a href="/personal-data">Обработка персональных данных</a></div>
            <div className="site-footer-bottom"><span>© {brand.name} · 2026</span><span>Москва · Большая Никитская</span><a href="#top">Наверх ↑</a></div>
          </footer>
        </div>

        <aside className={`booking-dock${showStickyBooking ? " is-visible" : ""}`} aria-label="Запись в ателье" aria-hidden={!showStickyBooking} inert={!showStickyBooking}>
          <button className="sticky-booking-button" onClick={openBooking} aria-haspopup="dialog">Записаться <ArrowUpRight size={21} aria-hidden="true" /></button>
        </aside>
      </div>
      <BookingModal key={bookingService ?? "all-services"} open={bookingOpen} onClose={closeBooking} initialService={bookingService} />
    </main>
    </MotionConfig>
  );
}
