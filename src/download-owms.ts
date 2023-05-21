/* Download the "Uniforme Productnamenlijst (UPL)" */
import axios from "axios";
import fs from "node:fs";
import { basename } from "node:path";
import { convert } from "xmlbuilder2";

const ids = [
  "https://standaarden.overheid.nl/owms/terms/Doelgroep",
  "https://standaarden.overheid.nl/owms/terms/Informatietype",
  "https://standaarden.overheid.nl/owms/terms/KadastraleGemeente",
  "https://standaarden.overheid.nl/owms/terms/Koninkrijksdeel",
  "https://standaarden.overheid.nl/owms/terms/Rechtsgebied",
  "https://standaarden.overheid.nl/owms/terms/TaxonomieBeleidsagenda",
  "https://standaarden.overheid.nl/owms/terms/UniformeProductnaam",
  "https://standaarden.overheid.nl/owms/terms/VraagstructuurRijkThemaOndernemers",
  "https://standaarden.overheid.nl/owms/terms/Overheidsorganisatie",
  "https://standaarden.overheid.nl/owms/terms/Adviescollege",
  "https://standaarden.overheid.nl/owms/terms/Deelgemeente",
  "https://standaarden.overheid.nl/owms/terms/CaribischOpenbaarLichaam",
  "https://standaarden.overheid.nl/owms/terms/Dienst",
  "https://standaarden.overheid.nl/owms/terms/DienstAgentschapInstellingOfProject",
  "https://standaarden.overheid.nl/owms/terms/Gemeente",
  "https://standaarden.overheid.nl/owms/terms/HoogCollegeVanStaat",
  "https://standaarden.overheid.nl/owms/terms/Koepelorganisatie",
  "https://standaarden.overheid.nl/owms/terms/KoninklijkHuis",
  "https://standaarden.overheid.nl/owms/terms/Ministerie",
  "https://standaarden.overheid.nl/owms/terms/OpenbaarLichaamVoorBedrijfEnBeroep",
  "https://standaarden.overheid.nl/owms/terms/Politiekorps",
  "https://standaarden.overheid.nl/owms/terms/Provincie",
  "https://standaarden.overheid.nl/owms/terms/RechterlijkeMacht",
  "https://standaarden.overheid.nl/owms/terms/Regering",
  "https://standaarden.overheid.nl/owms/terms/RegionaalSamenwerkingsorgaan",
  "https://standaarden.overheid.nl/owms/terms/GGD",
  "https://standaarden.overheid.nl/owms/terms/Milieudienst",
  "https://standaarden.overheid.nl/owms/terms/Plusregio",
  "https://standaarden.overheid.nl/owms/terms/Recreatieschap",
  "https://standaarden.overheid.nl/owms/terms/SocialeDienst",
  "https://standaarden.overheid.nl/owms/terms/Veiligheidsregio",
  "https://standaarden.overheid.nl/owms/terms/Rijksinspectie",
  "https://standaarden.overheid.nl/owms/terms/StatenGeneraal",
  "https://standaarden.overheid.nl/owms/terms/TuchtrechtelijkeInstantie",
  "https://standaarden.overheid.nl/owms/terms/Waterschap",
  "https://standaarden.overheid.nl/owms/terms/ZelfstandigBestuursorgaan",
  "https://standaarden.overheid.nl/owms/terms/BestuursorgaanDeelgemeente",
  "https://standaarden.overheid.nl/owms/terms/BestuursorgaanGemeente",
  "https://standaarden.overheid.nl/owms/terms/BestuursorgaanMinisterie",
  "https://standaarden.overheid.nl/owms/terms/BestuursorgaanProvincie",
  "https://standaarden.overheid.nl/owms/terms/BestuursorgaanRegionaalSamenwerkingsorgaan",
  "https://standaarden.overheid.nl/owms/terms/BestuursorgaanWaterschap",
];

ids
  .map((id) => `${id}.xml`)
  .forEach((url) => {
    return axios
      .request({
        url,
        headers: {
          "Accept-Type": "application/xml",
        },
      })
      .then((response) => response.data)
      .then(
        (xml) => {
          const json = convert(xml, { format: "object" }) as any;
          const data = json.cv.value;
          const slug = basename(url, ".xml");
          fs.writeFileSync(
            `./src/generated/owms/${slug}.json`,
            JSON.stringify(data, null, 2)
          );
        },
        (err) => {
          console.error(`Could not process URL: ${url}`);
        }
      );
  });
