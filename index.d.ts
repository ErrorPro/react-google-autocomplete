import { HTMLProps } from "react";

export type OptionType = {
  componentRestrictions?: {};
  bounds?: {};
  location?: {};
  offset?: number;
  origin?: {};
  radius?: number;
  sessionToken?: {};
  types?: string[];
};

export interface ReactGoogleAutocompleteProps<T = { current: null }>
  extends HTMLProps<HTMLInputElement> {
  onPlaceSelected?: (
    places: Record<string, unknown>,
    ref: HTMLInputElement
  ) => void;
  inputAutocompleteValue?: string;
  options?: OptionType;
  apiKey?: string;
  autocompleteRef?: T;
}

export default function ReactGoogleAutocomplete(
  props: ReactGoogleAutocompleteProps
): JSX.Element;
