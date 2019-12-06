import "./chunks/culture";
import { cultureInfo } from "./cultureInfo";

export function initCulture(Survey) {
    Survey.cultureInfo = cultureInfo;
    
    function getQuestionCulture(question) {
        return question.getPropertyValue("culture",
            // eslint-disable-next-line
            question.survey && question.survey.culture || ""); 
    }
    
    Survey.Serializer.addProperty("survey", {
        name: "culture",
        choices: function(obj) {
            return [""].concat(Survey.cultureInfo.getCultures())
                .map((value) => {
                    return {
                        text: (value ? "" : "Default: ") +
                            Survey.cultureInfo.getCulture(value).name,
                        value: value
                    }
                });
            //     };
            
            
            // [
            //     {
            //         text: "Default: " + Survey.cultureInfo.getCulture().name,
            //         value: ""
            //     }
            // ].concat(Survey.cultureInfo.getCultures());
        },
        default: ""
    });
    Survey.Serializer.addProperty("text", {
        name: "culture",
        choices: function(obj) {
            return [""].concat(Survey.cultureInfo.getCultures())
                .map((value) => {
                    return {
                        text: (value ? "" : "Default: ") +
                            Survey.cultureInfo.getCulture(value).name,
                        value: value
                    }
                });
        },
        onGetValue: getQuestionCulture,
        default: ""
    });
    Survey.Serializer.addProperty("text", {
        name: "shortDateFormat",
        dependsOn: "culture",
        choices: function(obj) {
            return [""].concat(Survey.cultureInfo
                .getCulture(getQuestionCulture(obj)).shortDateFormats);
        },
        onGetValue: function(obj) {
            return obj.getPropertyValue("shortDateFormat",
                Survey.cultureInfo.getCulture(
                    getQuestionCulture(obj)).shortDateFormats[0].value); 
        },
        default: ""
    });
};