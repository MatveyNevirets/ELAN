"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { brand, images } from "@/lib/content";
import ImageCover from "@/components/image-cover";
import BookingModal from "@/components/booking-modal";
import LookbookSection from "@/components/lookbook-section";
import { ServicesSection, TeamSection, TestimonialsSection, TransformationSection } from "@/components/interactive-sections";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "РИТУАЛЫ", href: "#services" },
  { label: "АТЕЛЬЕ", href: "#atelier" },
  { label: "КОМАНДА", href: "#team" },
  { label: "КОНТАКТ", href: "#contact" },
];

export default function ElanExperience() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const openBooking = useCallback(() => {
    setMenuOpen(false);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setInterval(() => {
      setProgress((value) => {
        const next = Math.min(100, value + (reduced ? 25 : 7));
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setLoading(false), reduced ? 20 : 360);
        }
        return next;
      });
    }, reduced ? 20 : 65);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    const cursorLabel = cursorLabelRef.current;
    if (!cursor || !ring || !cursorLabel || window.matchMedia("(pointer: coarse)").matches) return;
    const x = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    const y = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      x(event.clientX);
      y(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };
    const over = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      if (target) {
        cursorLabel.textContent = target.dataset.cursor ?? "EXPLORE";
        cursor.classList.add("is-active");
      } else {
        cursor.classList.remove("is-active");
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      gsap.set(".hero-image", { scale: 1 });
      gsap.set(".hero-title span", { yPercent: 0 });
      return;
    }

    let lenis: Lenis | undefined;
    let ticker: ((time: number) => void) | undefined;
    if (!window.matchMedia("(pointer: coarse)").matches) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      gsap.to(".scroll-progress i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: 0.3 },
      });
      ScrollTrigger.create({
        start: 60,
        onUpdate: (self) => headerRef.current?.classList.toggle("is-compact", self.scroll() > 60),
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(element, { y: 38, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".word-reveal").forEach((element) => {
        gsap.fromTo(element, { yPercent: 80, rotate: 3, autoAlpha: 0.4 }, {
          yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.12, ease: "none",
          scrollTrigger: { trigger: element.parentElement, start: "top 78%", end: "bottom 52%", scrub: 0.8 },
        });
      });
      gsap.to(".philosophy-photo", { yPercent: -11, ease: "none", scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".film-backdrop", { scale: 1.18, yPercent: 3, ease: "none", scrollTrigger: { trigger: ".film", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".film-title span", { yPercent: 22, autoAlpha: 0.4 }, { yPercent: 0, autoAlpha: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: ".film", start: "top 70%", end: "center center", scrub: 1 } });
      const rail = document.querySelector<HTMLElement>(".gallery-rail");
      if (rail && window.matchMedia("(min-width: 901px)").matches) {
        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth * 0.91);
        gsap.to(rail, {
          x: () => -distance(), ease: "none",
          scrollTrigger: { trigger: ".gallery-pin", start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
        });
      }
    });

    return () => {
      context.revert();
      if (lenis) {
        if (ticker) gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([".hero-image", ".hero-title span", ".hero-kicker", ".hero-note", ".hero-scroll", ".hero-index", ".hero-number"], { clearProps: "all" });
      return;
    }
    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro.fromTo(".hero-image", { clipPath: "inset(0 0 100% 0)", scale: 1.16 }, { clipPath: "inset(0 0 0% 0)", scale: 1.04, duration: 1.6 });
    intro.fromTo(".hero-title span", { yPercent: 115, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.13 }, "-=.88");
    intro.fromTo(".hero-kicker, .hero-note, .hero-scroll, .hero-index, .hero-number", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 }, "-=.63");
    gsap.to(".hero-image", { scale: 1, duration: 5.5, ease: "power1.out", delay: 1.15 });
    return () => { intro.kill(); };
  }, [loading]);

  useEffect(() => {
    const locked = bookingOpen || menuOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
    return () => { document.body.style.overflow = ""; };
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    if (!bookingOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [bookingOpen, closeBooking]);

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className={`preloader${loading ? "" : " is-done"}`} aria-hidden={!loading}>
        <div className="preloader-inner">
          <div className="preloader-top"><span>BEAUTY ATELIER</span><span>EST. MMXXI</span></div>
          <div className="preloader-brand">{brand.name}</div>
          <div className="preloader-track"><i style={{ width: `${progress}%` }} /></div>
          <div className="preloader-foot"><span>ПОДГОТАВЛИВАЕМ ПРОСТРАНСТВО</span><span>{String(progress).padStart(3, "0")}</span></div>
        </div>
      </div>

      <div className="site-cursor" ref={cursorRef} aria-hidden="true"><span ref={cursorLabelRef}>EXPLORE</span></div>
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true"><i /></div>

      <header className="site-header" ref={headerRef}>
        <a className="brand-mark" href="#top" aria-label={`${brand.name} — наверх`}>{brand.name}<span className="brand-sub">BEAUTY ATELIER</span></a>
        <nav className="header-center" aria-label="Основная навигация">
          {navLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <span className="header-location">{brand.city}</span>
          <button className="book-link" onClick={openBooking} data-cursor="BOOK"><span>ЗАПИСАТЬСЯ</span><ArrowUpRight size={13} /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen}>
            {menuOpen ? "ЗАКРЫТЬ" : "МЕНЮ"}
          </button>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        {navLinks.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}
        <button className="mobile-book" onClick={openBooking}>ЗАПИСАТЬСЯ НА ВИЗИТ <ArrowUpRight size={13} /></button>
      </nav>

      <section className="hero" id="top">
        <ImageCover src={images.hero} alt={`Портрет модели для кампании ${brand.name}`} className="hero-image" priority sizes="100vw" objectPosition="57% 40%" />
        <div className="hero-vignette" />
        <div className="hero-number">55°45′ N &nbsp; 37°36′ E</div>
        <div className="hero-copy">
          <div className="hero-kicker">A DIFFERENT KIND OF BEAUTY</div>
          <h1 className="hero-title"><span>БЫТЬ</span><span><em>собой.</em></span></h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-note">Пространство, где красота<br />не требует объяснений.</p>
          <a className="hero-scroll" href="#philosophy"><i /> ЛИСТАЙТЕ ВНИЗ <ArrowDown size={12} /></a>
          <span className="hero-index">01 — 09</span>
        </div>
      </section>

      <section className="philosophy" id="philosophy">
        <div className="section-meta reveal">01 / 09 &nbsp; · &nbsp; НАША ФИЛОСОФИЯ</div>
        <div className="philosophy-photo" data-cursor="FEEL"><ImageCover src={images.philosophy} alt="Естественная красота в мягком дневном свете" className="philosophy-photo-image" sizes="40vw" /></div>
        <div className="philosophy-caption">A STUDY IN SOFTNESS · № 001</div>
        <div className="philosophy-copy">
          <h2 className="philosophy-title"><span><span className="word-reveal">Красота</span> <span className="word-reveal">—</span></span><span className="offset"><span className="word-reveal">это</span> <span className="word-reveal">ты.</span></span></h2>
          <div className="philosophy-foot">
            <span className="philosophy-symbol">LESS, BUT CLOSER.</span>
            <p>Мы не меняем. Мы бережно проявляем то, что уже есть. В своём ритме, без правил и чужих ожиданий.</p>
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Наши направления">
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, index) => <span key={index}>HAIR <b>✳</b> SKIN <b>✳</b> NAILS <b>✳</b> MAKE-UP <b>✳</b> RITUAL <b>✳</b> CARE <b>✳</b></span>)}
        </div>
      </div>

      <ServicesSection onBook={openBooking} />

      <LookbookSection />

      <TransformationSection />

      <TeamSection />

      <TestimonialsSection />

      <section className="film" aria-label="Ритуал. Мастерство. Ты.">
        <div className="film-backdrop"><ImageCover src={images.film} alt={`Осенний образ из кампании ${brand.name}`} className="film-backdrop-image" sizes="100vw" /></div>
        <div className="film-content"><div className="film-kicker">A RITUAL OF YOUR OWN</div><h2 className="film-title"><span>РИТУАЛ.</span><span>ЧУВСТВО.</span><span>ТЫ.</span></h2><div className="film-kicker">СОЗДАНО ВМЕСТЕ С ВАМИ · МОСКВА</div></div>
        <div className="film-bottom"><span>07 / 09 · THE {brand.name} RITUAL</span><span>TAKE A MOMENT FOR YOURSELF</span></div>
      </section>

      <section className="final-cta" id="booking">
        <div className="final-image-frame"><ImageCover src={images.booking} alt={`Портрет для приглашения в ателье ${brand.name}`} className="final-image" sizes="(max-width: 620px) 64vw, 35vw" /></div>
        <div className="final-copy"><div className="section-meta reveal">08 / 09 &nbsp; · &nbsp; ВАШ СЛЕДУЮЩИЙ РИТУАЛ</div><h2 className="final-title"><span>Время</span><span>для себя.</span></h2><motion.button className="magnetic-button final-action" onClick={openBooking} whileHover={{ x: 5 }} whileTap={{ scale: .97 }} data-cursor="LET’S GO"><span>ЗАПИСАТЬСЯ НА ВИЗИТ</span><ArrowUpRight size={16} /></motion.button></div>
        <div className="final-small">ПОНЕДЕЛЬНИК — ВОСКРЕСЕНЬЕ<br />10:00 — 22:00<br />БОЛЬШАЯ НИКИТСКАЯ, 22</div>
      </section>

      <footer className="footer" id="contact">
        <div className="section-meta" style={{ color: "#b9afa4", marginBottom: 42 }}>09 / 09 &nbsp; · &nbsp; КОНТАКТ</div>
        <div className="footer-top">
          <div><div className="footer-brand">{brand.name}</div><div className="footer-tag">BEAUTY ATELIER · MOSCOW</div></div>
          <div className="footer-col"><h3>НАЙТИ НАС</h3><p>{brand.address}<br />Большая Никитская, 22</p><a href="https://maps.google.com/?q=Большая+Никитская+22+Москва" target="_blank" rel="noreferrer">ОТКРЫТЬ КАРТУ <ArrowUpRight size={11} /></a></div>
          <div className="footer-col"><h3>БУДЕМ НА СВЯЗИ</h3><a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a><a href="https://t.me/elanbeauty" target="_blank" rel="noreferrer">TELEGRAM ↗</a><a href="https://instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div>
          <div className="footer-col"><h3>ВРЕМЯ ДЛЯ СЕБЯ</h3><p>Каждый день<br />10:00 — 22:00</p><button className="text-arrow" style={{ marginLeft: 0, marginTop: 8 }} onClick={openBooking}>BOOK A VISIT <ArrowUpRight size={12} /></button></div>
        </div>
        <div className="footer-big"><span>Увидимся</span><em>скоро.</em></div>
        <div className="footer-bottom"><span>© {brand.name} BEAUTY ATELIER · 2026</span><span>СОЗДАНО С ВНИМАНИЕМ</span><a href="#top">НАВЕРХ ↑</a></div>
      </footer>

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </main>
  );
}
