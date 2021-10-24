"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _usePlacesWidget2 = _interopRequireDefault(require("./usePlacesWidget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ReactGoogleAutocomplete(props) {
  var onPlaceSelected = props.onPlaceSelected,
      apiKey = props.apiKey,
      libraries = props.libraries,
      inputAutocompleteValue = props.inputAutocompleteValue,
      options = props.options,
      googleMapsScriptBaseUrl = props.googleMapsScriptBaseUrl,
      refProp = props.refProp,
      language = props.language,
      rest = _objectWithoutProperties(props, ["onPlaceSelected", "apiKey", "libraries", "inputAutocompleteValue", "options", "googleMapsScriptBaseUrl", "refProp", "language"]);

  var _usePlacesWidget = (0, _usePlacesWidget2.default)({
    ref: refProp,
    googleMapsScriptBaseUrl: googleMapsScriptBaseUrl,
    onPlaceSelected: onPlaceSelected,
    apiKey: apiKey,
    libraries: libraries,
    inputAutocompleteValue: inputAutocompleteValue,
    options: options,
    language: language
  }),
      ref = _usePlacesWidget.ref;

  return /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: ref
  }, rest));
}

ReactGoogleAutocomplete.propTypes = {
  apiKey: _propTypes.default.string,
  libraries: _propTypes.default.arrayOf(_propTypes.default.string),
  ref: _propTypes.default.oneOfType([// Either a function
  _propTypes.default.func, // Or anything shaped { current: any }
  _propTypes.default.shape({
    current: _propTypes.default.any
  })]),
  googleMapsScriptBaseUrl: _propTypes.default.string,
  onPlaceSelected: _propTypes.default.func,
  inputAutocompleteValue: _propTypes.default.string,
  options: _propTypes.default.shape({
    componentRestrictions: _propTypes.default.object,
    bounds: _propTypes.default.object,
    location: _propTypes.default.object,
    offset: _propTypes.default.number,
    origin: _propTypes.default.object,
    radius: _propTypes.default.number,
    sessionToken: _propTypes.default.object,
    types: _propTypes.default.arrayOf(_propTypes.default.string)
  }),
  language: _propTypes.default.string
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(ReactGoogleAutocomplete, _extends({}, props, {
    refProp: ref
  }));
});

exports.default = _default;