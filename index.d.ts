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

export interface ReactGoogleAutocomplete<
  T = { current: null },
  B = { current: null }
> extends HTMLProps<HTMLInputElement> {
  onPlaceSelected?: (
    places: Record<string, unknown>,
    ref: HTMLInputElement
  ) => void;
  inputAutocompleteValue?: string;
  options?: OptionType;
  apiKey?: string;
  ref?: T;
  autocompleteRef?: B;
}
