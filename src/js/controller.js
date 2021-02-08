'use strict';
import 'regenerator-runtime/runtime';
import { control, map } from 'leaflet';
import * as model from './model';
import ButtonView from './views/ButtonView';
import stopwatchView from './views/stopwatchView';
import recordView from './views/recordView';
import scrollToView from './views/scrollToView';
import cardView from './views/cardView';
import {
  geoError,
  toggleClass,
  showRoute,
  initCardScroll,
  moveCard,
  resetCard,
} from './helper';
import { featureSection, benefitSection, startSection, runApplication } from './config';

const testNav = document.getElementById('navID');

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

    //set the data to the localStorage

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
  if (e.target.dataset.section === 'feature-section')
    featureSection.scrollIntoView({ behavior: 'smooth' });
  if (e.target.dataset.section === 'benefit-section')
    benefitSection.scrollIntoView({ behavior: 'smooth' });
  if (e.target.dataset.section === 'run-app')
    runApplication.scrollIntoView({ behavior: 'smooth' });
};

const controlCardRight = function () {
  cardView.curCard++;
  if (cardView.curCard === 3) resetCard();
  moveCard(cardView.curCard);
};

const controlCardLeft = function () {
  cardView.curCard--;
  if (cardView.curCard === -1) resetCard();
  moveCard(cardView.curCard);
};

const init = function () {
  model.loadLocalStorage();
  recordView.renderAllRecord(model.state.allRunRecord);
  initCardScroll(cardView.benefitCard);
  model.loadCurrentPosition();
  stopwatchView.addEndButtonHandler(controlEndButton);
  stopwatchView.addStartButtonHandler(controlStartButton); //if it is possible: create an object using ButtonView class so that I can call the .addStartButtonHandler on ButtonView
  cardView.addArrowRightHandler(controlCardRight);
  cardView.addArrowLeftHandler(controlCardLeft);
  scrollToView.addScrollToHandler(controlNavScrollTo);
};

init();

//Mobile Burger Navigation
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.nav-links');

toggleButton.addEventListener('click', function (e) {
  e.preventDefault();
  navbarLinks.classList.toggle('active');
});

//Reveal Section Animation
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});
