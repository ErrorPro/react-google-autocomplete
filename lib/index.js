'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactCustomGoogleAutocomplete = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactGoogleAutocomplete = function (_React$Component) {
  _inherits(ReactGoogleAutocomplete, _React$Component);

  function ReactGoogleAutocomplete(props) {
    _classCallCheck(this, ReactGoogleAutocomplete);

    var _this = _possibleConstructorReturn(this, (ReactGoogleAutocomplete.__proto__ || Object.getPrototypeOf(ReactGoogleAutocomplete)).call(this, props));

    _this.handleLoadScript = function () {
      var googleMapsScriptUrl = 'https://maps.googleapis.com/maps/api/js?key=' + _this.props.apiKey + '&libraries=places';

      // Check if script exists already
      if (document.querySelectorAll('script[src="' + googleMapsScriptUrl + '"]').length > 0) {
        return Promise.resolve();
      }

      _this.googleMapsScript = document.createElement('script');
      _this.googleMapsScript.src = googleMapsScriptUrl;

      document.body.appendChild(_this.googleMapsScript);

      return new Promise(function (resolve) {
        _this.googleMapsScript.addEventListener('load', function () {
          return resolve();
        });
      });
    };

    _this.autocomplete = null;
    _this.event = null;
    return _this;
  }

  _createClass(ReactGoogleAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // TODO: only take options as configuration object, remove config props from the components props.
      var _props = this.props,
          _props$types = _props.types,
          types = _props$types === undefined ? ['(cities)'] : _props$types,
          componentRestrictions = _props.componentRestrictions,
          bounds = _props.bounds,
          apiKey = _props.apiKey,
          _props$fields = _props.fields,
          fields = _props$fields === undefined ? ['address_components', 'geometry.location', 'place_id', 'formatted_address'] : _props$fields,
          _props$options = _props.options,
          options = _props$options === undefined ? {} : _props$options;

      var config = _extends({}, options, {
        types: types,
        bounds: bounds,
        fields: fields
      });

      if (componentRestrictions) {
        config.componentRestrictions = componentRestrictions;
      }

      this.disableAutofill();

      var handleAutoComplete = function handleAutoComplete() {
        _this2.autocomplete = new google.maps.places.Autocomplete(_this2.refs.input, config);

        _this2.event = _this2.autocomplete.addListener('place_changed', _this2.onSelected.bind(_this2));
      };

      if (apiKey) {
        this.handleLoadScript().then(function () {
          return handleAutoComplete();
        });
      } else {
        handleAutoComplete();
      }
    }
  }, {
    key: 'disableAutofill',
    value: function disableAutofill() {
      var _this3 = this;

      // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
      if (window.MutationObserver) {
        var observerHack = new MutationObserver(function () {
          observerHack.disconnect();
          if (_this3.refs && _this3.refs.input) {
            _this3.refs.input.autocomplete = _this3.props.inputAutocompleteValue || 'new-password';
          }
        });
        observerHack.observe(this.refs.input, {
          attributes: true,
          attributeFilter: ['autocomplete']
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.event) this.event.remove();
    }
  }, {
    key: 'onSelected',
    value: function onSelected() {
      if (this.props.onPlaceSelected && this.autocomplete) {
        this.props.onPlaceSelected(this.autocomplete.getPlace(), this.refs.input);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          onPlaceSelected = _props2.onPlaceSelected,
          types = _props2.types,
          componentRestrictions = _props2.componentRestrictions,
          bounds = _props2.bounds,
          options = _props2.options,
          apiKey = _props2.apiKey,
          rest = _objectWithoutProperties(_props2, ['onPlaceSelected', 'types', 'componentRestrictions', 'bounds', 'options', 'apiKey']);

      return _react2.default.createElement('input', _extends({ ref: 'input' }, rest));
    }
  }]);

  return ReactGoogleAutocomplete;
}(_react2.default.Component);

ReactGoogleAutocomplete.propTypes = {
  onPlaceSelected: _propTypes2.default.func,
  types: _propTypes2.default.arrayOf(_propTypes2.default.string),
  componentRestrictions: _propTypes2.default.object,
  bounds: _propTypes2.default.object,
  fields: _propTypes2.default.array,
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
  }),
  apiKey: _propTypes2.default.string
};
exports.default = ReactGoogleAutocomplete;

var ReactCustomGoogleAutocomplete = exports.ReactCustomGoogleAutocomplete = function (_React$Component2) {
  _inherits(ReactCustomGoogleAutocomplete, _React$Component2);

  function ReactCustomGoogleAutocomplete(props) {
    _classCallCheck(this, ReactCustomGoogleAutocomplete);

    var _this4 = _possibleConstructorReturn(this, (ReactCustomGoogleAutocomplete.__proto__ || Object.getPrototypeOf(ReactCustomGoogleAutocomplete)).call(this, props));

    _this4.service = new google.maps.places.AutocompleteService();
    return _this4;
  }

  _createClass(ReactCustomGoogleAutocomplete, [{
    key: 'onChange',
    value: function onChange(e) {
      var _this5 = this;

      var _props$types2 = this.props.types,
          types = _props$types2 === undefined ? ['(cities)'] : _props$types2;


      if (e.target.value) {
        this.service.getPlacePredictions({ input: e.target.value, types: types }, function (predictions, status) {
          if (status === 'OK' && predictions && predictions.length > 0) {
            _this5.props.onOpen(predictions);
          } else {
            _this5.props.onClose();
          }
        });
      } else {
        this.props.onClose();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      if (this.props.input.value) {
        this.placeService = new google.maps.places.PlacesService(this.refs.div);
        this.placeService.getDetails({ placeId: this.props.input.value }, function (e, status) {
          if (status === 'OK') {
            _this6.refs.input.value = e.formatted_address;
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.cloneElement(this.props.input, _extends({}, this.props, {
          ref: 'input',
          onChange: function onChange(e) {
            _this7.onChange(e);
          }
        })),
        _react2.default.createElement('div', { ref: 'div' })
      );
    }
  }]);

  return ReactCustomGoogleAutocomplete;
}(_react2.default.Component);

ReactCustomGoogleAutocomplete.propTypes = {
  input: _propTypes2.default.node.isRequired,
  onOpen: _propTypes2.default.func.isRequired,
  onClose: _propTypes2.default.func.isRequired
};