"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesWidget;

var _react = require("react");

var _utils = require("./utils");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function usePlacesWidget(props) {
  var ref = props.ref,
      onPlaceSelected = props.onPlaceSelected,
      apiKey = props.apiKey,
      _props$inputAutocompl = props.inputAutocompleteValue,
      inputAutocompleteValue = _props$inputAutocompl === void 0 ? "new-password" : _props$inputAutocompl,
      _props$options = props.options;
  _props$options = _props$options === void 0 ? {} : _props$options;

  var _props$options$types = _props$options.types,
      types = _props$options$types === void 0 ? ["(cities)"] : _props$options$types,
      componentRestrictions = _props$options.componentRestrictions,
      _props$options$fields = _props$options.fields,
      fields = _props$options$fields === void 0 ? ["address_components", "geometry.location", "place_id", "formatted_address"] : _props$options$fields,
      bounds = _props$options.bounds,
      options = _objectWithoutProperties(_props$options, ["types", "componentRestrictions", "fields", "bounds"]),
      _props$googleMapsScri = props.googleMapsScriptBaseUrl,
      googleMapsScriptBaseUrl = _props$googleMapsScri === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _props$googleMapsScri;

  var inputRef = (0, _react.useRef)(null);
  var event = (0, _react.useRef)(null);
  var autocompleteRef = (0, _react.useRef)(null);
  var observerHack = (0, _react.useRef)(null);
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?libraries=places&key=").concat(apiKey);
  var handleLoadScript = (0, _react.useCallback)(function () {
    return (0, _utils.loadGoogleMapScript)(googleMapsScriptBaseUrl, googleMapsScriptUrl);
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);
  (0, _react.useEffect)(function () {
    var config = _objectSpread(_objectSpread({}, options), {}, {
      fields: fields,
      types: types,
      bounds: bounds
    });

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    if (autocompleteRef.current || !inputRef.current || !_utils.isBrowser) return;
    if (ref && !ref.current) ref.current = inputRef.current;

    var handleAutoComplete = function handleAutoComplete() {
      if (typeof google === "undefined") return console.error("Google has not been found. Make sure your provide apiKey prop.");
      if (!google.maps.places) return console.error("Google maps places API must be loaded.");
      if (!inputRef.current instanceof HTMLInputElement) return console.error("Input ref must be HTMLInputElement.");
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, config);
      event.current = autocompleteRef.current.addListener("place_changed", function () {
        if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
          onPlaceSelected(autocompleteRef.current.getPlace(), inputRef.current, autocompleteRef.current);
        }
      });
    };

    if (apiKey) {
      handleLoadScript().then(function () {
        return handleAutoComplete();
      });
    } else {
      handleAutoComplete();
    }

    return function () {
      return event.current ? event.current.remove() : undefined;
    };
  }, []); // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445

  (0, _react.useEffect)(function () {
    if (_utils.isBrowser && window.MutationObserver && inputRef.current && inputRef.current instanceof HTMLInputElement) {
      observerHack.current = new MutationObserver(function () {
        observerHack.current.disconnect();
        inputRef.current.autocomplete = inputAutocompleteValue;
      });
      observerHack.current.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["autocomplete"]
      });
    }
  }, [inputAutocompleteValue]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setFields(fields);
    }
  }, [fields]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setBounds(bounds);
    }
  }, [bounds]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setOptions(options);
    }
  }, [options]);
  return {
    ref: inputRef,
    autocompleteRef: autocompleteRef
  };
}