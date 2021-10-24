import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import usePlacesWidget from "./usePlacesWidget";

function ReactGoogleAutocomplete(props) {
  const {
    onPlaceSelected,
    apiKey,
    libraries,
    inputAutocompleteValue,
    options,
    googleMapsScriptBaseUrl,
    refProp,
    language,
    ...rest
  } = props;

  const { ref } = usePlacesWidget({
    ref: refProp,
    googleMapsScriptBaseUrl,
    onPlaceSelected,
    apiKey,
    libraries,
    inputAutocompleteValue,
    options,
    language
  });

  return <input ref={ref} {...rest} />;
}

ReactGoogleAutocomplete.propTypes = {
  apiKey: PropTypes.string,
  libraries: PropTypes.arrayOf(PropTypes.string),
  ref: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or anything shaped { current: any }
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  googleMapsScriptBaseUrl: PropTypes.string,
  onPlaceSelected: PropTypes.func,
  inputAutocompleteValue: PropTypes.string,
  options: PropTypes.shape({
    componentRestrictions: PropTypes.object,
    bounds: PropTypes.object,
    location: PropTypes.object,
    offset: PropTypes.number,
    origin: PropTypes.object,
    radius: PropTypes.number,
    sessionToken: PropTypes.object,
    types: PropTypes.arrayOf(PropTypes.string),
  }),
  language: PropTypes.string,
};

export default forwardRef((props, ref) => (
  <ReactGoogleAutocomplete {...props} refProp={ref} />
));
