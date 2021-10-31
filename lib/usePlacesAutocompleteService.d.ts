interface usePlacesAutocompleteServiceConfig {
  apiKey?: string;
  libraries?: string[];
  googleMapsScriptBaseUrl?: string;
  debounce?: number;
  options?: google.maps.places.AutocompletionRequest;
  sessionToken?: boolean;
  language?: string;
}

interface usePlacesAutocompleteServiceResponse {
  placesService: google.maps.places.PlacesService | null;
  autocompleteSessionToken:
    | google.maps.places.AutocompleteSessionToken
    | undefined;
  placesAutocompleteService: google.maps.places.AutocompleteService | null;
  placePredictions: google.maps.places.AutocompletePrediction[];
  isPlacePredictionsLoading: boolean;
  getPlacePredictions: (opt: google.maps.places.AutocompletionRequest) => void;
  queryPredictions: google.maps.places.QueryAutocompletePrediction[];
  isQueryPredictionsLoading: boolean;
  getQueryPredictions: (
    opt: google.maps.places.QueryAutocompletionRequest
  ) => void;
  refreshSessionToken: () => void;
}

export default function usePlacesAutocompleteService(
  options: usePlacesAutocompleteServiceConfig
): usePlacesAutocompleteServiceResponse;
