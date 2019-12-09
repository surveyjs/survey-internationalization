import "./chunks/culture";
import { cultureInfo } from "./cultureInfo";

export function initCulture(Survey) {
    Survey.cultureInfo = cultureInfo;
    
    function getQuestionCulture(question) {
        return question.getPropertyValue("culture",
            // eslint-disable-next-line
            question.survey && question.survey.culture || ""); 
    }
    // function getCultureProperty(question, propertyName) {
    //     return question.getPropertyValue(propertyName,
    //         Survey.cultureInfo.getCulture(
    //             getQuestionCulture(question))[propertyName + "s"][0].value); 
    // }
    
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
                            Survey.cultureInfo.getCulture(
                                // eslint-disable-next-line
                                value ||
                                // eslint-disable-next-line
                                obj.survey && obj.survey.culture || "").name,
                        value: value
                    };
                });
        },
        default: ""
    });
    Survey.Serializer.addProperty("text", {
        name: "shortDateFormat",
        dependsOn: "culture",
        choices: function(obj) {
            var formats = Survey.cultureInfo.getCulture(
                getQuestionCulture(obj)).shortDateFormats;
            var defaultFormat = {
                text: "Default: " + formats[0].text,
                value: ""        
            }
            return [defaultFormat].concat(formats);
            //     return [{
            //     text: "Default: " + getCultureProperty(obj, "shortDateFormat"),
            //     value: ""
            // }].concat(Survey.cultureInfo
            //     .getCulture(getQuestionCulture(obj)).shortDateFormats);
        },
        // onGetValue: function(obj) {
        //     return obj.getPropertyValue("shortDateFormat",
        //         Survey.cultureInfo.getCulture(
        //             getQuestionCulture(obj)).shortDateFormats[0].value); 
        // },
        default: ""
    });
};