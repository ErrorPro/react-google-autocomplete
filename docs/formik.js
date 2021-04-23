import React from "react";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";

import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

export default function Formik() {
  const formik = useFormik({
    initialValues: {
      country: "",
      country2: "",
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
      form state: {JSON.stringify(formik.values)}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Coutnry</label>
        <TextField
          fullWidth
          color="secondary"
          variant="outlined"
          inputRef={ref}
          id="country"
          name="country"
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        <Autocomplete
          value={formik.values.country2}
          apiKey={process.env.REACT_APP_GOOGLE}
          onPlaceSelected={(place) =>
            formik.setFieldValue("country2", place.formatted_address)
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
