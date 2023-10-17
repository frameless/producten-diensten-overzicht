# Overzicht van producten en diensten bij Nederlandse gemeenten

## npm scripts

### `npm run build`

Download alle informatie uit APIs, en genereer alle pagina's.

### `build:openapi`

Genereer een TypeScript library om informatie op te vragen uit een REST API voor Samenwerkende Catalogi.

[Samenwerkende Catalogi](https://www.logius.nl/domeinen/interactie/samenwerkende-catalogi) is een dienst waarin de catalogus van producten van veel overheidsorganisaties is aangelegd. Met de Samenwerkende Catalogi API is het mogelijk om gemeentelijke producten en de bijbehorender URLs op te vragen.

De `lib/openapi.yaml` wordt op dit moment opgeslagen in GitHub. In de toekomst kunnen we misschien automatisch checken of er een nieuwere versie van de `openapi.yaml` beschikbaar is.

### `build:dir`

Maak directories aan zodat andere build scripts daarin files kunnen opslaan.

### `build:owms`

Download gegevens van de [Overheid.nl Web Metadata Standaard (OWMS)](https://standaarden.overheid.nl/owms/). OWMS heeft zogenaamde ["waardelijsten"](https://standaarden.overheid.nl/owms/4.0/doc/waardelijsten), waarin up-to-date gegevens van diverse overheidsorganisaties te vinden zijn. Je kunt bijvoorbeeld een lijst van alle gemeenten opvragen, met de unieke ID voor de gemeente (`resourceIdentifier`, een ID in de vorm van een URL) en het Nederlandse label van de organisatie.

De officiele lijst van gemeenten is een goede basis om voor elke gemeente verder informatie op te vragen, zoals via de Samenwerkende Catalogi API.

De gegevens worden gedownload van de website [standaarden.overheid.nl](https://standaarden.overheid.nl/) als XML, maar ze worden opgeslagen in `src/generated/owms/` als één JSON bestand per waardelijst. `src/generated/owms/Gemeenten.json` bevat bijvoorbeeld een lijst van alle gemeenten in Nederland. Let op de `endDate` en `startDate`, want rozen verwelken en gemeenten vergaan — sommige gemeenten in de lijst bestaan niet meer vanwege fusies op andere reorganisaties.

### `build:upl`

Download de gegevens van de Uniforme Productnamenlijst (UPL). UPL is een project om veelvoorkomende producten bij de Nederlandse overheid een ID te geven in de vorm van een URL. Bijvoorbeeld: `http://standaarden.overheid.nl/owms/terms/huisdierenpaspoort` is de ID waarmee je in andere APIs kunt opvragen of een organisatie dit product aanbiedt, en of er verdere gegevens beschikbaar zijn.

Veel producten bij gemeenten hebben nog geen officiele ID, voor die producten wordt `http://standaarden.overheid.nl/owms/terms/UPL-naam_nog_niet_beschikbaar` gebruikt.

De gegevens worden gedownload en opgeslagen in `src/generated/UPL-actueel.json`. De JSON wordt voor ons gemak geconverteerd naar een simpeler formaat in `src/generated/UPL-key-value.json`.

### `build:www`

Maak één grote overzichtspagina met alle producten en diensten van elke gemeente in Nederland, in `dist/www/index.html`.

Maakt ook één concept aanwijsbesluit voor één gemeente, in `dist/www/amersfoort.html`.

Als je alleen werkt aan de frontend, dan is het sneller om `npm run build:www` te gebruiken dan elke keer alles ook openieuw te downloaden met `npm run build`.
