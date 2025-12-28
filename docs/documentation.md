# SimpleWeather Dokumentáció

Ez a dokumentáció a React alapú időjárás-előrejelző alkalmazás felépítését, működési logikáját és technikai specifikációit tartalmazza.

## 1. Projekt célkitűzése
Az alkalmazás elsődleges célja, hogy egy letisztult, reszponzív felületen keresztül valós idejű meteorológiai adatokat szolgáltasson tetszőleges városokra vonatkozóan. A fejlesztés során kiemelt szempont volt az adatok perzisztenciája és a felhasználói élmény fokozása dinamikus stílusváltásokkal.

## 2. Technológiai architektúra
A szoftver a Create React App keretrendszerre épül, kihasználva a modern JavaScript (ES6+) lehetőségeit és a deklaratív UI-fejlesztés előnyeit.

### Főbb technológiák:
- Keretrendszer: React 18
- Állapotkezelés: React Hooks (useState, useEffect)
- API integráció: OpenWeatherMap Current Weather Data API
- Hálózati kérések: Fetch API
- Adattárolás: Web Storage API (LocalStorage)
- Megjelenítés: Standard CSS3 animációkkal és Flexbox elrendezéssel

## 3. Komponensstruktúra és felelősségi körök

### 3.1. App komponens (Gyökér)
Az alkalmazás központi egysége, amely a globális állapotokat kezeli. Felelős az API hívások koordinálásáért, a hibakezelésért és az adatok elosztásáért a gyermekkomponensek felé. Itt található a sötét mód és a napszak alapú vizuális megjelenítés logikája is.

### 3.2. SearchBar komponens
A felhasználói bevitelért felelős modul. Egy form-alapú keresőmezőt és az előzménygombokat tartalmazza. Az űrlap implementációja biztosítja az Enter billentyűvel történő adatbeküldést, miközben megelőzi az oldal nemkívánatos újratöltését.

### 3.3. WeatherCard komponens
A megjelenítő egység, amely az API-tól érkező JSON objektumot dolgozza fel. Feladata a numerikus adatok (például Celsius fok) és a vizuális elemek (ikonok) renderelése. Ebben a komponensben történik a hőmérsékleti értékek szerinti feltételes osztályozás is.

### 3.4. Loader komponens
A felhasználói visszajelzést biztosítja az aszinkron folyamatok alatt, javítva ezzel az alkalmazás érzékelt sebességét.

## 4. Funkcionális részletek

### 4.1. Adatlekérdezés és hibakezelés
A lekérdezések a fetchWeather függvényen keresztül futnak, amely kezeli az aszinkron műveletek minden fázisát (betöltés, siker, hiba). Az URL összeállítása során az encodeURIComponent függvény biztosítja, hogy a speciális karaktereket vagy szóközöket tartalmazó városnevek is érvényes kérést eredményezzenek.

### 4.2. Adatperzisztencia (LocalStorage)
Az alkalmazás három típusú adatot tárol a böngészőben:
- Utoljára megtekintett város: Az oldal betöltésekor automatikusan frissíti az adatokat.
- Keresési előzmények: Egy 5 elemre korlátozott tömb, amely a legutóbbi egyedi kereséseket tárolja.
- Téma beállítás: Megőrzi a felhasználó sötét/világos mód preferenciáját.

### 4.3. Dinamikus megjelenítés
A vizuális környezet két szinten változik:
- Napszak alapú: Az API válaszában érkező ikon kód alapján a háttér gradiense nappali vagy éjszakai állapotba vált.
- Felhasználói téma: A manuálisan váltható sötét mód felülírja a komponensek alapszíneit a gyökér elemhez rendelt CSS osztály segítségével.

## 5. Stílus és design rendszer
Az alkalmazás egységes vizuális nyelvvel rendelkezik. A gombok közös alapstílust kaptak, amely magában foglalja a lekerekített sarkokat, a betűtípust és az interaktív állapotokat (hover, active). A CSS animációk (float, pulse) segítik az ikonok életszerű megjelenítését.

## 6. Környezeti változók konfigurációja
A Create React App specifikációinak megfelelően az API kulcs elszigetelése a .env fájlban történik.
Változó neve: REACT_APP_WEATHER_API_KEY
Elérése a kódban: process.env.REACT_APP_WEATHER_API_KEY

## 7. Üzemeltetés és telepítés
A projekt futtatásához Node.js környezet szükséges. A függőségek telepítése után az npm start paranccsal indítható a fejlesztői szerver a 3000-es porton. Produkciós környezethez az npm run build parancs generálja az optimalizált állományokat.