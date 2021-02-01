"use strict";
import "regenerator-runtime/runtime";
import { control, map } from "leaflet";
import * as model from "./model";
import ButtonView from "./views/ButtonView";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import scrollToView from "./views/scrollToView";
import { geoError, toggleClass, showRoute } from "./helper";
import {
   featureSection,
   benefitSection,
   startSection,
   runApplication,
} from "./config";

const testNav = document.getElementById("navID");

const controlStartButton = async function () {
   try {
      // update the timer for every 1 second
      stopwatchView.renderStopwatch();

      //render the finish button
      stopwatchView.toggleClass();

      //capture startTime and startPosition to state
      await model.loadStartData();
   } catch (err) {
      console.log(err);
   }
};

const controlEndButton = async function () {
   try {
      //clear the timer
      stopwatchView.resetStopwatch();

      //render the finish button
      stopwatchView.toggleClass();

      //capture endTime and endPosition to state
      //formate the Result
      await model.loadEndData();

      //first render the route
      showRoute(model.state.allRunRecord);

      //get the data of the route (in model.js)
      await model.loadRouteData();

      //finalise all the data needed for rendering
      model.loadRunRecord();

      console.log(model.state.allRunRecord);
      //render the record using model.state data
      recordView.renderRecord(model.state.allRunRecord);
   } catch (err) {
      console.log(err);
   }
};

const controlNavScrollTo = function (e) {
   e.preventDefault();
   console.log(e.target);
   console.log(e.target.dataset.section);
   if (e.target.dataset.section === "feature-section")
      featureSection.scrollIntoView({ behavior: "smooth" });
   if (e.target.dataset.section === "benefit-section")
      benefitSection.scrollIntoView({ behavior: "smooth" });
   if (e.target.dataset.section === "run-app")
      runApplication.scrollIntoView({ behavior: "smooth" });
};

const init = function () {
   model.loadCurrentPosition();
   stopwatchView.addEndButtonHandler(controlEndButton);
   stopwatchView.addStartButtonHandler(controlStartButton); //if it is possible: create an object using ButtonView class so that I can call the .addStartButtonHandler on ButtonView
   scrollToView.addScrollToHandler(controlNavScrollTo);
};

// const benefitCard = document.querySelectorAll(".benefit-card");
// const btnBenefitCard1 = document.getElementById("benefit-card-1");
// const btnBenefitCard2 = document.getElementById("benefit-card-2");
// const btnBenefitCard3 = document.getElementById("benefit-card-3");

// const btnBenefit = document.querySelectorAll(".benefit-control-button");

// btnBenefit.forEach((btn) => {
//    btn.addEventListener("click", function (e) {
//       console.log(e.target);
//       console.log(e.target.textContent);
//       if (e.target.textContent === "1") {
//          btnBenefitCard1.classList.remove("hidden");
//          btnBenefitCard2.classList.add("hidden");
//          btnBenefitCard3.classList.add("hidden");
//       }
//       if (e.target.textContent === "2") {
//          btnBenefitCard1.classList.add("hidden");
//          btnBenefitCard2.classList.remove("hidden");
//          btnBenefitCard3.classList.add("hidden");
//       }
//       if (e.target.textContent === "3") {
//          btnBenefitCard1.classList.add("hidden");
//          btnBenefitCard2.classList.add("hidden");
//          btnBenefitCard3.classList.remove("hidden");
//       }
//    });
// });

// btnBenefitCard2.addEventListener("click", function () {});

init();
