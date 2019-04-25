## React google autocomplete

  This is a simple react component for working with google [autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)

## Install

`npm i react-google-autocomplete --save`

You also have to include google autocomplete link api in your app. Somewhere in index.html or somwhere else.

```html
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&libraries=places"></script>
```

## Example

```js
import Autocomplete from 'react-google-autocomplete';

<Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
    types={['(regions)']}
    componentRestrictions={{country: "ru"}}
/>
```

The component has one function called `onPlaceSelected`. The function gets invoked every time a user chooses location.
A `types` props means type of places in [google place API](https://developers.google.com/places/web-service/autocomplete#place_types). By default it uses (cities).
A [componentRestrictions](https://developers.google.com/maps/documentation/javascript/reference#ComponentRestrictions) prop by default is empty.
A [bounds](https://developers.google.com/maps/documentation/javascript/reference#AutocompleteOptions) prop by default is empty.
You also can pass any props you want to the final input. You can also set [fields](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult) prop if you need extra information, now it defaults to basic data in order to control expenses.

## Contribution

If you would like to see something in this library please create an issue and I will implement it as soon as possible.
