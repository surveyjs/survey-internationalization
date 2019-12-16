import { cultureInfo } from "./cultureInfo";

export function initCulture(Survey) {
    Survey.cultureInfo = cultureInfo;
    Survey.Serializer.addProperty("survey", {
        name: "culture",
        choices: function(obj) {
            return [null].concat(Survey.cultureInfo.getCultures())
                .map((value) => {
                    return {
                        text: (value ? "" : "Default: ") +
                            Survey.cultureInfo.getCulture(value || "").name,
                        value: value
                    }
                });
        },
        default: null
    });
    Survey.Serializer.addProperty("text", {
        name: "culture",
        choices: function(obj) {
            return [null].concat(Survey.cultureInfo.getCultures())
                .map((value) => {
                    return {
                        text: (value ? "" : "Default: ") +
                            Survey.cultureInfo.getCulture(value ||
                                obj.survey && obj.survey.culture || "").name,
                        value: value
                    };
                });
        },
        default: null
    });
    Survey.Serializer.addProperty("text", {
        name: "currencySymbol",
        dependsOn: "culture",
        onGetValue: function(obj) {
            // return obj.getPropertyValue("currencySymbol",
            //     Survey.cultureInfo.getCulture(
            //         Survey.cultureInfo.getQuestionCulture(obj)).currency.symbol);
            
            // return obj.getPropertyValue("currencySymbol",
            return Survey.cultureInfo.getCulture(
                Survey.cultureInfo.getQuestionCulture(obj)).currency.symbol;
        },
        default: null
    });
    Survey.Serializer.addProperty("text", {
        name: "currencySymbolLocation",
        dependsOn: "culture",
        choices: function(obj) {
            return [{
                text: "Default: " + Survey.cultureInfo.getCulture(
                    Survey.cultureInfo.getQuestionCulture(obj)).currency.symbolLocation,
                value: null
            }, "left", "right", "none"]
        },
        default: null
    });
    Survey.Serializer.addProperty("text", {
        name: "dateSeparator",
        dependsOn: "culture",
        choices: function(obj) {
            var separators = Survey.cultureInfo.getCulture(
                Survey.cultureInfo.getQuestionCulture(obj)).date.separators;
            var defaultSeparator = {
                text: "Default: " + separators[0],
                value: null
            };
            return [defaultSeparator].concat(separators);
        },
        default: null
    });
    Survey.Serializer.addProperty("text", {
        name: "shortDateFormat",
        dependsOn: ["culture", "dateSeparator"],
        choices: function(obj) {
            var formats = Survey.cultureInfo.getCulture(
                Survey.cultureInfo.getQuestionCulture(obj)).date.shortFormats;
            var defaultFormat = {
                text: "Default: " + formats[0].text,
                value: null
            };
            return [defaultFormat].concat(formats);
        },
        default: null
    });
};

if (typeof Survey !== "undefined") {
    initCulture(Survey);
}