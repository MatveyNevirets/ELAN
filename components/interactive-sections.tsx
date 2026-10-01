"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { brand, images, services, team, testimonials } from "@/lib/content";
import ImageCover from "@/components/image-cover";

export function ServicesSection({ onBook }: { onBook: () => void }) {
  const [activeService, setActiveService] = useState(0);
  return (
    <section className="services" id="services">
      <div className="services-head">
        <div><div className="section-meta reveal">02 / 09 &nbsp; · &nbsp; ПЕРСОНАЛЬНЫЕ РИТУАЛЫ</div><h2 className="services-title reveal">Выбрать<br /><em>своё.</em></h2></div>
        <p className="services-intro reveal">Каждая встреча начинается с разговора. Остальное — мы создадим вместе.</p>
      </div>
      <div className="services-layout">
        <div>
          <div className="service-list" role="tablist" aria-label={`Услуги ${brand.name}`}>
            {services.map((service, index) => (
              <button key={service.number} className={`service-row${activeService === index ? " is-active" : ""}`} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)} role="tab" aria-selected={activeService === index} data-cursor="SELECT">
                <span className="service-row-num">{service.number}</span><span className="service-row-name">{service.name}</span>
                <span className="service-row-meta"><span>{service.price}</span><span>{service.duration}</span></span>
              </button>
            ))}
          </div>
          <p className="service-detail" key={`detail-${activeService}`}>{services[activeService].detail}</p>
          <button className="text-arrow" onClick={onBook}>ОБСУДИТЬ РИТУАЛ <ArrowUpRight size={13} /></button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div className="service-image-wrap" key={activeService} initial={{ clipPath: "inset(8% 0 0 0)", opacity: .4 }} animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }} exit={{ clipPath: "inset(0 0 9% 0)", opacity: .35 }} transition={{ duration: .55, ease: [.22, .68, 0, 1] }} data-cursor="DISCOVER">
            <span className="service-image-no">{services[activeService].number}</span>
            <ImageCover src={services[activeService].image} alt={`${services[activeService].name} ритуал ${brand.name}`} className="service-image" sizes="50vw" />
            <div className="service-image-label"><span>{brand.name} BEAUTY ATELIER</span><span>{services[activeService].name.toUpperCase()} RITUAL</span></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function TransformationSection() {
  return (
    <section className="transformation" aria-labelledby="transformation-heading">
      <div className="transform-head">
        <div><div className="section-meta reveal">04 / 09 &nbsp; · &nbsp; MAKE-UP RITUAL</div><h2 className="transform-title reveal" id="transformation-heading">Макияж,<br /><em>в котором ты.</em></h2></div>
        <p className="transform-note reveal">Мягкий макияж подчёркивает черты и оставляет тебя собой.</p>
      </div>
      <div className="compare reveal" aria-label="Результат макияжа: до и после">
        <div className="compare-panel">
          <ImageCover src={images.before} alt="До макияжа: естественная кожа без косметики" className="compare-image" sizes="(max-width: 620px) 45vw, 40vw" />
          <span className="compare-label">ДО · БЕЗ МАКИЯЖА</span>
        </div>
        <div className="compare-panel">
          <ImageCover src={images.after} alt="После макияжа: мягкий профессиональный макияж" className="compare-image" sizes="(max-width: 620px) 45vw, 40vw" />
          <span className="compare-label">ПОСЛЕ · МЯГКИЙ MAKE-UP</span>
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  const [activePerson, setActivePerson] = useState(0);
  return (
    <section className="team" id="team">
      <div className="team-head">
        <div><div className="section-meta reveal">05 / 09 &nbsp; · &nbsp; ТЕ, КОМУ МОЖНО ДОВЕРИТЬСЯ</div><h2 className="team-title reveal">Руки,<br /><em>которые знают.</em></h2></div>
      </div>
      <div className="team-grid">
        <AnimatePresence mode="wait">
          <motion.div className="team-portrait" key={activePerson} initial={{ opacity: .3, clipPath: "inset(5% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0% 0 0)" }} exit={{ opacity: .3 }} transition={{ duration: .55, ease: [.22, .68, 0, 1] }} data-cursor="MEET">
            <ImageCover src={team[activePerson].image} alt={`Портрет специалиста ${brand.name} — ${team[activePerson].name}`} className="team-portrait-img" sizes="(max-width: 620px) 90vw, 56vw" />
            <div className="team-portrait-caption"><span>{brand.name} PEOPLE</span><span>PORTRAIT / 0{activePerson + 1}</span></div>
          </motion.div>
        </AnimatePresence>
        <div className="team-info">
          <div>
            {team.map((person, index) => <button className={`team-person${activePerson === index ? " is-active" : ""}`} key={person.name} onMouseEnter={() => setActivePerson(index)} onFocus={() => setActivePerson(index)} onClick={() => setActivePerson(index)} data-cursor="MEET">
              <span className="team-person-num">0{index + 1}</span><span><span className="team-person-name">{person.name}</span><span className="team-person-role">{person.role}</span><span className="team-person-specialty">{person.specialty}</span></span>
            </button>)}
          </div>
          <p className="team-statement">«Хорошая работа начинается с вопроса: как вы хотите себя чувствовать?»</p>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const startX = useRef<number | null>(null);
  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const initialX = startX.current;
    startX.current = null;
    if (initialX !== null && Math.abs(event.clientX - initialX) > 48) {
      setActiveQuote((index) => (index + (event.clientX < initialX ? 1 : testimonials.length - 1)) % testimonials.length);
    }
  };
  return (
    <section className="testimonials" aria-label="Отзывы гостей" onPointerDown={(event) => { startX.current = event.clientX; }} onPointerUp={onPointerUp}>
      <div className="section-meta reveal" style={{ color: "#b9afa4" }}>06 / 09 &nbsp; · &nbsp; СЛОВА ГОСТЕЙ</div>
      <div className="testimonial-layout">
        <AnimatePresence mode="wait">
          <motion.div key={activeQuote} initial={{ opacity: 0, y: 18, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -14, filter: "blur(3px)" }} transition={{ duration: .45 }}>
            <blockquote className="testimonial-quote">{testimonials[activeQuote].quote}</blockquote>
            <div className="testimonial-author">{testimonials[activeQuote].author}</div>
            <div className="testimonial-service">{testimonials[activeQuote].service}</div>
          </motion.div>
        </AnimatePresence>
        <div className="testimonial-side">
          <AnimatePresence mode="wait">
            <motion.div className="testimonial-photo" key={testimonials[activeQuote].image} initial={{ opacity: .35, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: .2, y: -6 }} transition={{ duration: .35 }}>
              <ImageCover src={testimonials[activeQuote].image} alt={`Портрет гостьи: ${testimonials[activeQuote].author}`} className="testimonial-photo-image" sizes="(max-width: 620px) 64px, 150px" />
            </motion.div>
          </AnimatePresence>
          <div className="testimonial-index">0{activeQuote + 1} <span style={{ color: "#8e867e" }}>/ 0{testimonials.length}</span></div>
          <div className="testimonial-nav">
            <button aria-label="Предыдущий отзыв" onClick={() => setActiveQuote((activeQuote + testimonials.length - 1) % testimonials.length)}><ArrowLeft size={15} /></button>
            <button aria-label="Следующий отзыв" onClick={() => setActiveQuote((activeQuote + 1) % testimonials.length)}><ArrowRight size={15} /></button>
          </div>
          <span className="testimonial-help">ЛИСТАЙТЕ ИЛИ НАЖМИТЕ, ЧТОБЫ УЗНАТЬ ДАЛЬШЕ</span>
        </div>
      </div>
    </section>
  );
}
