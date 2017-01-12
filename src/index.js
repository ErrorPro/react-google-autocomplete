import React, {PropTypes} from 'react';

export default class ReactGoogleAutocomplete extends React.Component {
  static propTypes = {
    onPlaceSelected: PropTypes.func,
    types: PropTypes.array,
    componentRestrictions: PropTypes.object,
    bounds: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.autocomplete = null;
  }

  componentDidMount() {
    const { types=['(cities)'], componentRestrictions, bounds, } = this.props;
    const config = {
      types,
      bounds,
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, config);

    this.autocomplete.addListener('place_changed', this.onSelected.bind(this));
  }

  onSelected() {
    if (this.props.onPlaceSelected) {
      this.props.onPlaceSelected(this.autocomplete.getPlace());
    }
  }

  render() {
    const {onPlaceSelected, types, componentRestrictions, bounds, ...rest} = this.props;

    return (
      <div>
        <input
          ref="input"
          {...rest}
        />
      </div>
    );
  }
}

export class ReactCustomGoogleAutocomplete extends React.Component {
  static propTypes = {
    input: PropTypes.node.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.service = new google.maps.places.AutocompleteService();
  }

  onChange(e) {
    const { types=['(cities)'] } = this.props;

    if(e.target.value) {
      this.service.getPlacePredictions({input: e.target.value, types}, (predictions, status) => {
        if (status === 'OK' && predictions && predictions.length > 0) {
          this.props.onOpen(predictions);
            console.log(predictions);
        } else {
          this.props.onClose();
        }
      });
    } else {
      this.props.onClose();
    }
  }

	componentDidMount() {
    if (this.props.input.value) {
      this.placeService = new google.maps.places.PlacesService(this.refs.div);
      this.placeService.getDetails({placeId: this.props.input.value}, (e, status) => {
        if(status === 'OK') {
					this.refs.input.value = e.formatted_address;
        }
      });
    }
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.input,
          {
            ...this.props,
    			  ref: 'input',
            onChange: (e) => {
              this.onChange(e);
            },
          }
        )}
        <div ref="div"></div>
      </div>
    );
  }
}
