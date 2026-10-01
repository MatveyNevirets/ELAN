export const brand = {
  name: "ÉLAN",
  city: "MOSCOW · PATRICK’S",
  phone: "+7 495 120 44 08",
  address: "Москва, Большая Никитская, 22",
};

export const images = {
  hero: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=2200&q=88",
  philosophy: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=86",
  hair: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1500&q=86",
  skin: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1500&q=86",
  nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1500&q=86",
  makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1500&q=86",
  look1: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1200&q=86",
  look2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=86",
  look3: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=86",
  look4: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=86",
  team1: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1500&q=86",
  team2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=86",
  team3: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=86",
  before: "/images/makeup-before.webp",
  after: "/images/makeup-after.webp",
  film: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=88",
  booking: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=86",
};

export const services = [
  { number: "01", name: "Hair", detail: "Сложное окрашивание, форма и характер.", price: "от 8 500 ₽", duration: "2–3 часа", image: images.hair },
  { number: "02", name: "Skin", detail: "Уход, который возвращает коже её свет.", price: "от 6 000 ₽", duration: "60–90 минут", image: images.skin },
  { number: "03", name: "Nails", detail: "Точная форма. Безупречное покрытие.", price: "от 4 200 ₽", duration: "90 минут", image: images.nails },
  { number: "04", name: "Make-up", detail: "Макияж, в котором узнаёшь себя.", price: "от 7 000 ₽", duration: "75 минут", image: images.makeup },
];

export const team = [
  { name: "Алина Ветрова", role: "ART HAIRIST", specialty: "Цвет как продолжение личности", image: images.team1 },
  { name: "Марк Левин", role: "SKIN EXPERT", specialty: "Чистая кожа без лишнего", image: images.team2 },
  { name: "Лея Миронова", role: "MAKE-UP ARTIST", specialty: "Тихая выразительность", image: images.team3 },
];

export const testimonials = [
  { quote: "Я пришла за цветом волос, а нашла место, где наконец можно выдохнуть. Здесь всё про тебя — и ничего лишнего.", author: `АННА С. · ГОСТЬ ${brand.name} С 2022`, service: "HAIR RITUAL", image: images.look1 },
  { quote: "Не «сделали красиво», а очень точно услышали, какой я хочу себя видеть. Возвращаюсь за этим ощущением.", author: `МАРИЯ К. · ГОСТЬ ${brand.name} С 2021`, service: "SKIN RITUAL", image: images.look2 },
  { quote: "Удивительное внимание к деталям. Даже тишина здесь кажется частью заботы.", author: `ЕЛЕНА В. · ГОСТЬ ${brand.name} С 2023`, service: "MAKE-UP RITUAL", image: images.look3 },
];
