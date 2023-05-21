import { renderToStaticMarkup } from "react-dom/server";
import {
  Document,
  Heading1,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  TableHeaderCell,
  UnorderedListItem,
  UnorderedList,
  Link,
} from "@utrecht/component-library-react";
import gemeenten from "./generated/owms/Gemeente.json";
import React from "react";
import fs from "node:fs";
import { gemeentenProducten } from "./data";

const page = (
  <html lang="nl" dir="ltr">
    <head>
      <meta charSet="utf-8" />
      <title>Producten en Diensten in Nederlandse Gemeenten</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://unpkg.com/@utrecht/component-library-css/dist/index.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://unpkg.com/@utrecht/design-tokens/dist/root.css"
      />
    </head>
    <body>
      <Document>
        <Heading1>Producten en Diensten in Nederlandse Gemeenten</Heading1>
        <Table>
          <TableHeader>
            <TableHeaderCell>Gemeentenaam</TableHeaderCell>
            <TableHeaderCell className="utrecht-table__header-cell--numeric">
              Aantal producten
            </TableHeaderCell>
          </TableHeader>
          <TableBody>
            {gemeenten.map(({ prefLabel, resourceIdentifier }) => {
              const gemeenteData = gemeentenProducten.find(
                (gemeente) => gemeente.resourceIdentifier === resourceIdentifier
              );
              return (
                <TableRow key={resourceIdentifier}>
                  <TableHeaderCell>{prefLabel}</TableHeaderCell>
                  <TableCell className="utrecht-table__cell--numeric">
                    {gemeenteData ? gemeenteData.products?.length : 0}
                  </TableCell>
                  <TableCell>
                    <details>
                      <summary>
                        {gemeenteData ? gemeenteData.products?.length : 0}{" "}
                        producten
                      </summary>
                      <UnorderedList>
                        {gemeenteData.products.map((product) => (
                          <UnorderedListItem key={product.identifier}>
                            <Link
                              external
                              href={product.identifier}
                              lang={product.language || undefined}
                            >
                              {product.title}
                            </Link>
                          </UnorderedListItem>
                        ))}
                      </UnorderedList>
                    </details>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Document>
    </body>
  </html>
);

const html = `<!DOCTYPE html>
${renderToStaticMarkup(page)}
`;

fs.writeFileSync("./src/generated/index.html", html);
