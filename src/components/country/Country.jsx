import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@mui/material";

import styles from "./Country.module.css";

import { countries } from "../../api";

const Country = ({ handleCountryChange }) => {
  const [fetchedCountry, setfetchedCountry] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setfetchedCountry(await countries());
    };

    fetchCountries();
  }, [setfetchedCountry]);

  // console.log(fetchedCountry);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountry.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Country;
