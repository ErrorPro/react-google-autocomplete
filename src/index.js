import React from 'react';
import PropTypes from 'prop-types';

export default class ReactGoogleAutocomplete extends React.Component {
  static propTypes = {
    onPlaceSelected: PropTypes.func,
    types: PropTypes.arrayOf(PropTypes.string),
    componentRestrictions: PropTypes.object,
    bounds: PropTypes.object,
    fields: PropTypes.array,
    inputAutocompleteValue: PropTypes.string,
    options: PropTypes.shape({
      componentRestrictions: PropTypes.object,
      bounds: PropTypes.object,
      location: PropTypes.object,
      offset: PropTypes.number,
      origin: PropTypes.object,
      radius: PropTypes.number,
      sessionToken: PropTypes.object,
      types: PropTypes.arrayOf(PropTypes.string)
    }),
    apiKey: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.event = null;
  }

  componentDidMount() {
    // TODO: only take options as configuration object, remove config props from the components props.
    const {
      types = ['(cities)'],
      componentRestrictions,
      bounds,
      apiKey,
      fields = [
        'address_components',
        'geometry.location',
        'place_id',
        'formatted_address'
      ],
      options = {}
    } = this.props;
    const config = {
      ...options,
      types,
      bounds,
      fields
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    this.disableAutofill();

    const handleAutoComplete = () => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.refs.input,
        config
      );

      this.event = this.autocomplete.addListener(
        'place_changed',
        this.onSelected.bind(this)
      );
    };

    if (apiKey) {
      this.handleLoadScript().then(() => handleAutoComplete());
    } else {
      handleAutoComplete();
    }
  }

  disableAutofill() {
    // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
    if (window.MutationObserver) {
      const observerHack = new MutationObserver(() => {
        observerHack.disconnect();
        if (this.refs && this.refs.input) {
          this.refs.input.autocomplete = this.props.inputAutocompleteValue || 'new-password';
        }
      });
      observerHack.observe(this.refs.input, {
        attributes: true,
        attributeFilter: ['autocomplete']
      });
    }
  }

  componentWillUnmount() {
    if (this.event) this.event.remove();
  }

  onSelected() {
    if (this.props.onPlaceSelected && this.autocomplete) {
      this.props.onPlaceSelected(this.autocomplete.getPlace(), this.refs.input);
    }
  }

  handleLoadScript = () => {
    const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&libraries=places`;

    // Check if script exists already
    if (
      document.querySelectorAll(`script[src="${googleMapsScriptUrl}"]`).length >
      0
    ) {
      return Promise.resolve();
    }

    this.googleMapsScript = document.createElement('script');
    this.googleMapsScript.src = googleMapsScriptUrl;

    document.body.appendChild(this.googleMapsScript);

    return new Promise((resolve) => {
      this.googleMapsScript.addEventListener('load', () => resolve());
    });
  };

  render() {
    const {
      onPlaceSelected,
      types,
      componentRestrictions,
      bounds,
      options,
      apiKey,
      ...rest
    } = this.props;

    return <input ref="input" {...rest} />;
  }
}

export class ReactCustomGoogleAutocomplete extends React.Component {
  static propTypes = {
    input: PropTypes.node.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.service = new google.maps.places.AutocompleteService();
  }

  onChange(e) {
    const { types = ['(cities)'] } = this.props;

    if (e.target.value) {
      this.service.getPlacePredictions(
        { input: e.target.value, types },
        (predictions, status) => {
          if (status === 'OK' && predictions && predictions.length > 0) {
            this.props.onOpen(predictions);
          } else {
            this.props.onClose();
          }
        }
      );
    } else {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if (this.props.input.value) {
      this.placeService = new google.maps.places.PlacesService(this.refs.div);
      this.placeService.getDetails(
        { placeId: this.props.input.value },
        (e, status) => {
          if (status === 'OK') {
            this.refs.input.value = e.formatted_address;
          }
        }
      );
    }
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.input, {
          ...this.props,
          ref: 'input',
          onChange: e => {
            this.onChange(e);
          }
        })}
        <div ref="div" />
      </div>
    );
  }
}
