import Inputmask from "inputmask";
import { currencyCultures } from "./inputmask_culture";

export function init(Survey) {
  for (var culture in currencyCultures) {
    if (typeof Survey.cultureInfo.cultures[culture] === "undefined") {
      Survey.cultureInfo.cultures[culture] = {};
    }
    for (var currencyProperty in currencyCultures[culture]) {
      Survey.cultureInfo.cultures[culture][currencyProperty] =
        currencyCultures[culture][currencyProperty];
    }
  }
  var widget = {
    name: "maskedit",
    numericGroupSeparator: ",",
    numericAutoGroup: true,
    numericDigits: 2,
    numericDigitsOptional: false,
    numericPlaceholder: "0",
    autoUnmask: true,
    widgetIsLoaded: function() {
      return typeof Inputmask != "undefined";
    },
    isFit: function(question) {
      if (question.getType() == "multipletext") return true;
      return (
        question.getType() == "text" &&
        (question.inputMask != "none" || question.inputFormat)
      );
    },
    isDefaultRender: true,
    activatedByChanged: function(activatedBy) {
      if (Survey.JsonObject.metaData.findProperty("text", "inputMask")) return;
      var properties = [
        "inputFormat",
        {
          name: "prefix",
          visible: false
        },
        //"currencySymbol",
        {
          name: "autoUnmask:boolean",
          default: true
        },
        {
          name: "inputMask",
          default: "none",
          choices: [
            "none",
            "datetime",
            "currency",
            "decimal",
            "email",
            "phone",
            "ip"
          ]
        }
      ];
      Survey.JsonObject.metaData.addProperties("text", properties);
      Survey.JsonObject.metaData.addProperties(
        "matrixdropdowncolumn",
        properties
      );
      Survey.JsonObject.metaData.addProperties("multipletextitem", properties);
    },
    applyInputMask: function(surveyElement, el) {
      var rootWidget = this;
      var mask =
        surveyElement.inputMask != "none"
          ? surveyElement.inputMask
          : surveyElement.inputFormat;
      var options = {
        autoUnmask:
          typeof surveyElement.autoUnmask !== "undefined"
            ? surveyElement.autoUnmask
            : rootWidget.autoUnmask
      };
      if (surveyElement.inputMask != "none")
        options.inputFormat = surveyElement.inputFormat;

      if (
        surveyElement.inputMask == "currency" ||
        surveyElement.inputMask == "decimal"
      ) {
        options.groupSeparator = rootWidget.numericGroupSeparator;
        options.autoGroup = rootWidget.numericAutoGroup;
      }
      if (surveyElement.inputMask == "currency") {
        options.digits = rootWidget.numericDigits;
        options.digitsOptional = rootWidget.numericDigitsOptional;
        options.prefix = surveyElement.prefix || "";
        var currencySymbolLocation = Survey.cultureInfo
          .getQuestionCurrencySymbolLocation(surveyElement);
        if (currencySymbolLocation == "left") {
          options.prefix = options.prefix || surveyElement.currencySymbol;
        }
        else if (currencySymbolLocation == "right") {
          options.suffix = surveyElement.currencySymbol;
        }
        options.placeholder = rootWidget.numericPlaceholder;
      }
      if (surveyElement.inputMask == "datetime") {
        mask = surveyElement.inputFormat;
      }

      Inputmask(mask, options).mask(el);

      el.onblur = function() {
        if (surveyElement.value === el.inputmask.getemptymask()) {
          surveyElement.value = "";
        }
      };

      el.oninput = function() {
        surveyElement.customWidgetData.isNeedRender = true;
      };

      var pushValueHandler = function () {
        if (el.inputmask.isComplete()) {
          surveyElement.value = options.autoUnmask ?
            el.inputmask.unmaskedvalue() : el.value;
        } else {
          surveyElement.value = null;
        }
      };
      el.onfocusout = el.onchange = pushValueHandler;    

      var updateHandler = function() {
        el.value =
          typeof surveyElement.value === "undefined" ? "" : surveyElement.value;
      };
      surveyElement.valueChangedCallback = updateHandler;
      updateHandler();
    },
    afterRender: function(question, el) {
      if (question.getType() != "multipletext") {
        var input = el.querySelector("input") || el;
        this.applyInputMask(question, input);
      } else {
        for (var i = 0; i < question.items.length; i++) {
          var item = question.items[i];
          if (item.inputMask != "none" || item.inputFormat) {
            var input = el.querySelector("#" + item.id);
            if (input) {
              this.applyInputMask(item, input);
            }
          }
        }
      }
    },
    willUnmount: function(question, el) {
      var input = el.querySelector("input") || el;
      if (!!input && !!input.inputmask) {
        input.inputmask.remove();
      }
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);
}

// if (typeof Survey !== "undefined") {
//   init(Survey);
// }
