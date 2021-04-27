interface usePlacesAutocompleteServiceConfig {
  apiKey?: string;
  googleMapsScriptBaseUrl?: string;
  debounce?: number;
  options?: google.maps.places.QueryAutocompletionRequest;
}

interface usePlacesAutocompleteServiceResponse {
  placePredictions: google.maps.places.AutocompletePrediction[];
  isPlacePredictionsLoading: boolean;
  getPlacePredictions: (opt: google.maps.places.AutocompletionRequest) => void;
  queryPredictions: google.maps.places.QueryAutocompletePrediction[];
  isQueryPredictionsLoading: boolean;
  getQueryPredictions: (
    opt: google.maps.places.QueryAutocompletionRequest
  ) => void;
}

export default function usePlacesAutocompleteService(
  options: usePlacesAutocompleteServiceConfig
): usePlacesAutocompleteServiceResponse;
