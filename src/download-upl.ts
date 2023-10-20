/* Download the "Uniforme Productnamenlijst (UPL)" */
import axios from "axios";
import axiosRetry from "axios-retry";
import fs from "node:fs";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    return error.response.status >= 500 && error.response.status < 600;
  },
});

const url = "https://standaarden.overheid.nl/owms/oquery/UPL-actueel.json";

interface UPLData {
  head: {
    vars: string[];
  };
  results: {
    bindings: {
      [index: string]: {
        "xml:lang"?: string;
        type: string;
        value: string;
      };
    }[];
  };
}

const simplifyUPL = (data: UPLData): { [index: string]: string } => {
  const map = {};
  return data.results.bindings.reduce((data, binding) => {
    return {
      ...data,
      [binding.URI.value]: binding.UniformeProductnaam.value,
    };
  }, map);
};

console.log(`Download UPL data from: ${url}`);
axios
  .request({
    url,
    headers: {
      "Accept-Type": "application/json",
    },
  })
  // .then((response) => response.json())
  .then((response) => response.data)
  .then((json) => {
    fs.writeFileSync(
      "./src/generated/UPL-actueel.json",
      JSON.stringify(json, null, 2)
    );
    fs.writeFileSync(
      "./src/generated/UPL-key-value.json",
      JSON.stringify(simplifyUPL(json as UPLData), null, 2)
    );
  });
