import React, { useEffect, useRef, useCallback } from "react";

import { loadGoogleMapScript, isBrowser } from "./utils";
import { GOOGLE_MAP_SCRIPT_BASE_URL } from "./constants";

export default function usePlacesWidget(props) {
  const {
    ref,
    onPlaceSelected,
    apiKey,
    libraries = "places",
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
    language,
    onLoadFailed,
  } = props;
  const inputRef = useRef(null);
  const event = useRef(null);
  const autocompleteRef = useRef(null);
  const languageQueryParam = language ? `&language=${language}` : "";
  const googleMapsScriptUrl = `${googleMapsScriptBaseUrl}?libraries=${libraries}&key=${apiKey}${languageQueryParam}`;

  const handleLoadScript = useCallback(
    () => loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl),
    [googleMapsScriptBaseUrl, googleMapsScriptUrl]
  );

  useEffect(() => {
    const config = {
      ...options,
      fields,
      types,
      bounds,
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    if (autocompleteRef.current || !inputRef.current || !isBrowser) return;

    if (ref && !ref.current) ref.current = inputRef.current;

    const handleAutoComplete = () => {
      if (typeof google === "undefined")
        return console.error(
          "Google has not been found. Make sure your provide apiKey prop."
        );

      if (!google.maps?.places)
        return console.error("Google maps places API must be loaded.");

      if (!(inputRef.current instanceof HTMLInputElement))
        return console.error("Input ref must be HTMLInputElement.");

      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        config
      );

      if (autocompleteRef.current) {
        event.current = autocompleteRef.current.addListener(
          "place_changed",
          () => {
            if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
              onPlaceSelected(
                autocompleteRef.current.getPlace(),
                inputRef.current,
                autocompleteRef.current
              );
            }
          }
        );
      }
    };

    // Google only surfaces auth/quota failures (invalid key, disabled billing,
    // referrer not allowed, over quota) through the global gm_authFailure
    // callback. When the consumer opts in via onLoadFailed, chain any
    // pre-existing handler so we don't clobber it, and restore it on cleanup.
    const previousAuthFailure = isBrowser ? window.gm_authFailure : undefined;

    if (isBrowser && onLoadFailed) {
      window.gm_authFailure = (...args) => {
        if (typeof previousAuthFailure === "function")
          previousAuthFailure(...args);
        onLoadFailed(
          new Error(
            "Google Maps authentication failed. This may be caused by an invalid API key, disabled billing, referrer restrictions, or exceeded quota."
          )
        );
      };
    }

    if (apiKey) {
      handleLoadScript()
        .then(() => handleAutoComplete())
        // always attach a catch so a rejected load never becomes an unhandled
        // promise rejection; forward it to the consumer when they opted in
        .catch((error) => {
          if (onLoadFailed) onLoadFailed(error);
        });
    } else {
      handleAutoComplete();
    }

    return () => {
      if (event.current) event.current.remove();
      if (isBrowser && onLoadFailed) window.gm_authFailure = previousAuthFailure;
    };
  }, []);

  useEffect(() => {
    if (autocompleteRef.current && onPlaceSelected) {
      event.current = autocompleteRef.current.addListener("place_changed", function () {
        if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
          onPlaceSelected(autocompleteRef.current.getPlace(), inputRef.current, autocompleteRef.current);
        }
      });
    }
    return () => (event.current ? event.current.remove() : undefined);
  }, [onPlaceSelected]);

  // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
  useEffect(() => {
    // TODO find out why react 18(strict mode) hangs the page loading
    if (
      isBrowser &&
      window.MutationObserver &&
      inputRef.current &&
      inputRef.current instanceof HTMLInputElement
    ) {
      const observerHack = new MutationObserver(() => {
        observerHack.disconnect();

        if (inputRef.current) {
          inputRef.current.autocomplete = inputAutocompleteValue;
        }
      });
      observerHack.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["autocomplete"],
      });

      return () => {
        observerHack.disconnect(); // Cleanup
      };
    }
  }, [inputAutocompleteValue]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setFields(fields);
    }
  }, [fields]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setOptions(options);
    }
  }, [options]);

  return {
    ref: inputRef,
    autocompleteRef,
  };
}
