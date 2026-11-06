import hairImage from "@/public/images/services/hair.webp";
import skinImage from "@/public/images/services/skin.webp";
import nailsImage from "@/public/images/services/nails.webp";
import makeupImage from "@/public/images/services/makeup.webp";

export const brand = {
  name: "ÉLAN",
  city: "Москва · Большая Никитская",
  // Demonstration contacts, explicitly labelled in the interface.
  phone: "+7 999 999 99 99",
  messengerHandle: "@this_is_tg",
  messengerUrl: "",
  address: "Москва, Большая Никитская, 22",
  hours: "Ежедневно, 10:00–22:00",
  mapsUrl: "https://maps.google.com/?q=Большая+Никитская+22+Москва",
};

export const images = {
  hero: "/images/editorial/hero.jpg",
  philosophy: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=86",
  hair: hairImage,
  skin: skinImage,
  nails: nailsImage,
  makeup: makeupImage,
  look1: "/images/editorial/look1.jpg",
  look2: "/images/editorial/look2.jpg",
  look3: "/images/editorial/look3.jpg",
  look4: "/images/editorial/look4.jpg",
  team1: "/images/editorial/team1.jpg",
  team2: "/images/editorial/team2.jpg",
  team3: "/images/editorial/team3.jpg",
  before: "/images/makeup-before.webp",
  after: "/images/makeup-after.webp",
  film: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=88",
  booking: "/images/editorial/booking.jpg",
};

export const services = [
  { number: "01", name: "Волосы и окрашивание", detail: "Окрашивание, уход и укладка", price: "от 8 500 ₽", duration: "2–3 часа", image: images.hair },
  { number: "02", name: "Уход за лицом", detail: "Индивидуальные программы ухода", price: "от 6 000 ₽", duration: "60–90 минут", image: images.skin },
  { number: "03", name: "Ногтевой сервис", detail: "Маникюр и покрытие", price: "от 4 200 ₽", duration: "90 минут", image: images.nails },
  { number: "04", name: "Макияж", detail: "Подготовка кожи и создание образа", price: "от 7 000 ₽", duration: "75 минут", image: images.makeup },
];

export const team = [
  { name: "Алина Ветрова", role: "Стилист по волосам", specialty: "Окрашивание, стрижки и укладки", image: images.team1 },
  { name: "Марк Левин", role: "Специалист по уходу за лицом", specialty: "Индивидуальные программы ухода за кожей", image: images.team2 },
  { name: "Лея Миронова", role: "Визажист", specialty: "Дневной и вечерний макияж", image: images.team3 },
];

export const testimonials = [
  { quote: "Я пришла за цветом волос, а нашла место, где наконец можно выдохнуть. Здесь всё про тебя — и ничего лишнего.", author: `АННА С. · ГОСТЬ ${brand.name} С 2022`, service: "HAIR RITUAL", image: images.look1 },
  { quote: "Не «сделали красиво», а очень точно услышали, какой я хочу себя видеть. Возвращаюсь за этим ощущением.", author: `МАРИЯ К. · ГОСТЬ ${brand.name} С 2021`, service: "SKIN RITUAL", image: images.look2 },
  { quote: "Удивительное внимание к деталям. Даже тишина здесь кажется частью заботы.", author: `ЕЛЕНА В. · ГОСТЬ ${brand.name} С 2023`, service: "MAKE-UP RITUAL", image: images.look3 },
];
