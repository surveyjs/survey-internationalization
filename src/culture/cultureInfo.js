export var cultureInfo = {
  currentCultureValue: null,
  defaultCultureValue: "en-US",
  cultures: [],
  supportedCultures: [],
  get currentCulture() {
    return this.currentCultureValue === this.defaultCultureValue
      ? null
      : this.currentCultureValue;
  },
  set currentCulture(val) {
    this.currentCultureValue = val;
  },
  get defaultCulture() {
    return this.defaultCultureValue;
  },
  set defaultCulture(val) {
    this.defaultLocaleValue = val;
  },
  getCulture: function(cultureName = null) {
    let actualCultureName = cultureName || this.currentCultureValue || this.defaultCultureValue;
    return this.cultures[actualCultureName];
  },
  getCultures: function() {
    var res = [];
    if (this.supportedCultures && this.supportedCultures.length > 0) {
      for (var i = 0; i < this.supportedCultures.length; i++) {
        res.push(this.supportedCultures[i]);
      }
    } else {
      for (var key in this.cultures) {
        res.push(key);
      }
    }
    res.sort();
    return res;
  },
  getSurveyCulture: function(survey) {
    return survey.getPropertyValue("culture",
      this.currentCultureValue || this.defaultCultureValue);
  },
  getQuestionCulture: function(question) {
    return question.getPropertyValue("culture",
      question.survey && this.getSurveyCulture(question.survey) ||
      this.currentCultureValue || this.defaultCultureValue);
  },
  getQuestionCurrencySymbolLocation: function(question) {
    return question.getPropertyValue("currencySymbolLocation",
      this.getCulture(this.getQuestionCulture(question))
        .currency.symbolLocation);
  },
  getQuestionDateSeparator: function(question) {
    return question.getPropertyValue("dateSeparator",
      this.getCulture(this.getQuestionCulture(question))
        .date.separators[0]);
  },
  getQuestionShortDateFormat: function(question) {
    var separator = this.getQuestionDateSeparator(question);
    var format = question.getPropertyValue("shortDateFormat",
      this.getCulture(this.getQuestionCulture(question))
       .date.shortFormats[0].value);
    return format.replace(/\W/g, separator);
  }
};