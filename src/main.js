/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
import "./assets/js/trackUrl.js";
import { fetchIntercept, ajaxIntercept } from "./assets/js/interceptor.js";

const unregister = fetchIntercept.register({
  request: function(url, config) {
    // Modify the url or config here
    console.log("WOWWOWOWOWOWOWOWOWOWOWOOWWO");
    return [url, config];
  },

  requestError: function(error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function(response) {
    // Modify the reponse object
    return response;
  },

  responseError: function(error) {
    // Handle an fetch error
    return Promise.reject(error);
  }
});

// Call fetch to see your interceptors in action.
fetch("http://google.com");

// Unregister your interceptor
unregister();

window.onload = function() {
  console.log("Hello mew from the console!");
};

let spa = sessionStorage.getItem("spa");
if (spa || spa !== "undefined" || spa !== null) {
  document.getElementById("conversion").style.display = "block";
} else {
  document.getElementById("conversion").style.display = "none";
}

const button = document.querySelectorAll("button[id^=c]");

let state = {
  buttonText: "Initial text"
};
// Change the look of your app based on state
function render() {
  button.innerText = state.buttonText;
}
// Set initial state and render app for the first time
(function initialize() {
  window.history.replaceState(state, null, "");
  render(state);
})();
// Update state, history, and user interface

button.forEach(btn => {
  btn.addEventListener("click", e => {
    if (e.target.id === "c1") {
      history.pushState(
        { pageID: "campaignOne" },
        "CampaignOne",
        "/campaignOne?aid=000011111113333333"
      );
    } else if (e.target.id === "c2") {
      history.pushState(
        { pageID: "campaignTwo" },
        "CampaignTwo",
        "/campaignTwo?aid=22222222224444444444"
      );
    } else if (e.target.id === "c3") {
      history.pushState(
        { pageID: "campaignThree" },
        "CampaignThree",
        "/campaignThree?aid=9999933333333"
      );
    } else if (e.target.id === "c4") {
      history.pushState(
        { pageID: "campaignFour" },
        "CampaignFour",
        "/campaignFour?aid=87jski907"
      );
    } else if (e.target.id === "conversion") {
      history.pushState(
        { pageID: "conversion" },
        "Conversion",
        "/conversion/success"
      );
    } else {
      return;
    }
  });
});
// Tell your browser to give you old state and re-render on back
window.onpopstate = function(event) {
  if (event.state) {
    state = event.state;
  }
  render(state);
};

/* End JavaScript */
