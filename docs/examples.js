import React, { FC, RefObject, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Input as AntInput } from "antd";
import "antd/dist/antd.css";
import { Input, TextField } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

function App() {
  const inputRef = useRef(null);
  const antInputRef = useRef(null);
  const [country, setCountry] = useState("us");
  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: (place) => console.log(place),
    inputAutocompleteValue: "country",
    options: {
      componentRestrictions: { country },
    },
  });
  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: (place) => console.log(place),
  });
  const { ref: antRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: (place) => {
      //@ts-ignore
      antInputRef.current.setValue(place?.formatted_address);
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <span style={{ color: "black" }}>Standard HTML</span>
        <Autocomplete
          style={{ width: "250px" }}
          ref={inputRef}
          apiKey={process.env.REACT_APP_GOOGLE}
          onPlaceSelected={(selected, a, c) => {
            console.log(selected);
          }}
          options={{
            types: ["geocode", "establishment"],
            componentRestrictions: { country },
          }}
          defaultValue="Moscow"
        />
        <select
          onChange={(v) => {
            setCountry(v.target.value);
          }}
          style={{ color: "black", display: "none" }}
        >
          <option key="1" value="us">
            Us
          </option>
          <option key="2" value="ru">
            Ru
          </option>
        </select>
        <div style={{ width: "250px" }}>
          <span style={{ color: "black" }}>Material UI</span>
          <Input
            fullWidth
            color="secondary"
            inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
              <AutocompleteComponent
                apiKey={process.env.REACT_APP_GOOGLE}
                {...props}
                onPlaceSelected={(selected) => console.log(selected)}
              />
            )}
          />
        </div>
        <div style={{ width: "250px", marginTop: "20px" }}>
          <span style={{ color: "black" }}>Material UI</span>
          <TextField
            fullWidth
            color="secondary"
            variant="outlined"
            inputRef={materialRef}
          />
        </div>
        <div style={{ width: "250px", marginTop: "20px" }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ color: "black" }}>Bootstrap</Form.Label>
              <Form.Control type="email" ref={bootstrapRef} />
            </Form.Group>
          </Form>
        </div>
        <div style={{ width: "250px", padding: "20px 0" }}>
          <span style={{ color: "black" }}>Ant Design</span>
          <AntInput
            ref={(c) => {
              antInputRef.current = c;
              if (c) antRef.current = c.input;
            }}
            size="large"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
