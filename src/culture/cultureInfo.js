import { enUS_culture } from "./en-US";

export var cultureInfo = {
  currentCultureValue: "",
  defaultCultureValue: "en-US",
  cultures: [],
  supportedCultures: [],
  get currentCulture() {
    return this.currentCultureValue === this.defaultCultureValue
      ? ""
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
  getCulture: function (cultureName = "") {
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
  }
};

cultureInfo.cultures["en-US"] = enUS_culture;