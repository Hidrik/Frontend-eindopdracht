# Applicatie Hidrik Landlust, Hogeschool Novi

## Inhoudsopgave

### - [Inleiding](#inleiding)
### - [H1. Gegevens](#H1)
### - [H2. Installatie instructies:](#H2)
### - [H3. Inloggegevens:](#H3)

## Inleiding <div id="inleiding"></div>
Hieronder enkele screenshots van de gemaakte pagina's met hun functionaliteiten.

#### Homepagina
Op de homepagina worden recepten weergegeven. Vanuit deze pagina kan gezocht worden naar recepten 
door ingrediënten in de zoekbalk in te voeren. Deze worden automatisch vertaald aan de hand van de gekozen
taal.
![](screenshots/Homepagina.png)

#### Boodschappenlijstpagina
Op deze pagina kan een boodschappenlijst gemaakt worden. Er kunnen extra regels toegevoegd worden door op het plusje te klikken.
De lijst geprint worden door op het printlogo te klikken.
![](screenshots/Boodschappenlijstpagina.png)

#### Koelkastpagina
Op deze pagina kunnen producten met de houdbaarheidsdatum ingevoerd worden. Vervolgens kunnen deze
producten aangevinkt worden en hiermee kan dan een recept gezocht worden.

Producten die bijna over datum zijn, worden weergegeven met oranje kleur, producten die over datum zijn met een rode kleur
en producten die nog langer houdbaar zijn, in de kleur paars.
![](screenshots/Koelkastpagina.png)

#### Profielpagina
In deze applicatie kunnen gebruikers registreren en een account aanmaken. Vervolgens kunnen ze inloggen.
Op hun profiel kunnen vervolgens aanpassingen aan het account gemaakt worden. Ook kan er gekozen worden tussen
een lichte en donkere weergave en in welke taal de applicatie moet staan.
![](screenshots/Profielpagina.png)

#### Overig
De login- en registratiepagina zijn geen screenshots van gemaakt aangezien deze functionaliteit algemeen bekend is.

## H1. Gegevens  <div id="H1"></div>
Hieronder de gegevens van de applicatie te vinden.

REACT_APP_API_KEY_SPOONACULAR=6cd3b6f079684676885686cd69de1adb
REACT_APP_FIREBASE_API_KEY=AIzaSyCmS7_XlRzf61dmKnk_ozxAlgRfhX4I4cc
REACT_APP_API_KEY_TRANSLATE=d3cbc559e36148bba2ebf046e9e3b833


Er mogen op de spoonacular API maar 150 requests per dag gedaan worden.
Op de translate API mogen er 2 miljoen tekens per dag vertaald worden.

## H2. Installatie instructies: <div id="H2"></div>
De installatie-instructies zijn hieronder te vinden.

### Stap 1: `npm install`

Eerst moeten de dependencies geïnstalleerd worden.
Doe dit door bovenstaande commando uit te voeren.

### Stap 2: `.env file moet gemaakt worden`

Vervolgens moet een .env file gemaakt worden, 
hierin moeten de api key van spoonacular en firebase geplaatst worden (zie hoofdstuk 1). 
Vervolgens moet er een build gedraaid worden om de .env file toe te voegen aan het project.

De variabelen namen van .env zijn te vinden in .env.dist

### Stap 3: `npm run build`

Bovenstaande commando moet uitgevoerd worden nadat er een .env file gemaakt is. 
Zo worden deze variabelen meegenomen in de code.

### Stap 4: `npm run start`

Start de applicatie met het bovenstaande commando.
Open [http://localhost:3000](http://localhost:3000) om de applicatie te bekijken.

Dit commando zal elke keer nadat het programma (de IDE) is afgesloten, opnieuw ingevoerd worden.

De pagina zal herladen als er aanpassingen gemaakt worden in de code.

## H3. Inloggegevens: <div id="H3"></div>

Bij de firebase backend kan ingelogd worden met de volgende gegevens:
- Login: hidriklandlustnovi@gmail.com
- Wachtwoord: HogeschoolNovi