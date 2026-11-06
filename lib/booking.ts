import { services, team } from "@/lib/content";

// Shared demonstration catalogue: the price list and the existing booking
// flow use the same records and identifiers. No separate pricing copy.
export const serviceCategories = [
  { id: "hair", title: "Волосы и окрашивание", note: "Цена окрашивания зависит от длины волос и расхода красителя. Итоговую стоимость согласуем до процедуры." },
  { id: "skin", title: "Уход за лицом", note: "Состав индивидуальной программы подбирается на консультации и влияет на итоговую стоимость." },
  { id: "nails", title: "Ногтевой сервис", note: "В комплексе с покрытием — выравнивание и однотонный цвет. Снятие покрытия и дизайн обсуждаются отдельно до начала работы." },
  { id: "makeup", title: "Макияж", note: "В комплекс входит подготовка кожи. Сложность образа согласуем перед началом работы." },
];

export const bookingServices = [
  { ...services[0], category: "hair", title: "Окрашивание и уход", description: "Консультация, окрашивание и укладка", specialists: [team[0]], minutes: 180 },
  { ...services[0], category: "hair", number: "05", title: "Стрижка и укладка", description: "Подбор формы, мытьё и укладка", price: "4 500 ₽", duration: "60 минут", specialists: [team[0]], minutes: 60 },
  { ...services[1], category: "skin", title: "Индивидуальный уход за лицом", description: "Диагностика кожи и программа ухода", specialists: [team[1]], minutes: 90 },
  { ...services[1], category: "skin", number: "06", title: "Экспресс-уход", description: "Очищение, маска и завершающий уход", price: "4 200 ₽", duration: "45 минут", specialists: [team[1]], minutes: 45 },
  { ...services[2], category: "nails", title: "Маникюр с покрытием", description: "Маникюр, выравнивание и однотонное покрытие", specialists: [], minutes: 90 },
  { ...services[2], category: "nails", number: "07", title: "Маникюр без покрытия", description: "Обработка кутикулы, форма и уход", price: "2 800 ₽", duration: "60 минут", specialists: [], minutes: 60 },
  { ...services[3], category: "makeup", title: "Макияж и подготовка кожи", description: "Дневной или вечерний образ", specialists: [team[2]], minutes: 75 },
  { ...services[3], category: "makeup", number: "08", title: "Дневной макияж", description: "Лёгкий тон и естественные акценты", price: "5 500 ₽", duration: "60 минут", specialists: [team[2]], minutes: 60 },
];

export function upcomingDates(now = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
  const start = new Date(`${today}T12:00:00+03:00`);
  return Array.from({ length: 8 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index + 1);
    return {
      value: date.toISOString().slice(0, 10),
      day: new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", weekday: "short" }).format(date).replace(".", ""),
      label: new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", day: "numeric", month: "long" }).format(date),
    };
  });
}

export function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return value ? "+7" : "";
  let formatted = `+7 (${digits.slice(0, 3)}`;
  if (digits.length > 3) formatted += ") ";
  formatted += digits.slice(3, 6);
  if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
  return formatted;
}
