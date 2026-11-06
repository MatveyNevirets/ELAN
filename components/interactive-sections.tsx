"use client";

import { ArrowDown, ArrowUpRight, Clock3, Plus } from "lucide-react";
import { brand, images, team, testimonials } from "@/lib/content";
import { bookingServices, serviceCategories } from "@/lib/booking";
import ImageCover from "@/components/image-cover";

export type ServiceBookingHandler = (service: string, trigger?: HTMLButtonElement) => void;

export function ServicesSection({ onBook }: { onBook: ServiceBookingHandler }) {
  return (
    <section className="price-section content-section" id="services" aria-labelledby="services-heading">
      <div className="section-heading">
        <div><p className="eyebrow">ВЫБЕРИТЕ СВОЁ НАПРАВЛЕНИЕ</p><h2 id="services-heading">Услуги <em>и цены.</em></h2></div>
        <p className="section-intro">Всё для вашего образа — от нового оттенка волос до завершающего акцента в макияже.</p>
      </div>
      <nav className="price-categories" aria-label="Направления услуг">
        {serviceCategories.map((category) => <a key={category.id} href={`#price-${category.id}`}>{category.title}<ArrowDown size={13} aria-hidden="true" /></a>)}
      </nav>
      <div className="price-list">
        {serviceCategories.map((category) => (
          <section className="price-group" key={category.id} id={`price-${category.id}`} aria-labelledby={`category-${category.id}`}>
            <h3 id={`category-${category.id}`}>{category.title}</h3>
            <div>
              <ul className="price-rows">
                {bookingServices.filter((service) => service.category === category.id).map((service) => (
                  <li className="price-row" key={service.number}>
                    <div className="price-service"><h4>{service.title}</h4><p>{service.description}</p><span className="service-duration"><Clock3 size={13} aria-hidden="true" />{service.duration}</span></div>
                    <strong className="price-value">{service.price}</strong>
                    <button className="inline-booking" onClick={(event) => onBook(service.number, event.currentTarget)} aria-label={`Записаться: ${service.title}`} aria-haspopup="dialog">Записаться <ArrowUpRight size={16} aria-hidden="true" /></button>
                  </li>
                ))}
              </ul>
              <p className="price-condition">{category.note}</p>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function TeamSection({ onBook }: { onBook: ServiceBookingHandler }) {
  return (
    <section className="masters-section content-section" id="team" aria-labelledby="team-heading">
      <div className="section-heading">
        <div><p className="eyebrow">ЗНАКОМСТВО ПЕРЕД ВИЗИТОМ</p><h2 id="team-heading">Ваши <em>мастера.</em></h2></div>
        <p className="section-intro">Выберите специалиста своего направления. Или доверьте выбор администратору при записи.</p>
      </div>
      <div className="masters-grid">
        {team.map((person) => {
          const service = bookingServices.find((item) => item.specialists.some((specialist) => specialist.name === person.name));
          return (
            <article className="master-profile" key={person.name}>
              <div className="master-photo"><ImageCover src={person.image} alt={`${person.name} — ${person.role}`} className="master-image" sizes="(max-width: 620px) 88vw, 28vw" /></div>
              <div className="master-details"><p className="master-role">{person.role}</p><h3>{person.name}</h3><p>{person.specialty}</p>
                {service && <button className="inline-booking" onClick={(event) => onBook(service.number, event.currentTarget)} aria-label={`Выбрать мастера: ${person.name}`} aria-haspopup="dialog">Выбрать мастера <ArrowUpRight size={16} aria-hidden="true" /></button>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="about-section content-section" id="atelier" aria-labelledby="atelier-heading">
      <div className="about-photo"><ImageCover src="/images/atelier-interior.webp" alt="Интерьер ателье: светлые стены, большие зеркала и тёплое дерево" className="about-image" sizes="(max-width: 800px) 88vw, 45vw" /></div>
      <div className="about-copy"><p className="eyebrow">О САЛОНЕ</p><h2 id="atelier-heading">В своём<br /><em>ритме.</em></h2><p className="about-intro">ÉLAN — ателье красоты на Большой Никитской. Место для продуманного ухода и образа, в котором вам комфортно.</p>
        <dl className="atelier-facts"><div><dt>Четыре направления</dt><dd>Волосы, уход за лицом, ногти и макияж.</dd></div><div><dt>Стоимость до начала процедуры</dt><dd>Обсудим пожелания и согласуем программу ухода.</dd></div><div><dt>Время — по подтверждению</dt><dd>Администратор уточнит детали после вашей заявки.</dd></div></dl>
        <a className="inline-booking" href="#contact">Адрес и часы работы <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="reviews-section content-section" aria-labelledby="reviews-heading">
      <div className="section-heading"><div><p className="eyebrow">ОПЫТ ПОСЛЕ ВИЗИТА</p><h2 id="reviews-heading">Слова <em>гостей.</em></h2></div></div>
      <div className="reviews-grid">{testimonials.map((review) => <figure className="review" key={review.author}><blockquote>«{review.quote}»</blockquote><figcaption><span>{review.author.split(" · ")[0]}</span></figcaption></figure>)}</div>
    </section>
  );
}

const questions = [
  { question: "Как записаться на визит?", answer: "Выберите услугу, мастера, дату и желаемое время. Затем оставьте имя и телефон. Администратор свяжется с вами, уточнит детали и подтвердит запись." },
  { question: "Нужна ли оплата на сайте?", answer: "Нет, при онлайн-записи оплата и данные банковской карты не нужны. Заявка помогает согласовать услугу и время визита." },
  { question: "Почему некоторые цены указаны «от»?", answer: "Итоговая стоимость зависит от выбранной программы, длины волос или сложности образа. Условия указаны рядом с услугами. Стоимость согласуем до начала процедуры." },
  { question: "Можно ли не выбирать конкретного мастера?", answer: "Да. На шаге выбора мастера есть вариант «Доверьте выбор нам». Администратор подберёт специалиста выбранного направления." },
  { question: "Как перенести визит?", answer: "Сообщите администратору об изменении планов и назовите удобный день. Новое время визита нужно согласовать и подтвердить отдельно." },
  { question: "Нужно ли готовиться к процедуре?", answer: "Подготовка зависит от выбранной услуги. При подтверждении визита администратор уточнит пожелания и расскажет, нужна ли специальная подготовка." },
];

export function FaqSection() {
  return (
    <section className="faq-section content-section" id="questions" aria-labelledby="faq-heading">
      <div><p className="eyebrow">ПЕРЕД ВИЗИТОМ</p><h2 id="faq-heading">Полезно<br /><em>знать.</em></h2></div>
      <div className="faq-list">{questions.map((item) => <details key={item.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </section>
  );
}

export function ContactsSection({ onBook }: { onBook: () => void }) {
  return (
    <section className="contacts-section content-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-heading"><p className="eyebrow">БУДЕМ РАДЫ ЗНАКОМСТВУ</p><h2 id="contact-heading">До встречи<br /><em>в ÉLAN.</em></h2><button className="contact-booking" onClick={onBook} aria-haspopup="dialog">Записаться <ArrowUpRight size={21} aria-hidden="true" /></button><p className="contact-booking-note">Время визита подтвердит администратор.</p></div>
      <div className="contact-information">
        <div className="contact-detail"><h3>АДРЕС</h3><p>{brand.address}</p><a className="inline-booking" href={brand.mapsUrl} target="_blank" rel="noreferrer">Открыть в картах <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="contact-detail"><h3>ЧАСЫ РАБОТЫ</h3><p>{brand.hours}</p></div>
        {brand.phone && <div className="contact-detail"><h3>ТЕЛЕФОН</h3><a className="contact-phone" href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a></div>}
        <div className="contact-detail"><h3>TELEGRAM</h3>{brand.messengerUrl ? <a href={brand.messengerUrl} target="_blank" rel="noreferrer">{brand.messengerHandle} ↗</a> : <p>{brand.messengerHandle}</p>}</div>
      </div>
    </section>
  );
}
