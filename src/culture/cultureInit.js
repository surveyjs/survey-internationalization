import "./chunks/culture";
import { cultureInfo } from "./cultureInfo";

export function initCulture(Survey) {
    Survey.cultureInfo = cultureInfo;
    
    function getQuestionCulture(question) {
        return question.getPropertyValue("culture",
            // eslint-disable-next-line
            question.survey && question.survey.culture || null); 
    }
    // function getCultureProperty(question, propertyName) {
    //     return question.getPropertyValue(propertyName,
    //         Survey.cultureInfo.getCulture(
    //             getQuestionCulture(question))[propertyName + "s"][0].value); 
    // }
    
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
                            Survey.cultureInfo.getCulture(
                                // eslint-disable-next-line
                                value ||
                                // eslint-disable-next-line
                                obj.survey && obj.survey.culture || "").name,
                        value: value
                    };
                });
        },
        default: null
    });
    Survey.Serializer.addProperty("text", {
        name: "dateSeparator",
        dependsOn: "culture",
        choices: function(obj) {
            var separators = Survey.cultureInfo.getCulture(
                getQuestionCulture(obj) || "").dateSeparators;
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
                getQuestionCulture(obj) || "").shortDateFormats;
            var defaultFormat = {
                text: "Default: " + formats[0].text,
                value: null
            };
            return [defaultFormat].concat(formats);
        },
        default: null
    });
};