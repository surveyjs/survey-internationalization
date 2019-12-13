import { cultureInfo } from "./cultureInfo";

export var ruRU_culture = {
    currency: {
        // alpha: "RUB",
        // formats: [
        //     { value: null }
        // ],
        // name: "Российский рубль",
        // signAfterSymbol: false,
        // signLocation: "left",
        symbol: "₽",
        symbolLocation: "right",
        // useParentheses: false,
    },
    date: {
        separators: ["."],
        shortFormats: [
            { text: "12.04.1961", value: "dd.mm.yy" }
        ]
        // , longDateFormats: [
        //     { text: "12 Апреля 1961", value: "" }
        // ]
    },
    // decimalSeparators: [",", "."],
    // digitsAfterDecimal: 2,
    // digitGroupingSymbols: [" ", "."],
    // locale: "ru",
    name: "Русский (Россия)",
    // , timeFormats: [
    //     { text: "09:07", value: "" }
    // ]
};

cultureInfo.cultures["ru-RU"] = ruRU_culture;