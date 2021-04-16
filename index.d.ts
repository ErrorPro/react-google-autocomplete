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

export interface ReactGoogleAutocomplete {
  onPlaceSelected?: (
    places: Record<string, unknown>,
    ref: HTMLInputElement
  ) => void;
  types?: string[];
  componentRestrictions?: {};
  bounds?: {};
  fields?: string[];
  inputAutocompleteValue?: string;
  options?: OptionType;
  apiKey?: string;
  style?: CSSStyleDeclaration;
}
