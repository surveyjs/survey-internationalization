import { cultureInfo } from "./cultureInfo";
import { RUB } from "./currency/RUB";

export var ruRU_culture = {
    currency: RUB,
    dateSeparators: ["."],
    locale: "ru",
    longDateFormats: [
        { text: "12 Апреля 1961", value: "" }
    ],
    name: "Русский (Россия)",
    shortDateFormats: [
        { text: "12.04.1961", value: "dd.mm.yy" }
    ],
    timeFormats: [
        { text: "09:07", value: "" }
    ]
};

cultureInfo.cultures["ru-RU"] = ruRU_culture;