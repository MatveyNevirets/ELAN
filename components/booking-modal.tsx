"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { brand, images } from "@/lib/content";
import { bookingServices, formatPhone, upcomingDates } from "@/lib/booking";
import ImageCover from "@/components/image-cover";

type BookingChoice = { service: string; specialist: string; date: string; time: string };

const times = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
const stepLabels = ["ВЫБЕРИТЕ УСЛУГУ", "ВЫБЕРИТЕ МАСТЕРА", "ВЫБЕРИТЕ ДАТУ", "ВЫБЕРИТЕ ВРЕМЯ", "ВАШИ КОНТАКТЫ"];
const stepHeadings = ["С чего начнём?", "Ваш мастер", "Когда вам удобно?", "Время для себя", "Осталось знакомство"];

export default function BookingModal({ open, onClose, initialService }: { open: boolean; onClose: () => void; initialService?: string }) {
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [complete, setComplete] = useState(false);
  const [choice, setChoice] = useState<BookingChoice>({ service: initialService ?? "", specialist: "", date: "", time: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  // Recalculate on reopening so a long-lived tab never offers stale dates.
  const dates = useMemo(() => open ? upcomingDates() : [], [open]);
  const service = bookingServices.find((item) => item.number === choice.service);
  const dateLabel = dates.find((date) => date.value === choice.date)?.label ?? "";
  const validContact = name.trim().length >= 2 && /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone) && consent;

  useEffect(() => {
    if (open) return;
    const reset = window.setTimeout(() => {
      setStep(initialService ? 1 : 0);
      setComplete(false);
      setChoice({ service: initialService ?? "", specialist: "", date: "", time: "" });
      setName("");
      setPhone("");
      setComment("");
      setConsent(false);
    }, 400);
    return () => window.clearTimeout(reset);
  }, [open, initialService]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panelRef.current?.querySelector<HTMLButtonElement>(".booking-close")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], input, textarea, [tabindex="0"]',
      ) ?? []).filter((element) => element.getClientRects().length > 0);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
      previousFocus?.focus();
    };
  }, [open]);

  const select = (key: keyof BookingChoice, value: string) => setChoice((current) => ({
    ...current,
    [key]: value,
    ...(key === "service" ? { specialist: "", time: "" } : {}),
    ...(key === "date" ? { time: "" } : {}),
  }));
  const selected = [choice.service, choice.specialist, choice.date, choice.time][step];
  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    panelRef.current?.scrollTo({ top: 0 });
  };
  const focusHeading = () => panelRef.current?.querySelector<HTMLElement>("#booking-heading")?.focus({ preventScroll: true });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validContact || !choice.service || !choice.specialist || !choice.date || !choice.time) return;
    setComplete(true);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`booking-overlay${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={panelRef} className="booking-panel" role="dialog" aria-modal="true" aria-labelledby="booking-heading" data-lenis-prevent>
        <div className="booking-visual">
          <ImageCover src={images.booking} alt="" className="booking-visual-image" sizes="(max-width: 620px) 100vw, 36vw" />
          <div className="booking-visual-logo">{brand.name}</div><div className="booking-visual-caption">YOUR TIME, YOUR RITUAL<br />MOSCOW · EST. 2021</div>
        </div>
        <div className="booking-content">
          <button className="booking-close" onClick={onClose} aria-label="Закрыть запись"><X size={19} /></button>
          <div className="booking-progress-top"><span>ЗАПИСЬ НА ВИЗИТ</span><span>{complete ? "ГОТОВО" : `0${step + 1} / 05`}</span></div>
          <div className="booking-progress"><i style={{ width: complete ? "100%" : `${(step / 4) * 100}%` }} /></div>
          <AnimatePresence mode="wait">
            {complete ? (
              <motion.div className="booking-confirm" role="status" key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} onAnimationComplete={focusHeading}>
                <div className="booking-confirm-mark"><Check size={25} /></div>
                <p>{brand.name} · ДО ВСТРЕЧИ В АТЕЛЬЕ</p>
                <h3 id="booking-heading" tabIndex={-1}>Спасибо,<br />{name.trim()}.</h3>
                <small>{service?.title} · {choice.specialist}<br />{dateLabel} · {choice.time}</small>
                <p className="booking-confirm-note">Администратор свяжется с вами по номеру <strong>{phone}</strong>, чтобы уточнить детали и подтвердить время визита.</p>
                {brand.phone && <a className="booking-contact-link" href={`tel:${brand.phone.replaceAll(" ", "")}`}>Есть вопросы? {brand.phone}</a>}
                <div className="booking-footer" style={{ justifyContent: "center" }}><button className="booking-next" onClick={onClose}>ВЕРНУТЬСЯ НА САЙТ <ArrowRight size={14} /></button></div>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: .28 }} onAnimationComplete={focusHeading}>
                <div className="booking-step-label">ШАГ 0{step + 1} · {stepLabels[step]}</div>
                <h2 className="booking-heading" id="booking-heading" tabIndex={-1}>{stepHeadings[step]}</h2>
                <div className="booking-options">
                  {step === 0 && bookingServices.map((item) => <button key={item.number} aria-pressed={choice.service === item.number} className={`booking-option${choice.service === item.number ? " is-selected" : ""}`} onClick={() => select("service", item.number)}><span className="booking-option-category">{item.name}</span><strong>{item.title}</strong><span>{item.price} · {item.duration}</span></button>)}
                  {step === 1 && <>
                    <button className={`booking-option${choice.specialist === "Любой свободный мастер" ? " is-selected" : ""}`} aria-pressed={choice.specialist === "Любой свободный мастер"} onClick={() => select("specialist", "Любой свободный мастер")}><strong>Доверьте выбор нам</strong><span>Подберём мастера под вашу услугу</span></button>
                    {service?.specialists.map((item) => <button key={item.name} aria-pressed={choice.specialist === item.name} className={`booking-option${choice.specialist === item.name ? " is-selected" : ""}`} onClick={() => select("specialist", item.name)}><strong>{item.name}</strong><span>{item.role}</span></button>)}
                  </>}
                  {step === 2 && dates.map((date, index) => <button key={date.value} aria-pressed={choice.date === date.value} className={`booking-option${choice.date === date.value ? " is-selected" : ""}`} onClick={() => select("date", date.value)}><strong>{date.label}</strong><span>{index === 0 ? "Завтра" : date.day.toUpperCase()}</span></button>)}
                  {step === 3 && times.filter((time) => {
                    const [hours, minutes] = time.split(":").map(Number);
                    return hours * 60 + minutes + (service?.minutes ?? 90) <= 22 * 60;
                  }).map((time) => <button key={time} aria-pressed={choice.time === time} className={`booking-option${choice.time === time ? " is-selected" : ""}`} onClick={() => select("time", time)}><strong>{time}</strong><span>МСК · {service?.duration}</span></button>)}
                  {step === 4 && <div className="booking-summary"><div><span>УСЛУГА</span><strong>{service?.title}</strong></div><div><span>МАСТЕР</span><strong>{choice.specialist}</strong></div><div><span>ВИЗИТ</span><strong>{dateLabel} · {choice.time}</strong></div><div><span>СТОИМОСТЬ</span><strong>{service?.price}</strong></div></div>}
                </div>
                {step === 0 && <p className="booking-help">Стоимость зависит от выбранной программы. Точную цену согласуем до начала процедуры.</p>}
                {step === 1 && <p className="booking-help">{service?.description}. Показываем мастеров выбранного направления.</p>}
                {step === 3 && <p className="booking-help">Выберите желаемое время по Москве. Администратор уточнит доступность и подтвердит запись.</p>}
                {step === 4 && <form id="booking-contact" className="booking-contact-form" onSubmit={submit}>
                  <p className="booking-help">Оставьте контакты — мы уточним пожелания и подтвердим удобное время. Предоплата не нужна.</p>
                  <div className="booking-fields">
                    <label className="booking-field" htmlFor="booking-name"><span>ВАШЕ ИМЯ <span aria-hidden="true">*</span></span><input id="booking-name" name="name" autoComplete="given-name" placeholder="Как к вам обращаться?" required minLength={2} maxLength={60} value={name} onChange={(event) => setName(event.target.value)} /></label>
                    <label className="booking-field" htmlFor="booking-phone"><span>ТЕЛЕФОН <span aria-hidden="true">*</span></span><input id="booking-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required pattern="\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" title="Введите номер: +7 (999) 123-45-67" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} /></label>
                  </div>
                  <label className="booking-field booking-comment" htmlFor="booking-comment"><span>ПОЖЕЛАНИЯ <span className="booking-optional">· НЕОБЯЗАТЕЛЬНО</span></span><textarea id="booking-comment" name="comment" placeholder="Например, хочу обсудить оттенок перед окрашиванием" rows={2} maxLength={500} value={comment} onChange={(event) => setComment(event.target.value)} /></label>
                  <div className="booking-consent"><input id="booking-consent" name="consent" type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} /><label htmlFor="booking-consent">Я согласен на обработку <a href="/personal-data" target="_blank" rel="noopener noreferrer">персональных данных</a></label></div>
                </form>}
                <div className="booking-footer">
                  {step > 0 ? <button className="booking-back" onClick={() => goToStep(step - 1)}><ArrowLeft size={13} /> &nbsp; НАЗАД</button> : <span />}
                  <button className="booking-next" type={step === 4 ? "submit" : "button"} form={step === 4 ? "booking-contact" : undefined} disabled={step < 4 ? !selected : !validContact} onClick={step < 4 ? () => goToStep(step + 1) : undefined}>{step === 4 ? "ОСТАВИТЬ ЗАЯВКУ" : step === 3 ? "ДАЛЕЕ К КОНТАКТАМ" : "ДАЛЕЕ"}<ArrowRight size={14} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
