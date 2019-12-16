import { dateCultures } from "./jquery-ui-datepicker_culture";

export function init(Survey, $) {
  for (var culture in dateCultures) {
    if (typeof Survey.cultureInfo.cultures[culture] === "undefined") {
      Survey.cultureInfo.cultures[culture] = {};
    }
    for (var dateProperty in dateCultures[culture]) {
      Survey.cultureInfo.cultures[culture][dateProperty] =
        dateCultures[culture][dateProperty];
    }
  }
  $ = $ || window.$;
  if (!$.fn.bootstrapDP && !!$.fn.datepicker && !!$.fn.datepicker.noConflict) {
    $.fn.bootstrapDP = $.fn.datepicker.noConflict();
    if (!$.fn.datepicker) {
      $.fn.datepicker = $.fn.bootstrapDP;
    }
  }
  var widget = {
    name: "datepicker",
    title: "Date picker",
    iconName: "icon-datepicker",
    widgetIsLoaded: function() {
      return !!$ && !!$.fn.datepicker && !$.fn.datepicker.noConflict;
    },
    isFit: function(question) {
      return question.getType() === "datepicker";
    },
    htmlTemplate: "<input class='form-control widget-datepicker' type='text'>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "datepicker",
        [
          { name: "inputType", visible: false },
          { name: "inputFormat", visible: false },
          { name: "inputMask", visible: false }
        ],
        null,
        "text"
      );
      Survey.JsonObject.metaData.addProperty("datepicker", {
        name: "dateFormat"
      });
      Survey.JsonObject.metaData.addProperty("datepicker", {
        name: "config",
        default: null
      });
      // Survey.JsonObject.metaData.addProperty("datepicker", {
      //   name: "dateSeparator",
      //   choices: function(obj) {
      //     return Survey.cultureInfo && Survey.cultureInfo.getCulture(obj && obj.culture).dateSeparators || [];
      //   },
      //   onSetValue: function(obj, value, jsonConv) {
      //     var newValue = value || "/";
      //     if (!!obj.shortDateFormat) {
      //       var regex = new RegExp(obj.dateSeparator, "g");
      //       obj.shortDateFormat = obj.shortDateFormat.replace(regex, newValue);
      //     }
      //     obj.setPropertyValue("dateSeparator", newValue);
      //   },
      //   default: "/"
      // });
      // Survey.JsonObject.metaData.addProperty("datepicker", {
      //   name: "shortDateFormat",
      //   dependsOn: "dateSeparator",
      //   choices: function(obj) {
      //     return (Survey.cultureInfo && Survey.cultureInfo.getCulture(obj && obj.culture).shortDateFormats || []).map(function(fmt) {
      //       return {
      //         text: fmt.text.replace(/\//g, obj.dateSeparator || "/"),
      //         value: fmt.value.replace(/\//g, obj.dateSeparator || "/")
      //       }
      //     });
      //   }
      // });
    },
    afterRender: function(question, el) {
      var $el = $(el).is(".widget-datepicker")
        ? $(el)
        : $(el).find(".widget-datepicker");
      $el.addClass(question.css.text.root);
      var isSelecting = false;
      var config = $.extend(true, {}, question.config || {});
      if (!!question.placeHolder) {
        $el.attr("placeholder", question.placeHolder);
      }
      if (config.dateFormat === undefined) {
        config.dateFormat = !!question.dateFormat
          ? question.dateFormat
          : undefined;
          if (config.dateFormat === undefined) {
            config.dateFormat = Survey.cultureInfo
              .getQuestionShortDateFormat(question);}
      }
      if (config.option === undefined) {
        config.option = {
          minDate: null,
          maxDate: null
        };
      }
      if (config.onSelect === undefined) {
        config.onSelect = function(dateText) {
          isSelecting = true;
          question.value = dateText;
          isSelecting = false;
          this.fixFocusIE = true;
        };
      }
      config.fixFocusIE = false;
      config.onClose = function(dateText, inst) {
        this.fixFocusIE = true;
      };
      config.beforeShow = function(input, inst) {
        var result = !!navigator.userAgent.match(/Trident\/7\./)
          ? !this.fixFocusIE
          : true;
        this.fixFocusIE = false;
        return result;
      };
      var pickerWidget = $el.datepicker(config);

      $el.keyup(function(e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
          $.datepicker._clearDate(this);
        }
      });

      question.readOnlyChangedCallback = function() {
        $el.datepicker("option", "disabled", question.isReadOnly);
      };
      function updateDate() {
        if (question.value) {
          pickerWidget.datepicker("setDate", question.value);
        } else {
          pickerWidget.datepicker("setDate", null);
        }
      }
      question.registerFunctionOnPropertyValueChanged("dateFormat", function() {
        question.dateFormat &&
          pickerWidget.datepicker("option", "dateFormat", question.dateFormat);
        updateDate();
      });
      question.valueChangedCallback = function() {
        if (!isSelecting) {
          updateDate();
          $el.blur();
        }
      };
      question.valueChangedCallback();
    },
    willUnmount: function(question, el) {
      var $el = $(el).is(".widget-datepicker")
        ? $(el)
        : $(el).find(".widget-datepicker");
      $el.datepicker("destroy");
    },
    pdfQuestionType: "text"
  };

  Survey.matrixDropdownColumnTypes.datepicker = { properties: ["placeHolder"] };
  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}
