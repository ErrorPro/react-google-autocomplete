## React google autocomplete

  This is a simple react component for working with google [autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete)

## Install

`npm i react-google-autocomplete --save`

You also have to include google autocomplete link api in your app. Somewhere in index.html or somwehrer else.

```
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&libraries=places"></script>
```

## Example

```
import Autocomplete from 'react-google-autocomplete';

<Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
/>
```

The component has one function called `onPlaceSelected`. The function gets invoked every time a user chooses location.
