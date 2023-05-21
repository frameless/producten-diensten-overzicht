import gemeente from "./generated/owms/Gemeente.json";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const getProductPath = (resourceIdentifier) => {
  const prefLabel = basename(resourceIdentifier);
  const filename = prefLabel.replace(/[^\w-]/g, "-");
  return `./src/generated/per-gemeente/${filename}.json`;
};

export const gemeentenProducten = gemeente.map(
  ({ prefLabel, resourceIdentifier }) => ({
    prefLabel,
    resourceIdentifier,
    products: JSON.parse(
      readFileSync(getProductPath(prefLabel), { encoding: "utf8" })
    ),
  })
);
