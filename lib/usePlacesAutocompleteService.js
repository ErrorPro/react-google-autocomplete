"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePlacesAutocompleteService;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function usePlacesAutocompleteService(_ref) {
  var apiKey = _ref.apiKey,
      _ref$libraries = _ref.libraries,
      libraries = _ref$libraries === void 0 ? "places" : _ref$libraries,
      _ref$googleMapsScript = _ref.googleMapsScriptBaseUrl,
      googleMapsScriptBaseUrl = _ref$googleMapsScript === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _ref$googleMapsScript,
      _ref$debounce = _ref.debounce,
      debounce = _ref$debounce === void 0 ? 300 : _ref$debounce,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      sessionToken = _ref.sessionToken,
      language = _ref.language;
  var languageQueryParam = language ? "&language=".concat(language) : "";
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?key=").concat(apiKey, "&libraries=").concat(libraries).concat(languageQueryParam);

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      placePredictions = _useState2[0],
      setPlacePredictions = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPlacePredsLoading = _useState4[0],
      setIsPlacePredsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      placeInputValue = _useState6[0],
      setPlaceInputValue = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isQueryPredsLoading = _useState8[0],
      setIsQueryPredsLoading = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      queryInputValue = _useState10[0],
      setQueryInputValue = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      queryPredictions = _useState12[0],
      setQueryPredictions = _useState12[1];

  var placesAutocompleteService = (0, _react.useRef)(null);
  var placesService = (0, _react.useRef)(null);
  var autocompleteSession = (0, _react.useRef)(null);
  var handleLoadScript = (0, _react.useCallback)(function () {
    return (0, _utils.loadGoogleMapScript)(googleMapsScriptBaseUrl, googleMapsScriptUrl);
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);
  var debouncedPlacePredictions = (0, _react.useCallback)((0, _lodash.default)(function (optionsArg) {
    if (placesAutocompleteService.current && optionsArg.input) placesAutocompleteService.current.getPlacePredictions(_objectSpread(_objectSpread(_objectSpread({}, sessionToken && autocompleteSession.current ? {
      sessionToken: autocompleteSession.current
    } : {}), options), optionsArg), function (r) {
      setIsPlacePredsLoading(false);
      setPlacePredictions(r || []);
    });
  }, debounce), [debounce]);
  var debouncedQueryPredictions = (0, _react.useCallback)((0, _lodash.default)(function (optionsArg) {
    if (placesAutocompleteService.current && optionsArg.input) placesAutocompleteService.current.getQueryPredictions(_objectSpread(_objectSpread(_objectSpread({}, sessionToken && autocompleteSession.current ? {
      sessionToken: autocompleteSession.current
    } : {}), options), optionsArg), function (r) {
      setIsQueryPredsLoading(false);
      setQueryPredictions(r || []);
    });
  }, debounce), [debounce]);
  (0, _react.useEffect)(function () {
    if (!_utils.isBrowser) return;

    var buildService = function buildService() {
      // eslint-disable-next-line no-undef
      if (!google) return console.error("Google has not been found. Make sure your provide apiKey prop."); // eslint-disable-next-line no-undef

      placesAutocompleteService.current = new google.maps.places.AutocompleteService(); // eslint-disable-next-line no-undef

      placesService.current = new google.maps.places.PlacesService(document.createElement("div"));
      if (sessionToken) autocompleteSession.current = new google.maps.places.AutocompleteSessionToken();
    };

    if (apiKey) {
      handleLoadScript().then(function () {
        return buildService();
      });
    } else {
      buildService();
    }
  }, []);
  return {
    placesService: placesService.current,
    autocompleteSessionToken: autocompleteSession.current,
    placesAutocompleteService: placesAutocompleteService.current,
    placePredictions: placeInputValue ? placePredictions : [],
    isPlacePredictionsLoading: isPlacePredsLoading,
    getPlacePredictions: function getPlacePredictions(opt) {
      if (opt.input) {
        setPlaceInputValue(opt.input);
        setIsPlacePredsLoading(true);
        debouncedPlacePredictions(opt);
        return;
      }

      setPlacePredictions([]);
      setPlaceInputValue(null);
      debouncedPlacePredictions(opt);
      setIsPlacePredsLoading(false);
    },
    queryPredictions: queryInputValue ? queryPredictions : [],
    isQueryPredictionsLoading: isQueryPredsLoading,
    getQueryPredictions: function getQueryPredictions(opt) {
      if (opt.input) {
        setQueryInputValue(opt.input);
        setIsQueryPredsLoading(true);
        debouncedQueryPredictions(opt);
        return;
      }

      setQueryPredictions([]);
      setQueryInputValue(null);
      debouncedQueryPredictions(opt);
      setIsQueryPredsLoading(false);
    },
    refreshSessionToken: function refreshSessionToken() {
      autocompleteSession.current = new google.maps.places.AutocompleteSessionToken();
    }
  };
}