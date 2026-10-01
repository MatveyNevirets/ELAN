module.exports = [
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/content.ts [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["brand"].name} — искусство быть собой`,
    description: `Авторские ритуалы красоты в самом сердце Москвы. ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["brand"].name} — beauty atelier с вниманием к деталям.`
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "ru",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: children
        }, void 0, false, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "brand",
    ()=>brand,
    "images",
    ()=>images,
    "services",
    ()=>services,
    "team",
    ()=>team,
    "testimonials",
    ()=>testimonials
]);
const brand = {
    name: "ÉLAN",
    city: "MOSCOW · PATRICK’S",
    phone: "+7 495 120 44 08",
    address: "Москва, Большая Никитская, 22"
};
const images = {
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
    booking: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=86"
};
const services = [
    {
        number: "01",
        name: "Hair",
        detail: "Сложное окрашивание, форма и характер.",
        price: "от 8 500 ₽",
        duration: "2–3 часа",
        image: images.hair
    },
    {
        number: "02",
        name: "Skin",
        detail: "Уход, который возвращает коже её свет.",
        price: "от 6 000 ₽",
        duration: "60–90 минут",
        image: images.skin
    },
    {
        number: "03",
        name: "Nails",
        detail: "Точная форма. Безупречное покрытие.",
        price: "от 4 200 ₽",
        duration: "90 минут",
        image: images.nails
    },
    {
        number: "04",
        name: "Make-up",
        detail: "Макияж, в котором узнаёшь себя.",
        price: "от 7 000 ₽",
        duration: "75 минут",
        image: images.makeup
    }
];
const team = [
    {
        name: "Алина Ветрова",
        role: "ART HAIRIST",
        specialty: "Цвет как продолжение личности",
        image: images.team1
    },
    {
        name: "Марк Левин",
        role: "SKIN EXPERT",
        specialty: "Чистая кожа без лишнего",
        image: images.team2
    },
    {
        name: "Лея Миронова",
        role: "MAKE-UP ARTIST",
        specialty: "Тихая выразительность",
        image: images.team3
    }
];
const testimonials = [
    {
        quote: "Я пришла за цветом волос, а нашла место, где наконец можно выдохнуть. Здесь всё про тебя — и ничего лишнего.",
        author: `АННА С. · ГОСТЬ ${brand.name} С 2022`,
        service: "HAIR RITUAL",
        image: images.look1
    },
    {
        quote: "Не «сделали красиво», а очень точно услышали, какой я хочу себя видеть. Возвращаюсь за этим ощущением.",
        author: `МАРИЯ К. · ГОСТЬ ${brand.name} С 2021`,
        service: "SKIN RITUAL",
        image: images.look2
    },
    {
        quote: "Удивительное внимание к деталям. Даже тишина здесь кажется частью заботы.",
        author: `ЕЛЕНА В. · ГОСТЬ ${brand.name} С 2023`,
        service: "MAKE-UP RITUAL",
        image: images.look3
    }
];
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_11o3ocz._.js.map