const API_URL = "http://localhost:3000";

window.addEventListener("locationchange", async function() {
  // let location = window.location.href;

  let params = new URLSearchParams(window.location.search);
  let aid = params.get("aid");
  let specyoAnalytics = sessionStorage.getItem("specyoAnalytics");
  if (aid && aid !== undefined && aid !== "") {
    if (specyoAnalytics && specyoAnalytics !== "undefined") {
      // update existing specyo analytics cookie session
      fetch(API_URL + "/track/updateSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ specyoAnalytics, aid })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data);
          sessionStorage.setItem("specyoAnalytics", data.specyoAnalytics);
        });
    } else {
      // create a new cookie session
      fetch(API_URL + "/track/createSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ aid })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data);
          sessionStorage.setItem("specyoAnalytics", data.specyoAnalytics);
        });
    }
  } else {
    // NO aid so now we check if the URL matches our DB to check if url exists to track
    fetch(API_URL + "/track/check/pageVisitMetrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ specyoAnalytics, url: window.location.href })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        // the customer has become a conversion so we remove the tracking
        // console.log(data);
        sessionStorage.setItem("specyoAnalytics", data.specyoAnalytics);
        // sessionStorage.removeItem("specyoAnalytics");
      });
  }
});
history.pushState = (f =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(history.pushState);

history.replaceState = (f =>
  function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(history.replaceState);

window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
