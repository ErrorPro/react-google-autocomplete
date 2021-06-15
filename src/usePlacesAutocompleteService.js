import { useEffect, useCallback, useRef, useState } from "react";
import debounceFn from "lodash.debounce";

import { isBrowser, loadGoogleMapScript } from "./utils";

export default function usePlacesAutocompleteService({
  apiKey,
  debounce = 300,
  options = {},
  sessionToken,
  language,
}) {
  const [placePredictions, setPlacePredictions] = useState([]);
  const [isPlacePredsLoading, setIsPlacePredsLoading] = useState(false);
  const [placeInputValue, setPlaceInputValue] = useState(null);
  const [isQueryPredsLoading, setIsQueryPredsLoading] = useState(false);
  const [queryInputValue, setQueryInputValue] = useState(false);
  const [queryPredictions, setQueryPredictions] = useState([]);
  const placesAutocompleteService = useRef(null);
  const placesService = useRef(null);
  const autocompleteSession = useRef(null);
  const handleLoadScript = useCallback(
    () =>
      loadGoogleMapScript({
        apiKey,
        version: "weekly",
        libraries: ["places"],
        language,
      }),
    [apiKey, language]
  );

  const debouncedPlacePredictions = useCallback(
    debounceFn((optionsArg) => {
      if (placesAutocompleteService.current && optionsArg.input)
        placesAutocompleteService.current.getPlacePredictions(
          {
            ...(sessionToken && autocompleteSession.current
              ? { sessionToken: autocompleteSession.current }
              : {}),
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
      if (placesAutocompleteService.current && optionsArg.input)
        placesAutocompleteService.current.getQueryPredictions(
          {
            ...(sessionToken && autocompleteSession.current
              ? { sessionToken: autocompleteSession.current }
              : {}),
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
    if (!isBrowser) return;

    const buildService = (service) => {
      console.log(service.maps.places, "service.maps.places");
      console.log(service.maps, "service.maps");

      // eslint-disable-next-line no-undef
      placesAutocompleteService.current = new (
        service || google
      ).maps.places.AutocompleteService();

      // eslint-disable-next-line no-undef
      placesService.current = new (service || google).maps.places.PlacesService(
        document.createElement("div")
      );

      if (sessionToken)
        autocompleteSession.current = new (
          service || google
        ).maps.places.AutocompleteSessionToken();
    };

    if (apiKey) {
      handleLoadScript().then(buildService);
    } else {
      buildService();
    }
  }, []);

  return {
    placesService: placesService.current,
    autocompleteSessionToken: autocompleteSession.current,
    placesAutocompleteService: placesAutocompleteService.current,
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
