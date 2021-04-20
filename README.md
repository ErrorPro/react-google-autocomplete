![](/docs/example.gif)

![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/index.js?compression=gzip&label=gzip)
![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/index.js?compression=brotli&label=brotli)
![](https://badgen.net/npm/dm/react-google-autocomplete?labelColor=49516F&color=8994BC)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://GitHub.com/ErrorPro/react-google-autocomplete/master/LICENSE)

## React google autocomplete

This is a simple react component for working with google [autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)

## Install

`npm i react-google-autocomplete --save`

or

`yarn add react-google-autocomplete`

<hr>

As of version 1.2.4, you can now pass an `apiKey` prop to automatically load the Google maps scripts. The api key can be found in your [google cloud console.](https://developers.google.com/maps/documentation/javascript/get-api-key)

```js
<AutoComplete
  apiKey={YOUR_GOOGLE_MAPS_API_KEY}
  onPlaceSelected={(place) => console.log(place)}
/>
```

Alternatively if not passing the `apiKey` prop, you can include google autocomplete link api in your app. Somewhere in index.html or somewhere else. More info [here](https://developers.google.com/maps/documentation/places/web-service/autocomplete)

```html
<script
  type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&libraries=places"
></script>
```

## Props

- `apiKey`: pass to automatically load the Google maps scripts. The api key can be found in your [google cloud console.](https://developers.google.com/maps/documentation/javascript/get-api-key)

- `ref`: [React ref](https://reactjs.org/docs/hooks-reference.html#useref) to be assigned the underlying text input ref.

- `autocompleteRef`: [React ref](https://reactjs.org/docs/hooks-reference.html#useref) to be assigned the [google autocomplete instance](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete).

- `onPlaceSelected: (place: `[PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)`, inputRef, autocompleteRef) => void`: The function gets invoked every time a user chooses location.

- `options`: [Google autocomplete options.](https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions)

  - `options.types`: By default it uses (cities).
  - `options.fields`: By default it uses `address_components`, `geometry.location`, `place_id`, `formatted_address`.

- `inputAutocompleteValue`: Autocomplete value to be set to the underlying input.

- `googleMapsScriptBaseUrl`: Provide custom google maps url. By default `https://maps.googleapis.com/maps/api/js`

- `defaultValue` prop is used for setting up the default value e.g `defaultValue={'Amsterdam'}`.

You can pass any prop specified for the hmtl [input tag](https://www.w3schools.com/tags/tag_input.asp). You can also set [options.fields](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult) prop if you need extra information, now it defaults to basic data in order to control expenses.

## Examples

### Simple autocomplete with options

```js
import Autocomplete from "react-google-autocomplete";

<Autocomplete
  apiKey={YOUR_GOOGLE_MAPS_API_KEY}
  style={{ width: "90%" }}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
  options={{
    types: ["(regions)"],
    componentRestrictions: { country: "ru" },
  }}
  defaultValue="Amsterdam"
/>;
```

### Passing refs

```js
import Autocomplete from "react-google-autocomplete";

const inputRef = useRef(null);

useEffect(() => {
  // focus on mount
  inputRef.current.focus()
}, [])

<Autocomplete
  ref={inputRef}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
/>;

```

### Getting access to the google autocomplete instance

```js
import Autocomplete from "react-google-autocomplete";

const autocompleteRef = useRef(null);

<Autocomplete
  autocompleteRef={autocompleteRef}
  onPlaceSelected={(place, inputRef, theSameAutocompletRef) => {
    console.log(place);
  }}
/>;

<button onClick={() => autocompleteRef.current.getPlace()}>Read place</button>;
```

### Typescript

We are planning on adding full support for TS and Flow in the later releases.

```ts
import Autocomplete, {
  ReactGoogleAutocomplete,
} from "react-google-autocomplete";

const AutocompleteTS: FC<ReactGoogleAutocomplete> = Autocomplete as FC<ReactGoogleAutocomplete>;

<AutocompleteTS apiKey="123" />;
```

More examples(dynamic props, MaterialUI) how to use the lib could be found in `docs/examples.js`

### TODO

- Check that it fully works with SSR
- Add eslint config(base-airbnb)
- Rewrite the lib to TS and add flow support

## Contribution

If you would like to see something in this library please create an issue and I will implement it as soon as possible.
