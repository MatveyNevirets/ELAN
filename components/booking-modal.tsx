"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { brand, images, services, team } from "@/lib/content";
import ImageCover from "@/components/image-cover";

type BookingChoice = { service: string; specialist: string; date: string; time: string };

const dates = ["СБ · 03 ОКТ", "ВС · 04 ОКТ", "ПН · 05 ОКТ", "ВТ · 06 ОКТ"];
const times = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];
const stepLabels = ["ВЫБЕРИТЕ РИТУАЛ", "ВЫБЕРИТЕ МАСТЕРА", "ВЫБЕРИТЕ ДАТУ", "ВЫБЕРИТЕ ВРЕМЯ", "ПРОВЕРЬТЕ ДЕТАЛИ"];
const stepHeadings = ["С чего начнём?", "К кому пойдём?", "Когда вам удобно?", "Выберите время", "Всё верно?"];

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [choice, setChoice] = useState<BookingChoice>({ service: "", specialist: "", date: "", time: "" });

  useEffect(() => {
    if (open) return;
    const reset = window.setTimeout(() => {
      setStep(0);
      setComplete(false);
      setChoice({ service: "", specialist: "", date: "", time: "" });
    }, 400);
    return () => window.clearTimeout(reset);
  }, [open]);

  const select = (key: keyof BookingChoice, value: string) => setChoice((current) => ({ ...current, [key]: value }));
  const selected = [choice.service, choice.specialist, choice.date, choice.time][step];
  const next = () => step < 4 ? setStep((current) => current + 1) : setComplete(true);

  return (
    <div className={`booking-overlay${open ? " is-open" : ""}`} aria-hidden={!open} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="booking-panel" role="dialog" aria-modal="true" aria-labelledby="booking-heading">
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
              <motion.div className="booking-confirm" key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
                <div className="booking-confirm-mark"><Check size={25} /></div><p>{brand.name} · MOSCOW</p><h3 id="booking-heading">Ваше время<br />уже ждёт.</h3><small>{choice.service} · {choice.specialist}<br />{choice.date} · {choice.time}</small><div className="booking-footer" style={{ justifyContent: "center" }}><button className="booking-next" onClick={onClose}>ДО СКОРОЙ ВСТРЕЧИ <ArrowRight size={14} /></button></div>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: .28 }}>
                <div className="booking-step-label">ШАГ 0{step + 1} · {stepLabels[step]}</div>
                <h2 className="booking-heading" id="booking-heading">{stepHeadings[step]}</h2>
                <div className="booking-options">
                  {step === 0 && services.map((item) => <button key={item.number} className={`booking-option${choice.service === item.name ? " is-selected" : ""}`} onClick={() => select("service", item.name)}><strong>{item.name}</strong><span>{item.price} · {item.duration}</span></button>)}
                  {step === 1 && team.map((item) => <button key={item.name} className={`booking-option${choice.specialist === item.name ? " is-selected" : ""}`} onClick={() => select("specialist", item.name)}><strong>{item.name}</strong><span>{item.role}</span></button>)}
                  {step === 2 && dates.map((date) => <button key={date} className={`booking-option${choice.date === date ? " is-selected" : ""}`} onClick={() => select("date", date)}><strong>{date.split(" · ")[0]}</strong><span>{date.split(" · ")[1]}</span></button>)}
                  {step === 3 && times.map((time) => <button key={time} className={`booking-option${choice.time === time ? " is-selected" : ""}`} onClick={() => select("time", time)}><strong>{time}</strong><span>СВОБОДНО</span></button>)}
                  {step === 4 && <div className="booking-summary"><div><span>РИТУАЛ</span><strong>{choice.service}</strong></div><div><span>МАСТЕР</span><strong>{choice.specialist}</strong></div><div><span>ДАТА И ВРЕМЯ</span><strong>{choice.date} · {choice.time}</strong></div><p>Подтверждение — уже на месте. Осталось оставить этот момент за собой.</p></div>}
                </div>
                <div className="booking-footer">
                  {step > 0 ? <button className="booking-back" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={13} /> &nbsp; НАЗАД</button> : <span />}
                  <button className="booking-next" disabled={step < 4 && !selected} onClick={next}>{step === 4 ? "ЗАРЕЗЕРВИРОВАТЬ" : step === 3 ? "ПРОВЕРИТЬ ЗАПИСЬ" : "ДАЛЕЕ"}<ArrowRight size={14} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
