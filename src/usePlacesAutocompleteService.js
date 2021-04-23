import { useEffect, useCallback, useRef, useState } from "react";
import debounceFn from "lodash.debounce";

import { loadGoogleMapScript } from "./utils";
import { GOOGLE_MAP_SCRIPT_BASE_URL } from "./constants";

export default function usePlacesAutocompleteService({
  apiKey,
  googleMapsScriptBaseUrl = GOOGLE_MAP_SCRIPT_BASE_URL,
  debounce = 300,
  options = {},
}) {
  const googleMapsScriptUrl = `${googleMapsScriptBaseUrl}?key=${apiKey}&libraries=places`;
  const [placePredictions, setPlacePredictions] = useState([]);
  const [isPlacePredsLoading, setIsPlacePredsLoading] = useState(false);
  const [placeInputValue, setPlaceInputValue] = useState(null);
  const [isQueryPredsLoading, setIsQueryPredsLoading] = useState(false);
  const [queryInputValue, setQueryInputValue] = useState(false);
  const [queryPredictions, setQueryPredictions] = useState([]);
  const googleAutocompleteService = useRef(null);
  const handleLoadScript = useCallback(
    () => loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl),
    [googleMapsScriptBaseUrl, googleMapsScriptUrl]
  );

  const debouncedPlacePredictions = useCallback(
    debounceFn((optionsArg) => {
      if (googleAutocompleteService.current && optionsArg.input)
        googleAutocompleteService.current.getPlacePredictions(
          {
            ...options,
            ...optionsArg,
          },
          (r) => {
            setIsPlacePredsLoading(false);
            setPlacePredictions(r || []);
          }
        );
    }, debounce),
    [debounce]
  );

  const debouncedQueryPredictions = useCallback(
    debounceFn((optionsArg) => {
      if (googleAutocompleteService.current && optionsArg.input)
        googleAutocompleteService.current.getQueryPredictions(
          {
            ...options,
            ...optionsArg,
          },
          (r) => {
            setIsQueryPredsLoading(false);
            setQueryPredictions(r || []);
          }
        );
    }, debounce),
    [debounce]
  );

  useEffect(() => {
    const buildService = () => {
      // eslint-disable-next-line no-undef
      if (!google)
        return console.error(
          "Google has not been found. Make sure your provide apiKey prop."
        );

      // eslint-disable-next-line no-undef
      googleAutocompleteService.current = new google.maps.places.AutocompleteService();
    };

    if (apiKey) {
      handleLoadScript().then(() => buildService());
    } else {
      buildService();
    }
  });

  return {
    placePredictions: placeInputValue ? placePredictions : [],
    isPlacePredictionsLoading: isPlacePredsLoading,
    getPlacePredictions: (opt) => {
      if (opt.input) {
        setPlaceInputValue(opt.input);
        setIsPlacePredsLoading(true);
        debouncedPlacePredictions(opt);

        return;
      }

      setPlacePredictions([]);
      setPlaceInputValue(null);
      debouncedPlacePredictions(opt);
      setIsPlacePredsLoading(false);
    },
    queryPredictions: queryInputValue ? queryPredictions : [],
    isQueryPredictionsLoading: isQueryPredsLoading,
    getQueryPredictions: (opt) => {
      if (opt.input) {
        setQueryInputValue(opt.input);
        setIsQueryPredsLoading(true);
        debouncedQueryPredictions(opt);

        return;
      }

      setQueryPredictions([]);
      setQueryInputValue(null);
      debouncedQueryPredictions(opt);
      setIsQueryPredsLoading(false);
    },
  };
}
