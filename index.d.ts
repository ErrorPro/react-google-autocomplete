import { RefObject } from "react";

export interface ReactGoogleAutocompleteProps {
  onPlaceSelected?: (
    places: google.maps.places.PlaceResult,
    ref: RefObject<HTMLInputElement>,
    autocompleteRef: RefObject<google.maps.places.Autocomplete>
  ) => void;
  inputAutocompleteValue?: string;
  options?: google.maps.places.AutocompleteOptions;
  apiKey?: string;
}

export interface ReactGoogleAutocompleteInputProps
  extends ReactGoogleAutocompleteProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}

export default function ReactGoogleAutocomplete<T extends any>(
  props: ReactGoogleAutocompleteInputProps & T
): JSX.Element;

export function usePlacesWidget(
  props: ReactGoogleAutocompleteProps
): {
  ref: RefObject<null>;
  autocompleteRef: RefObject<google.maps.places.Autocomplete>;
};
