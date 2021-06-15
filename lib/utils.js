"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGoogleMapScript = exports.isBrowser = void 0;

var _jsApiLoader = require("@googlemaps/js-api-loader");

var isBrowser = typeof window !== "undefined" && window.document;
exports.isBrowser = isBrowser;

var loadGoogleMapScript = function loadGoogleMapScript(options) {
  if (!isBrowser) return Promise.resolve();
  var loader = new _jsApiLoader.Loader(options);
  return loader.load();
};

exports.loadGoogleMapScript = loadGoogleMapScript;