import "./chunks/culture";
import { cultureInfo } from "./cultureInfo";

export function initCulture(Survey) {
    Survey.cultureInfo = cultureInfo;
    Survey.Serializer.addProperty("text", {
        name: "culture",
        choices: function(obj) {
            return Survey.cultureInfo.getCultures();
        },
        onGetValue: function(obj) {
            return obj.getPropertyValue("culture",
                // eslint-disable-next-line
                obj.survey && obj.survey.culture || ""); 
        },
        default: ""
    });
    Survey.Serializer.addProperty("text", {
        name: "shortDateFormat",
        dependsOn: "culture",
        choices: function(obj) {
            return [""].concat(Survey.cultureInfo
                .getCulture(obj.culture).shortDateFormats);
        },
        onGetValue: function(obj) {
            return obj.getPropertyValue("shortDateFormat",
                Survey.cultureInfo.getCulture(
                    obj.culture).shortDateFormats[0].value); 
        },
        default: ""
    })
    Survey.Serializer.addProperty("survey", {
        name: "culture",
        choices: function(obj) {
            return Survey.cultureInfo.getCultures();
        },
        default: Survey.cultureInfo.defaultCulture
    });
};