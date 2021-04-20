"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var GOOGLE_MAP_SCRIPT_BASE_URL = "https://maps.googleapis.com/maps/api/js";
var isBrowser = typeof window !== "undefined" && window.document;

function ReactGoogleAutocomplete(props) {
  var onPlaceSelected = props.onPlaceSelected,
      apiKey = props.apiKey,
      _props$inputAutocompl = props.inputAutocompleteValue,
      inputAutocompleteValue = _props$inputAutocompl === undefined ? "new-password" : _props$inputAutocompl,
      _props$options = props.options;
  _props$options = _props$options === undefined ? {} : _props$options;

  var _props$options$types = _props$options.types,
      types = _props$options$types === undefined ? ["(cities)"] : _props$options$types,
      componentRestrictions = _props$options.componentRestrictions,
      _props$options$fields = _props$options.fields,
      fields = _props$options$fields === undefined ? ["address_components", "geometry.location", "place_id", "formatted_address"] : _props$options$fields,
      bounds = _props$options.bounds,
      options = _objectWithoutProperties(_props$options, ["types", "componentRestrictions", "fields", "bounds"]),
      _props$googleMapsScri = props.googleMapsScriptBaseUrl,
      googleMapsScriptBaseUrl = _props$googleMapsScri === undefined ? GOOGLE_MAP_SCRIPT_BASE_URL : _props$googleMapsScri,
      refProp = props.refProp,
      autocompleteRef = props.autocompleteRef,
      rest = _objectWithoutProperties(props, ["onPlaceSelected", "apiKey", "inputAutocompleteValue", "options", "googleMapsScriptBaseUrl", "refProp", "autocompleteRef"]);

  var inputRef = (0, _react.useRef)(null);
  var event = (0, _react.useRef)(null);
  var autocomplete = (0, _react.useRef)(null);
  var googleMapsScript = (0, _react.useRef)(null);
  var observerHack = (0, _react.useRef)(null);
  var googleMapsScriptUrl = googleMapsScriptBaseUrl + "?key=" + apiKey + "&libraries=places";

  var handleLoadScript = (0, _react.useCallback)(function () {
    if (!isBrowser) return Promise.resolve();

    var _document$querySelect = document.querySelectorAll("script[src*=\"" + googleMapsScriptBaseUrl + "\""),
        _document$querySelect2 = _slicedToArray(_document$querySelect, 1),
        scriptElement = _document$querySelect2[0];

    if (scriptElement) {
      return new Promise(function (resolve) {
        // in case we already have a script on the page and it's loaded we resolve
        if (typeof google !== "undefined") return resolve();

        // otherwise we wait until it's loaded and resolve
        scriptElement.addEventListener("load", function () {
          return resolve();
        });
      });
    }

    googleMapsScript.current = document.createElement("script");
    googleMapsScript.current.src = googleMapsScriptUrl;

    document.body.appendChild(googleMapsScript.current);

    return new Promise(function (resolve) {
      googleMapsScript.current.addEventListener("load", function () {
        return resolve();
      });
    });
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);

  // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
  (0, _react.useEffect)(function () {
    if (isBrowser && window.MutationObserver && inputRef.current) {
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
    if (autocomplete.current) {
      autocomplete.current.setFields(fields);
    }
  }, [fields]);

  (0, _react.useEffect)(function () {
    if (autocomplete.current) {
      autocomplete.current.setBounds(bounds);
    }
  }, [bounds]);

  (0, _react.useEffect)(function () {
    if (autocomplete.current) {
      autocomplete.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);

  (0, _react.useEffect)(function () {
    if (autocomplete.current) {
      autocomplete.current.setOptions(options);
    }
  }, [options]);

  (0, _react.useEffect)(function () {
    var config = _extends({}, options, {
      types: types,
      bounds: bounds,
      componentRestrictions: componentRestrictions
    });

    if (autocomplete.current) return;

    var handleAutoComplete = function handleAutoComplete() {
      // eslint-disable-next-line no-undef
      autocomplete.current = new google.maps.places.Autocomplete(inputRef.current, config);

      if (autocompleteRef) autocompleteRef.current = autocomplete.current;

      event.current = autocomplete.current.addListener("place_changed", function () {
        if (onPlaceSelected && autocomplete && autocomplete.current) {
          onPlaceSelected(autocomplete.current.getPlace(), inputRef.current, autocomplete.current);
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
  }, [types, options, fields, componentRestrictions, apiKey, onPlaceSelected, handleLoadScript, autocompleteRef, bounds]);

  return _react2.default.createElement("input", _extends({
    ref: function ref(el) {
      inputRef.current = el;
      if (refProp) refProp.current = el;
    }
  }, rest));
}

ReactGoogleAutocomplete.propTypes = {
  apiKey: _propTypes2.default.string,
  ref: _propTypes2.default.oneOfType([
  // Either a function
  _propTypes2.default.func,
  // Or the instance of a DOM native element
  _propTypes2.default.shape({ current: _propTypes2.default.instanceOf(Element) })]),
  autocompleteRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.shape({
    current: _propTypes2.default.any
  })]),
  googleMapsScriptBaseUrl: _propTypes2.default.string,
  onPlaceSelected: _propTypes2.default.func,
  inputAutocompleteValue: _propTypes2.default.string,
  options: _propTypes2.default.shape({
    componentRestrictions: _propTypes2.default.object,
    bounds: _propTypes2.default.object,
    location: _propTypes2.default.object,
    offset: _propTypes2.default.number,
    origin: _propTypes2.default.object,
    radius: _propTypes2.default.number,
    sessionToken: _propTypes2.default.object,
    types: _propTypes2.default.arrayOf(_propTypes2.default.string)
  })
};

exports.default = (0, _react.forwardRef)(function (props, ref) {
  return _react2.default.createElement(ReactGoogleAutocomplete, _extends({}, props, { refProp: ref }));
});