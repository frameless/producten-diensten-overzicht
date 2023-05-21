import { ZoekdienstService } from "./generated/pdc-search/index";
import { knownProducts } from "./vng";
import fs from "node:fs";
import upl from "./generated/UPL-key-value.json";
import gemeente from "./generated/owms/Gemeente.json";
import { convert } from "xmlbuilder2";
import axios from "axios";
import axiosRetry from "axios-retry";

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

const version = 1.2;
const operation = "searchRetrieve";
const xInfo1Accept = "any";
const xConnection = "sc";
const startRecord = 1;
const maximumRecords = 1000;
// const query = `authority=="Tilburg" and audience="ondernemer" and keyword="horeca"`;
// const query = `authority=="Tilburg"`;
// const query = `uniformeProductnaam=="identiteitskaart"`;
const uplURI = "http://standaarden.overheid.nl/owms/terms/identiteitskaart";
// const query = `resourceIdentifier=="${uplURI}"`;

false &&
  knownProducts.forEach((productId) => {
    const productName = upl[productId] || "";
    // TODO: Zoeken op `resourceIdentifier` van product
    const query = `uniformeProductnaam==${JSON.stringify(productName)}`;
    const filename = productId.replace(/[^\w-]/g, "-");
    const path = `./src/generated/per-product/${filename}.xml`;

    let data;
    if (fs.existsSync(path)) {
      data = Promise.resolve(fs.readFileSync(path));
      console.log(`From cache: ${path}`);
    } else {
      data = ZoekdienstService.zoekdienst({
        version,
        operation,
        xConnection,
        query,
        startRecord,
        maximumRecords,
        xInfo1Accept,
      }).then((data) => {
        fs.writeFileSync(path, String(data));
        return data;
      });
    }
  });

gemeente
  // .filter(({ prefLabel }) => prefLabel === `'s-Gravenhage`)
  .forEach(({ prefLabel }) => {
    // TODO: Zoeken op `resourceIdentifier` van gemeente
    const query = `authority==${JSON.stringify(prefLabel)}`;
    const filename = prefLabel.replace(/[^\w-]/g, "-");
    const path = `./src/generated/per-gemeente/${filename}.xml`;
    const jsonPath = `./src/generated/per-gemeente/${filename}.json`;

    let data;
    if (fs.existsSync(path)) {
      data = Promise.resolve(fs.readFileSync(path, { encoding: "utf8" }));
      console.log(`From cache: ${path}`);
    } else {
      data = ZoekdienstService.zoekdienst({
        version,
        operation,
        xConnection,
        query,
        startRecord,
        maximumRecords,
        xInfo1Accept,
      }).then((response) => {
        const xml = String(response);
        fs.writeFileSync(path, xml);
        return xml;
      });
    }
    data.then((xml) => {
      console.log(jsonPath);
      const json = convert(xml, { format: "object" }) as any;
      const data = (
        Array.isArray(json.searchRetrieveResponse?.records?.record)
          ? json.searchRetrieveResponse?.records?.record
          : []
      )
        .map(
          (record) =>
            record["recordData"]["gzd"]["originalData"][
              "overheidproduct:scproduct"
            ]["overheidproduct:meta"]
        )
        .map((metadata) => ({
          identifier:
            metadata["overheidproduct:owmskern"]["dcterms:identifier"]["$"],
          title: metadata["overheidproduct:owmskern"]["dcterms:title"]["$"],
          language:
            metadata["overheidproduct:owmskern"]["dcterms:language"]["$"],
          authority:
            metadata["overheidproduct:owmskern"]["overheid:authority"] &&
            metadata["overheidproduct:owmskern"]["overheid:authority"][
              "@resourceIdentifier"
            ],
          product:
            metadata["overheidproduct:scmeta"][
              "overheidproduct:uniformeProductnaam"
            ] &&
            metadata["overheidproduct:scmeta"][
              "overheidproduct:uniformeProductnaam"
            ]["@resourceIdentifier"],
        }));
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      return data;
    });
  });
