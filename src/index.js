import React, {PropTypes} from 'react';

export class ReactGoogleAutocomplete extends React.Component {
  static propTypes = {
    onPlaceSelected: PropTypes.func,
    placeTypes: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, {
      types: this.props.placeTypes || ['(cities)']
    });

    this.autocomplete.addListener('place_changed', this.onSelected.bind(this));
  }

  onSelected() {
    if (this.props.onPlaceSelected) {
      this.props.onPlaceSelected(this.autocomplete.getPlace());
    }
  }

  render() {
    return (
      <div>
        <input
          ref="input"
          {...this.props}
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
    if(e.target.value) {
      this.service.getPlacePredictions({input: e.target.value, types: ['(cities)'],}, (predictions, status) => {
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
