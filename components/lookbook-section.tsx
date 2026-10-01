"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { brand, images } from "@/lib/content";
import ImageCover from "@/components/image-cover";

const looks = [
  { image: images.look1, title: "SOFT SHAPE", alt: "Мягкая форма в осеннем редакционном образе" },
  { image: images.look2, title: "SKIN STUDY", alt: "Естественная кожа в редакционной съёмке" },
  { image: images.look3, title: "IN HER LIGHT", alt: "Портрет в мягком вечернем свете" },
  { image: images.look4, title: "A QUIET LOOK", alt: "Лаконичный редакционный образ" },
];

export default function LookbookSection() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const move = (direction: number) => setActive((current) => current === null ? current : (current + direction + looks.length) % looks.length);

  useEffect(() => {
    if (active === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? current : (current + 1) % looks.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? current : (current + looks.length - 1) % looks.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  return (
    <>
      <section className="lookbook" id="atelier">
        <div className="lookbook-head">
          <div><div className="section-meta reveal">03 / 09 &nbsp; · &nbsp; ÉСТЕТИКА МОМЕНТА</div><h2 className="lookbook-title reveal">Живые<br /><em>истории.</em></h2></div>
          <p className="lookbook-copy reveal">Никаких масок. Только свет, движение и вы — настоящая.</p>
        </div>
        <div className="gallery-pin"><div className="gallery-rail">
          {looks.map((look, index) => (
            <button type="button" key={look.image} className="gallery-item" data-cursor="VIEW LOOK" aria-label={`Открыть образ ${look.title}`} onClick={() => setActive(index)}>
              <ImageCover src={look.image} alt={`${look.alt} ${brand.name}`} className="gallery-img" sizes="(max-width: 620px) 72vw, 34vw" />
              <span className="gallery-label"><span>{brand.name} / {String(index + 1).padStart(2, "0")}</span><span>{look.title}</span></span>
            </button>
          ))}
        </div></div>
        <div className="gallery-count"><span>LOOKBOOK · ОСЕНЬ / ЗИМА 26</span><span>01 — 04 &nbsp; ↔ &nbsp; ЛИСТАЙТЕ</span></div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div className="lookbook-lightbox" role="dialog" aria-modal="true" aria-label={`Образ ${looks[active].title}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
            <button type="button" className="lightbox-close" onClick={close} aria-label="Закрыть"><X size={20} /></button>
            <button type="button" className="lightbox-nav lightbox-prev" onClick={() => move(-1)} aria-label="Предыдущий образ"><ArrowLeft size={17} /></button>
            <div className="lightbox-frame">
              <AnimatePresence mode="wait">
                <motion.div className="lightbox-image-wrap" key={active} initial={{ opacity: .2, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: .2, scale: 1.01 }} transition={{ duration: .32 }}>
                  <ImageCover src={looks[active].image} alt={looks[active].alt} className="lightbox-image" sizes="(max-width: 620px) 88vw, 76vw" priority />
                </motion.div>
              </AnimatePresence>
              <div className="lightbox-caption"><span>{brand.name} / {String(active + 1).padStart(2, "0")}</span><span>{looks[active].title}</span><span>0{active + 1} / 0{looks.length}</span></div>
            </div>
            <button type="button" className="lightbox-nav lightbox-next" onClick={() => move(1)} aria-label="Следующий образ"><ArrowRight size={17} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
