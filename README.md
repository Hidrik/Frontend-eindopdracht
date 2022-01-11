# Applicatie Hidrik Landlust, Hogeschool Novi

## Inhoudsopgave

#### - Inleiding
#### - H1. Gegevens
#### - H2. Installatie instructies:
#### - H3. Inloggegevens:

## Inleiding

Korte beschrijving van functionaliteiten en screenschots van de belangrijkste pagina's.

## H1. Gegevens 

REACT_APP_API_KEY_SPOONACULAR=6cd3b6f079684676885686cd69de1adb
REACT_APP_FIREBASE_API_KEY=AIzaSyCmS7_XlRzf61dmKnk_ozxAlgRfhX4I4cc
REACT_APP_API_KEY_TRANSLATE=d3cbc559e36148bba2ebf046e9e3b833


Er mogen op de spoonacular API maar 150 requests per dag gedaan worden.
Op de translate API mogen er 2 miljoen tekens per dag vertaald worden.

## H2. Installatie instructies:

### Stap 1: `.env file moet gemaakt worden`

Er moet een .env file gemaakt worden, 
hierin moeten de api key van spoonacular en firebase geplaatst worden (zie hoofdstuk 1). 
Vervolgens moet er een build gedraaid worden om de .env file toe te voegen aan het project.

De variabelen namen van .env zijn te vinden in .env.dist

### Stap 2: `npm install`

Eerst moeten de dependencies geïnstalleerd worden. 
Doe dit door bovenstaande commande uit te voeren.

### Stap 3: `npm run build`

Bovenstaande commando moet uitgevoerd worden nadat er een .env file gemaakt is.


### Stap 4: `npm run start`

Start de applicatie met het bovenstaande commando.
Open [http://localhost:3000](http://localhost:3000) om de applicatie te bekijken.

Dit commando zal elke keer nadat het programma is afgesloten, opnieuw ingevoerd worden.

De pagina zal herladen als er aanpassingen gedaan worden in de code.

## H3. Inloggegevens:

Bij de firebase backend kan ingelogd worden met de volgende gegevens:
- Login: hidriklandlustnovi@gmail.com
- Wachtwoord: HogeschoolNovi

Er is al een account aangemaakt, hiervan zijn de gegevens:
- Login: 
- Wachtwoord: 