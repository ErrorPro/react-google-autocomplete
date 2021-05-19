![](/docs/example.gif)

![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/ReactGoogleAutocomplete.js?compression=gzip&label=gzip)
![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/ReactGoogleAutocomplete.js?compression=brotli&label=brotli)
![](https://badgen.net/npm/dm/react-google-autocomplete)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://GitHub.com/ErrorPro/react-google-autocomplete/master/LICENSE)

## The package provides 3 tools for working with google places services:

1. [ReactGoogleAutocomplete](#reactgoogleautocomplete) is a simple html input component that provides functionality of the [google places widgets](https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions).
2. [usePlacesWidget](#useplaceswidget) is a react hook that provides the same functionality as `ReactGoogleAutocomplete` does but it does not create any dom elements. Instead, it gives you back a react ref which you can set to any input you want.
3. [usePlacesAutocompleteService](#useplacesautocompleteservice) is a more complex react hook. It uses [google places autocomplete service](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service) and it provides all the functionality to you as the returned value. In addition to that, you can set a `debounce` prop which will reduce the amount of requests users send to Google.

If you find this package helpful please give it a star because it hepls it grow and motivates us to build new features and support the old ones.

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
or
const { ref } = usePlacesWidget({
  apiKey: YOUR_GOOGLE_MAPS_API_KEY,
  onPlaceSelected: (place) => console.log(place)
})

<AnyInput ref={ref} />
```

Alternatively if not passing the `apiKey` prop, you can include google autocomplete link api in your app. Somewhere in index.html or somewhere else. More info [here](https://developers.google.com/maps/documentation/places/web-service/autocomplete)

```html
<script
  type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&libraries=places"
></script>
```

## ReactGoogleAutocomplete

This is a simple react component for working with google [autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)

```js
import Autocomplete from "react-google-autocomplete";

<Autocomplete
  apiKey={YOUR_GOOGLE_MAPS_API_KEY}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
/>;
```

### Props

- `apiKey`: pass to automatically load the Google maps scripts. The api key can be found in your [google cloud console.](https://developers.google.com/maps/documentation/javascript/get-api-key)

- `ref`: [React ref](https://reactjs.org/docs/hooks-reference.html#useref) to be assigned the underlying text input ref.

- `onPlaceSelected: (place: `[PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)`, inputRef, `[autocompleteRef](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete)`) => void`: The function gets invoked every time a user chooses location.

- `options`: [Google autocomplete options.](https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions)

  - `options.types`: By default it uses (cities).
  - `options.fields`: By default it uses `address_components`, `geometry.location`, `place_id`, `formatted_address`.

- `inputAutocompleteValue`: Autocomplete value to be set to the underlying input.

- `googleMapsScriptBaseUrl`: Provide custom google maps url. By default `https://maps.googleapis.com/maps/api/js`

- `defaultValue` prop is used for setting up the default value e.g `defaultValue={'Amsterdam'}`.

You can pass any prop specified for the hmtl [input tag](https://www.w3schools.com/tags/tag_input.asp). You can also set [options.fields](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult) prop if you need extra information, now it defaults to basic data in order to control expenses.

## usePlacesWidget

![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/usePlacesWidget.js?compression=brotli&label=brotli)
![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/usePlacesWidget.js?compression=gzip&label=gzip)

Is a hook that has a single config argument. It has exactly the same interface as ReactGoogleAutocomplete props. This hook is actually used in the ReactGoogleAutocomplete component.

```js
import { usePlacesWidget } from "react-google-autocomplete";

export default () => {
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey:YOUR_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
    }
  });

  return <AnyInput ref={ref} {...anyOtherProp}>
}
```

### Arguments

It has only one config argument which has propperties: `apiKey`, `ref`, `onPlaceSelected`, `options`, `inputAutocompleteValue`, `googleMapsScriptBaseUrl`. The same props described [here](#reactgoogleautocomplete)

## usePlacesAutocompleteService

![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/usePlacesAutocompleteService.js?compression=brotli&label=brotli)
![](https://img.badgesize.io/ErrorPro/react-google-autocomplete/master/lib/usePlacesAutocompleteService.js?compression=gzip&label=gzip)

This is an initial implementation of debounced google places autocomplete service. It gives you an option to reduce the amount of requests sent to google which reduce your costs. For the time being we decided to use `lodash.debounce` to save time and in the later versions we might write our own implementation of debounce with hooks. Because it uses lodash we also decided to not put it into the index library file so it lives in its own file and could be only imported by it.

```js
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default () => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.REACT_APP_GOOGLE,
    });

  return (
    <>
      <Input
        placeholder="Debounce 500 ms"
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
        }}
        loading={isPlacePredictionsLoading}
      />
      {placePredictions.map((item) => renderItem(item))}
    </>
  );
};
```

[example](/docs/debounce.js)

### Arguments

The hook has only one config argument.

- `config`:
  - `apiKey`: Google api key, otherwise google api has to be loaded manually.
  - `googleMapsScriptBaseUrl`: Provide custom google maps url. By default `https://maps.googleapis.com/maps/api/js`.
  - `debounce`: Number of milliseconds to accumulate responses for.
  - `options`: Default [options](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletionRequest) which will be passed to every request.
  - `sessionToken`: If true then a [session token](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken) will be attached to every request.

### Returned value

The hook returns an object with properties:

- `placesAutocompleteService`: Instance of [AutocompleteService](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteService)
- `placePredictions`: an array of [AutocompletePrediction](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteResponse)
- `isPlacePredictionsLoading`: sets to true when a `getPlacePredictions` request is being sent and not yet resolved.
- `getPlacePredictions: (opt: `[Options](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest)`): void`: a function which you call whenever you want to request places predictions. Takes one [argument](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteResponse).
- `queryPredictions`: an array of [QueryAutocompletePrediction](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletePrediction)
- `isQueryPredictionsLoading`: sets to true when `getQueryPredictions` request is being sent and not yet resolved.
- `getQueryPredictions: (opt: `[Options](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletionRequest)`): void`: a function which you call whenever you want to request query predictions. Takes one [argument](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#QueryAutocompletionRequest).

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

or

```js
import { usePlacesWidget } from "react-google-autocomplete";

export default () => {
  const { ref } = usePlacesWidget({
    apiKey: YOUR_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ru" },
    },
  });

  return <input ref={ref} style={{ width: "90%" }} defaultValue="Amsterdam" />;
};
```

### Getting access to the google autocomplete instance

```js
<Autocomplete
  onPlaceSelected={(place, inputRef, autocomplete) => {
    console.log(autocomplete);
  }}
/>
```

or

```js
const { ref, autocompleteRef } = usePlacesWidget({
  apiKey: YOUR_GOOGLE_MAPS_API_KEY,
  onPlaceSelected: (place) => {
    console.log(place);
  },
});
```

### More examples(dynamic props, MaterialUI, Ant, Bootstrap) could be found in [docs/examples.js](/docs/examples.js)

Formik example lives [here](/docs/formik.js)

Debounce example lives [here](/docs/debounce.js)

### Typescript

We are planning on rewriting the library with TS/Flow in the later releases but you can already use it with TypeScript bacause we use [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html).

### TODO

- Check that it fully works with SSR
- Add more UI libraries examples/supports
- Add eslint config(base-airbnb)
- Rewrite the lib to TS and add flow support
- Remove lodash and use own built-in solution for debouncing

## Contribution

If you would like to see something in this library please create an issue and I will implement it as soon as possible.
