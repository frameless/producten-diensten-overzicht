/* Download the "Uniforme Productnamenlijst (UPL)" */
import axios from "axios";
import fs from "node:fs";

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
