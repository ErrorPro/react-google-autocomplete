'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactCustomGoogleAutocomplete = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

    _this.autocomplete = null;
    return _this;
  }

  _createClass(ReactGoogleAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          _props$types = _props.types,
          types = _props$types === undefined ? ['(cities)'] : _props$types,
          componentRestrictions = _props.componentRestrictions,
          bounds = _props.bounds;

      var config = {
        types: types,
        bounds: bounds
      };

      if (componentRestrictions) {
        config.componentRestrictions = componentRestrictions;
      }

      this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, config);

      this.autocomplete.addListener('place_changed', this.onSelected.bind(this));
    }
  }, {
    key: 'onSelected',
    value: function onSelected() {
      if (this.props.onPlaceSelected) {
        this.props.onPlaceSelected(this.autocomplete.getPlace());
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
          rest = _objectWithoutProperties(_props2, ['onPlaceSelected', 'types', 'componentRestrictions', 'bounds']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', _extends({
          ref: 'input'
        }, rest))
      );
    }
  }]);

  return ReactGoogleAutocomplete;
}(_react2.default.Component);

ReactGoogleAutocomplete.propTypes = {
  onPlaceSelected: _react.PropTypes.func,
  types: _react.PropTypes.array,
  componentRestrictions: _react.PropTypes.object,
  bounds: _react.PropTypes.object
};
exports.default = ReactGoogleAutocomplete;

var ReactCustomGoogleAutocomplete = exports.ReactCustomGoogleAutocomplete = function (_React$Component2) {
  _inherits(ReactCustomGoogleAutocomplete, _React$Component2);

  function ReactCustomGoogleAutocomplete(props) {
    _classCallCheck(this, ReactCustomGoogleAutocomplete);

    var _this2 = _possibleConstructorReturn(this, (ReactCustomGoogleAutocomplete.__proto__ || Object.getPrototypeOf(ReactCustomGoogleAutocomplete)).call(this, props));

    _this2.service = new google.maps.places.AutocompleteService();
    return _this2;
  }

  _createClass(ReactCustomGoogleAutocomplete, [{
    key: 'onChange',
    value: function onChange(e) {
      var _this3 = this;

      var _props$types2 = this.props.types,
          types = _props$types2 === undefined ? ['(cities)'] : _props$types2;


      if (e.target.value) {
        this.service.getPlacePredictions({ input: e.target.value, types: types }, function (predictions, status) {
          if (status === 'OK' && predictions && predictions.length > 0) {
            _this3.props.onOpen(predictions);
            console.log(predictions);
          } else {
            _this3.props.onClose();
          }
        });
      } else {
        this.props.onClose();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      if (this.props.input.value) {
        this.placeService = new google.maps.places.PlacesService(this.refs.div);
        this.placeService.getDetails({ placeId: this.props.input.value }, function (e, status) {
          if (status === 'OK') {
            _this4.refs.input.value = e.formatted_address;
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.cloneElement(this.props.input, _extends({}, this.props, {
          ref: 'input',
          onChange: function onChange(e) {
            _this5.onChange(e);
          }
        })),
        _react2.default.createElement('div', { ref: 'div' })
      );
    }
  }]);

  return ReactCustomGoogleAutocomplete;
}(_react2.default.Component);

ReactCustomGoogleAutocomplete.propTypes = {
  input: _react.PropTypes.node.isRequired,
  onOpen: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired
};
