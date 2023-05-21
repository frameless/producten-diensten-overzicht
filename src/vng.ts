import upl from "./generated/UPL-key-value.json";

const productNames = [
  "akte van de burgerlijke stand",
  "akte van de burgerlijke stand buitenland",
  "bewijs van in leven zijn (attestatie de vita) ",
  "bewijs van nederlanderschap",
  "uittreksel Registratie niet ingezeten behandelen",
  "uittreksel Registratie niet ingezeten behandelen Engelstalig",
  "verklaring omtrent gedrag (vog)",
  "brp-uittreksel",
  "naamgebruik verzoek aanduiding",
  "brp-geheimhoudingsverzoek",
  "protocoleringsgegevens BRP",
  "brp-wijzigingsverzoek",
  "uitnodiging buitenland / garantstelling",
  "geslachtswijzigingsaangifte",
  "adoptie aangifte",
  "doodgeboren kind aangifte",
  "erkenning kind",
  "erkenning ongeboren vrucht ",
  "geboorteaangifte",
  "naamskeuzeverklaring",
  "geregistreerd partnerschap omzetting in huwelijk",
  "huwelijk / geregistreerd partnerschapaangifte",
  "verklaring van huwelijksbevoegdheid",
  "overlijdensaangifte",
  "verlof tot begraven / cremeren ",
  "vervoersdocumenten stoffelijk overschot",
  "lijkvinding",
  "eerste inschrijving in nederland",
  "hervestiging",
  "registratie niet-ingezetene ",
  "wijziging persoonsgegevens RNI",
  "naturalisatie ",
  "identiteitskaart",
  "noodreisdocument",
  "paspoort",
  "paspoort tweede",
  "reisdocument vermissing",
  "zakenpaspoort",
  "vreemdelingenpaspoort",
  "vluchtelingenpaspoort",
  "rijbewijs aanvragen ",
  "rijbewijs ongeldig verklaren",
  "rijbewijs uitreiken",
  "rijbewijs registratie vermissing",
  "rijbewijs buitenlands omwisseling",
  "adresonderzoek",
  "briefadres",
  "verhuismelding",
  "verhuismelding",
  "ambtshalve verhuizing binnen Nederland",
  "ambtshalve verhuizing buitenland of emigratie ",
].map((str) => str.trim());

const transposed = Object.entries(upl).reduce(
  (obj, [uri, name]) => ({ ...obj, [name]: uri }),
  {}
);

const unknownProductNames = productNames.filter(
  (name) => !transposed.hasOwnProperty(name)
);

export const knownProducts = productNames
  .filter((name) => transposed.hasOwnProperty(name))
  .map((name) => transposed[name]);
