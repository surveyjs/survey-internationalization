import React, { Component } from "react";
import logo from "./logo.svg";
import "survey-react/survey.css";
import "./App.css";

import $ from "jquery";
import * as Survey from "survey-react";
import SurveyCreator from "./SurveyCreator";
import * as widgets from "surveyjs-widgets";
window["$"] = window["jQuery"] = $;
Survey.StylesManager.applyTheme("default");
widgets.inputmask(Survey);
widgets.jqueryuidatepicker(Survey, $);

class App extends Component {
  json = {
    elements: [
      {
        type: "text",
        name: "text_date_mask"
      },
      {
        type: "text",
        name: "text_time_mask"
      },
      {
        type: "text",
        name: "text_number_mask"
      },
      {
        type: "text",
        name: "text_currency_mask",
        inputMask: "currency"
      }
    ]
  };
  onComplete(result) {
    console.log(result);
  }
  render() {
    var model = new Survey.Model(this.json);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to SurveyJS Internationalization</h2>
        </header>
        <div className="surveyjs">
          <h1>SurveyJS Library:</h1>
          <Survey.Survey
            model={model}
            onComplete={this.onComplete}
          />
          <h1>SurveyJS Creator:</h1>
          <SurveyCreator />
        </div>
      </div>
    );
  }
}

export default App;
