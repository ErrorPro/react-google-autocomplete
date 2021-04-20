import React, { FC, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Input } from "@material-ui/core";

import ReactGoogleAutocompleteComponent from "../index";

function App() {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [country, setCountry] = useState("us");

  return (
    <div className="App">
      <header className="App-header">
        <ReactGoogleAutocompleteComponent
          ref={inputRef}
          placeholder="Placeholder"
          autocompleteRef={autocompleteRef}
          apiKey={process.env.GOOGLE_API_KEY}
          onPlaceSelected={(selected) => console.log(selected)}
          inputAutocompleteValue="country"
        />
        <ReactGoogleAutocompleteComponent
          apiKey={process.env.GOOGLE_API_KEY}
          onPlaceSelected={(selected) => console.log(selected)}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country },
          }}
        />
        <ReactGoogleAutocompleteComponent
          apiKey={process.env.GOOGLE_API_KEY}
          onPlaceSelected={(selected) => console.log(selected)}
        />
        <select
          onChange={(v) => {
            setCountry(v.target.value);
          }}
        >
          <option key="1" value="us">
            Us
          </option>
          <option key="2" value="ru">
            Ru
          </option>
        </select>
        <Input
          color="secondary"
          inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
            <ReactGoogleAutocompleteComponent
              apiKey={process.env.GOOGLE_API_KEY}
              onPlaceSelected={(selected) => console.log(selected)}
              {...props}
            />
          )}
        />
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => console.log(autocompleteRef)}>Press me</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
