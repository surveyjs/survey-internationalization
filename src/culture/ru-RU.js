import { cultureInfo } from "./cultureInfo";

export var ruRU_culture = {
    currencyAlpha: "RUB",
    currencyFormats: [
        { value: null }
    ],
    currencyName: "Российский рубль",
    currencySignAfterSymbol: false,
    currencySignLocation: "left",
    currencySymbol: "₽",
    currencySymbolLocation: "right",
    currencyUseParentheses: false,
    dateSeparators: ["."],
    decimalSeparators: [",", "."],
    digitsAfterDecimal: 2,
    digitGroupingSymbols: [" ", "."],
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