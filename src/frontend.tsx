import { renderToStaticMarkup } from "react-dom/server";
import {
  Document,
  Heading1,
  Paragraph,
  OrderedListItem,
  Heading2,
  OrderedList,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  TableHeaderCell,
  UnorderedListItem,
  UnorderedList,
  Link,
  URLValue,
} from "@utrecht/component-library-react";
import gemeenten from "./generated/owms/Gemeente.json";
import React, { PropsWithChildren } from "react";
import fs from "node:fs";
import { gemeentenProducten } from "./data";

const PageWrapper = ({ children }: PropsWithChildren) => (
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
      <Document>{children}</Document>
    </body>
  </html>
);

const page = (
  <PageWrapper>
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
                    {gemeenteData ? gemeenteData.products?.length : 0} producten
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
  </PageWrapper>
);

const html = `<!DOCTYPE html>
${renderToStaticMarkup(page)}
`;

fs.writeFileSync("./dist/www/index.html", html);

const VariantA = ({
  contactFormURL,
  omgevingsloketURL = "https://www.omgevingsloket.nl/",
  berichtenboxBedrijvenURL = "https://www.berichtenbox.antwoordvoorbedrijven.nl/",
}) => (
  <>
    <Heading2>Artikel 2</Heading2>
    <OrderedList>
      <OrderedListItem>
        1. Voor het verzenden van berichten als bedoeld in artikel 2:13, eerste
        lid, van de Algemene wet bestuursrecht wordt het algemeen
        contactformulier dat wordt ontsloten op{" "}
        <URLValue>{contactFormURL}</URLValue> als kanaal aangewezen, met
        uitzondering van de berichten als bedoeld in het tweede en derde lid.
      </OrderedListItem>
      <OrderedListItem>
        2. Voor berichten die deel uitmaken van een procedure over een
        omgevingsvergunning wordt het Omgevingsloket (
        <URLValue>{omgevingsloketURL}</URLValue>) als kanaal aangewezen.
      </OrderedListItem>
      <OrderedListItem>
        3. Voor berichten die deel uitmaken van een procedure die valt onder de
        Dienstenwet wordt de Berichtenbox voor Bedrijven (
        <URLValue>{berichtenboxBedrijvenURL}</URLValue>) als kanaal aangewezen.
      </OrderedListItem>
    </OrderedList>
  </>
);

const VariantB = ({} = () => {});

const AanwijsbesluitVariantPage = ({ resourceIdentifier }) => {
  const gemeenteData = gemeentenProducten.find(
    (gemeente) => gemeente.resourceIdentifier === resourceIdentifier
  );
  return (
    <PageWrapper>
      <Heading1>
        MODEL AANWIJZINGSBESLUIT ELEKTRONISCHE KANALEN PUBLIEKE DIENSTVERLENING
        GEMEENTE
      </Heading1>
      <Paragraph>Onderwerp</Paragraph>
      <Paragraph>
        Het aanwijzingsbesluit elektronische kanalen publieke dienstverlening
        gemeente
      </Paragraph>

      <Paragraph>
        Het college van burgemeester en wethouders van de gemeente [invullen],
        gelet op artikel 2:13, tweede lid, van de Algemene wet bestuursrecht
        besluit:
      </Paragraph>

      <Heading2>Artikel 1</Heading2>
      <Paragraph>
        In dit besluit wordt verstaan onder kanaal: een aangewezen wijze van
        elektronisch verzenden van berichten als bedoeld in artikel 2:13, eerste
        lid, van de Algemene wet bestuursrecht.
      </Paragraph>

      <Paragraph>VARIANT B</Paragraph>
      <Heading2>Artikel 2</Heading2>
      <Paragraph>
        Voor het domein [invullen**] worden de volgende kanalen aangewezen die
        worden ontsloten op [invullen specifieke url voor dit domein]:{" "}
      </Paragraph>
      <OrderedList>
        <OrderedListItem>
          a. specifieke webformulieren voor [invullen opsomming typen berichten
          waarvoor een specifiek webformulier beschikbaar is];{" "}
        </OrderedListItem>
        <OrderedListItem>
          b. algemeen contactformulier x voor [invullen opsomming typen
          berichten waarvoor dit formulier kan worden gebruikt, bijvoorbeeld
          berichten waarbij digid wordt gevraagd];{" "}
        </OrderedListItem>
        <OrderedListItem>
          c. algemeen contactformulier y voor [invullen opsomming typen
          berichten waarvoor dit formulier kan worden gebruikt, bijvoorbeeld
          berichten waarbij e-herkenning wordt gevraagd];{" "}
        </OrderedListItem>
        <OrderedListItem>
          d. voor berichten die deel uitmaken van een procedure over een
          omgevingsvergunning wordt het Omgevingsloket als kanaal aangewezen;
        </OrderedListItem>
        <OrderedListItem>
          e. voor berichten die deel uitmaken van een procedure die valt onder
          de Dienstenwet wordt de Berichtenbox voor Bedrijven als kanaal
          aangewezen;*
        </OrderedListItem>
        <OrderedListItem>
          f. e-mail adres a@gemeentenaam voor [invullen opsomming typen
          berichten waarvoor dit kanaal kan worden gebruikt];
        </OrderedListItem>
        <OrderedListItem>
          g. e-mail adres b@gemeentenaam [ of contactformulier z] voor alle
          andere typen berichten binnen dit domein.
        </OrderedListItem>
      </OrderedList>

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
    </PageWrapper>
  );
};

// TODO: Generate one file for each gemeeente, not just for Amersfoort
const aanwijsHTML = `<!DOCTYPE html>
${renderToStaticMarkup(
  <AanwijsbesluitVariantPage resourceIdentifier="http://standaarden.overheid.nl/owms/terms/Amersfoort_(gemeente)" />
)}
`;

fs.writeFileSync("./dist/www/amersfoort.html", aanwijsHTML);
