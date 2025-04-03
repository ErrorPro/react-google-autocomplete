"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGoogleMapScript = exports.isBrowser = void 0;
var isBrowser = typeof window !== "undefined" && window.document;
exports.isBrowser = isBrowser;

var loadGoogleMapScript = function loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl) {
  if (!isBrowser) return Promise.resolve();

  if (typeof google !== "undefined") {
    if (google.maps && google.maps.api) return Promise.resolve();
  }

  var scriptElements = document.querySelectorAll("script[src*=\"".concat(googleMapsScriptBaseUrl, "\"]"));

  if (scriptElements && scriptElements.length) {
    return new Promise(function (resolve) {
      // in case we already have a script on the page and it's loaded we resolve
      if (typeof google !== "undefined") return resolve(); // otherwise we wait until it's loaded and resolve

      scriptElements[0].addEventListener("load", function () {
        return resolve();
      });
    });
  }

  var scriptUrl = new URL(googleMapsScriptUrl);
  scriptUrl.searchParams.set("callback", "__REACT_GOOGLE_AUTOCOMPLETE_CALLBACK__");
  var el = document.createElement("script");
  el.src = scriptUrl.toString();
  return new Promise(function (resolve) {
    window.__REACT_GOOGLE_AUTOCOMPLETE_CALLBACK__ = resolve;
    document.body.appendChild(el);
  });
};

exports.loadGoogleMapScript = loadGoogleMapScript;