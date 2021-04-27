import React from "react";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";

import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

export default function Formik() {
  const formik = useFormik({
    initialValues: {
      country: "",
      countryAnother: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: (place) => {
      formik.setFieldValue("country", place.formatted_address);
    },
  });

  return (
    <div>
      Formik state: {JSON.stringify(formik.values)}
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <TextField
          fullWidth
          style={{ width: "250px", marginRight: "20px" }}
          color="secondary"
          variant="outlined"
          inputRef={ref}
          id="country"
          name="country"
          placeholder="Country"
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        <Autocomplete
          style={{ width: "250px" }}
          id="countryAnother"
          placeholder="countryAnother"
          value={formik.values.countryAnother}
          apiKey={process.env.REACT_APP_GOOGLE}
          onPlaceSelected={(place) =>
            formik.setFieldValue("countryAnother", place.formatted_address)
          }
          onChange={formik.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
