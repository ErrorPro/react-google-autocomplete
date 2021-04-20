import React, { useRef, forwardRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const GOOGLE_MAP_SCRIPT_BASE_URL = "https://maps.googleapis.com/maps/api/js";
const isBrowser = typeof window !== "undefined" && window.document;

function ReactGoogleAutocomplete(props) {
  const {
    onPlaceSelected,
    apiKey,
    inputAutocompleteValue = "new-password",
    options: {
      types = ["(cities)"],
      componentRestrictions,
      fields = [
        "address_components",
        "geometry.location",
        "place_id",
        "formatted_address",
      ],
      bounds,
      ...options
    } = {},
    googleMapsScriptBaseUrl = GOOGLE_MAP_SCRIPT_BASE_URL,
    refProp,
    autocompleteRef,
    ...rest
  } = props;
  const inputRef = useRef(null);
  const event = useRef(null);
  const autocomplete = useRef(null);
  const googleMapsScript = useRef(null);
  const observerHack = useRef(null);
  const googleMapsScriptUrl = `${googleMapsScriptBaseUrl}?key=${apiKey}&libraries=places`;

  const handleLoadScript = useCallback(() => {
    if (!isBrowser) return Promise.resolve();

    const [scriptElement] = document.querySelectorAll(
      `script[src*="${googleMapsScriptBaseUrl}"`
    );

    if (scriptElement) {
      return new Promise((resolve) => {
        // in case we already have a script on the page and it's loaded we resolve
        if (typeof google !== "undefined") return resolve();

        // otherwise we wait until it's loaded and resolve
        scriptElement.addEventListener("load", () => resolve());
      });
    }

    googleMapsScript.current = document.createElement("script");
    googleMapsScript.current.src = googleMapsScriptUrl;

    document.body.appendChild(googleMapsScript.current);

    return new Promise((resolve) => {
      googleMapsScript.current.addEventListener("load", () => resolve());
    });
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);

  // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
  useEffect(() => {
    if (isBrowser && window.MutationObserver && inputRef.current) {
      observerHack.current = new MutationObserver(() => {
        observerHack.current.disconnect();

        inputRef.current.autocomplete = inputAutocompleteValue;
      });
      observerHack.current.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["autocomplete"],
      });
    }
  }, [inputAutocompleteValue]);

  useEffect(() => {
    if (autocomplete.current) {
      autocomplete.current.setFields(fields);
    }
  }, [fields]);

  useEffect(() => {
    if (autocomplete.current) {
      autocomplete.current.setBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    if (autocomplete.current) {
      autocomplete.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);

  useEffect(() => {
    if (autocomplete.current) {
      autocomplete.current.setOptions(options);
    }
  }, [options]);

  useEffect(() => {
    const config = {
      ...options,
      types,
      bounds,
      componentRestrictions,
    };

    if (autocomplete.current) return;

    const handleAutoComplete = () => {
      // eslint-disable-next-line no-undef
      autocomplete.current = new google.maps.places.Autocomplete(
        inputRef.current,
        config
      );

      if (autocompleteRef) autocompleteRef.current = autocomplete.current;

      event.current = autocomplete.current.addListener("place_changed", () => {
        if (onPlaceSelected && autocomplete && autocomplete.current) {
          onPlaceSelected(
            autocomplete.current.getPlace(),
            inputRef.current,
            autocomplete.current
          );
        }
      });
    };

    if (apiKey) {
      handleLoadScript().then(() => handleAutoComplete());
    } else {
      handleAutoComplete();
    }

    return () => (event.current ? event.current.remove() : undefined);
  }, [
    types,
    options,
    fields,
    componentRestrictions,
    apiKey,
    onPlaceSelected,
    handleLoadScript,
    autocompleteRef,
    bounds,
  ]);

  return (
    <input
      ref={(el) => {
        inputRef.current = el;
        if (refProp) refProp.current = el;
      }}
      {...rest}
    />
  );
}

ReactGoogleAutocomplete.propTypes = {
  apiKey: PropTypes.string,
  ref: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  autocompleteRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
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
};

export default forwardRef((props, ref) => (
  <ReactGoogleAutocomplete {...props} refProp={ref} />
));
