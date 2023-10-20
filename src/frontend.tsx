import { renderToStaticMarkup } from "react-dom/server";
import {
  Document,
  Heading1,
  Mark,
  URLValue,
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
  Article,
  PageContent,
  Page,
} from "@utrecht/component-library-react";
import gemeenten from "./generated/owms/Gemeente.json";
import React, { Fragment, PropsWithChildren } from "react";
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
      <style>{`.vng-rich-text {
        --utrecht-space-around: 1;
      }
      
      .no-list-style {
        list-style-type: none;
      }`}</style>
    </head>
    <body>
      <Document>
        <Page>
          <PageContent>{children}</PageContent>
        </Page>
      </Document>
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
      <Article className="vng-rich-text">
        <Heading1>
          MODEL AANWIJZINGSBESLUIT ELEKTRONISCHE KANALEN PUBLIEKE
          DIENSTVERLENING GEMEENTE
        </Heading1>
        <Paragraph>
          Variant B (Aanwijzing specifieke webformulieren en andere kanalen voor
          clustering van type berichten en restkanaal binnen domeinen,
          specifieke kanaalaanduiding voor bepaalde typen berichten daarbuiten)
        </Paragraph>
        <Heading2 id="artikel-2">
          Artikel 2 Aanwijzing kanalen domein {gemeenteData.resourceIdentifier}
        </Heading2>
        <OrderedList>
          {gemeenteData.products.map((product) => (
            <Fragment key={product.identifier}>
              <OrderedListItem>
                <Paragraph>
                  Voor berichten in het domein <Mark>{product.title}</Mark> die
                  de verzender uit eigen beweging indient, wordt voor elk van de
                  hierna genoemde onderwerpen het specifieke webformulier dat
                  wordt ontsloten op de gemeentelijke website aangewezen:
                  <br />
                </Paragraph>
                <OrderedList>
                  <OrderedListItem className="no-list-style">
                    a.
                    <Link
                      external
                      href={product.identifier}
                      lang={product.language || undefined}
                    >
                      <URLValue>{product.identifier}</URLValue>
                    </Link>
                  </OrderedListItem>
                </OrderedList>
              </OrderedListItem>
              <OrderedListItem>
                <Paragraph>
                  Voor berichten in het in het eerste lid genoemde domein die op
                  verzoek van de gemeente worden ingediend, wordt de in de
                  uitnodiging aangewezen elektronische wijze van verzenden als
                  kanaal gebruikt.
                </Paragraph>
              </OrderedListItem>
              <OrderedListItem>
                <Paragraph>
                  In afwijking van het eerste lid, wordt voor het indienen van
                  de volgende type berichten in dit domein {product.title} als
                  kanaal aangewezen:
                </Paragraph>
              </OrderedListItem>
            </Fragment>
          ))}
        </OrderedList>
        <Heading2 id="artikel-3">
          Artikel 3 Aanwijzing kanalen domein {gemeenteData.resourceIdentifier}
        </Heading2>
        <Paragraph>
          <br />
          <Mark>
            […(toevoegen van een of meer artikelen waarin de aanwijzing van
            kanalen voor het indienen van berichten in andere domeinen dan
            artikel 2 plaatsvindt. Hiervoor kan het stramien van artikel 2
            worden aangehouden.)]
          </Mark>
        </Paragraph>
        <Heading2 id="artikel-3a">
          Artikel <Mark>[…]</Mark> Kanaal bezwaarschriften en klachten{" "}
        </Heading2>
        <Paragraph>
          <Mark>
            [(de nummering van het artikel is afhankelijk van het aantal
            hiervoor opgenomen artikelen over de aanwijzing van kanalen in de
            betreffende domeinen)]
          </Mark>
        </Paragraph>
        <OrderedList>
          <OrderedListItem>
            <Paragraph>
              In afwijking van <Mark>[artikel […] OF [de artikelen […]]</Mark>,
              wordt voor het indienen van bezwaarschriften <Mark>[kanaal]</Mark>{" "}
              als kanaal aangewezen.
              <br />
            </Paragraph>
          </OrderedListItem>
          <OrderedListItem>
            <Paragraph>
              In afwijking van <Mark>[artikel […] OF [de artikelen […]]</Mark>,
              wordt voor het indienen van klachten <Mark>[kanaal]</Mark> als
              kanaal aangewezen.
            </Paragraph>
          </OrderedListItem>
        </OrderedList>
        <Heading2 id="artikel-3b">
          Artikel <Mark>[…]</Mark> Kanaal Omgevingswet{" "}
        </Heading2>
        <Paragraph>
          <Mark>
            [(de nummering van het artikel is afhankelijk van het aantal
            hiervoor opgenomen artikelen over de aanwijzing van kanalen in
            andere domeinen)]
          </Mark>
          <Mark>
            In afwijking van <Mark>[artikel […] OF [de artikelen [….]]</Mark>,
            wordt voor berichten die daartoe bij of krachtens de Omgevingswet
            zijn aangewezen het Omgevingsloket als bedoeld in{" "}
            <Mark>[(per 1 januari 2024:)]</Mark> artikel 20.21 van die wet als
            kanaal gebruikt.
          </Mark>
        </Paragraph>
        <Heading2 id="artikel-3c">
          Artikel <Mark>[…]</Mark> Kanaal Dienstenwet
        </Heading2>
        <Paragraph>
          In afwijking van <Mark>[artikel […] OF [de artikelen [….]]</Mark>,
          wordt voor berichten die deel uitmaken van een procedure of
          formaliteit die valt onder de Dienstenwet de Berichtenbox voor
          Bedrijven als bedoeld in artikel 5 van de Dienstenwet als kanaal
          aangewezen.
        </Paragraph>
      </Article>
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
