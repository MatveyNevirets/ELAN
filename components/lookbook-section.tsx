"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { images } from "@/lib/content";
import ImageCover from "@/components/image-cover";

const looks = [
  { image: images.look1, title: "Мягкая форма", direction: "Волосы", alt: "Редакционный образ: мягкая форма и укладка" },
  { image: images.look2, title: "Естественные акценты", direction: "Макияж", alt: "Редакционный образ с естественными акцентами" },
  { image: images.look3, title: "В своём свете", direction: "Макияж", alt: "Редакционный портрет в мягком свете" },
  { image: images.look4, title: "Цвет и движение", direction: "Волосы", alt: "Редакционный образ: цвет и движение" },
];

export default function LookbookSection() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;
  const close = () => setActive(null);
  const move = (direction: number) => setActive((current) => current === null ? current : (current + direction + looks.length) % looks.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isOpen) { dialog.close(); return; }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return (
    <>
      <section className="portfolio-section content-section" id="works" aria-labelledby="works-heading">
        <div className="section-heading"><div><p className="eyebrow">ВОЛОСЫ · МАКИЯЖ · ОБРАЗ</p><h2 id="works-heading">Работы <em>и образы.</em></h2></div><p className="section-intro">Нажмите на образ, чтобы рассмотреть детали.</p></div>
        <div className="portfolio-grid">{looks.map((look, index) => <button type="button" key={look.image} className="portfolio-item" aria-label={`Рассмотреть образ: ${look.title}`} aria-haspopup="dialog" onClick={() => setActive(index)}><div className="portfolio-photo"><ImageCover src={look.image} alt={look.alt} className="portfolio-image" sizes="(max-width: 620px) 43vw, 20vw" /></div><span className="portfolio-label"><span>{look.direction}</span><strong>{look.title}</strong></span></button>)}</div>
      </section>
      <dialog ref={dialogRef} className="portfolio-dialog" aria-label={active === null ? "Просмотр образов" : looks[active].title} onCancel={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
        {active !== null && <>
          <button className="portfolio-close" onClick={close} aria-label="Закрыть изображение"><X size={24} /></button>
          <button className="portfolio-prev" onClick={() => move(-1)} aria-label="Предыдущий образ"><ArrowLeft size={22} /></button>
          <figure className="portfolio-full"><div><ImageCover src={looks[active].image} alt={looks[active].alt} className="portfolio-full-image" sizes="(max-width:620px) 88vw, 76vw" /></div><figcaption>{looks[active].title}<span>{active + 1} / {looks.length}</span></figcaption></figure>
          <button className="portfolio-next" onClick={() => move(1)} aria-label="Следующий образ"><ArrowRight size={22} /></button>
        </>}
      </dialog>
    </>
  );
}
