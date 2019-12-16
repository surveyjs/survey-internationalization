import React, { Component } from "react";
import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import "survey-creator/survey-creator.css";
import $ from "jquery";
import { initCulture } from "./culture/cultureInit";
import { init as inputmask } from "./widgets/inputmask";
import { init as jqueryuidatepicker } from "./widgets/jquery-ui-datepicker";
SurveyJSCreator.StylesManager.applyTheme("default");
initCulture(SurveyKo);
inputmask(SurveyKo);
jqueryuidatepicker(SurveyKo, $);

class SurveyCreator extends Component {
    surveyCreator;
    componentDidMount() {
      this.surveyCreator = new SurveyJSCreator.SurveyCreator(
        "surveyCreatorContainer"
      );
      this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    }
    render() {
      return <div id="surveyCreatorContainer" />;
    }
    saveMySurvey = () => {
      console.log(JSON.stringify(this.surveyCreator.text));
    };
  }
  
  export default SurveyCreator;