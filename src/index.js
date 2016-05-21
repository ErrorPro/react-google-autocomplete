import React, {PropTypes} from 'react';

export default class ReactGoogleAutocomplete extends React.Component {
  static propTypes = {
    onPlaceSelected: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, {
      types: ['(cities)'],
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
