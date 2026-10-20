# Dag 8 · fetch och tre tillstånd

*Modul 5, UI/UX & Frontendutveckling (JavaScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du hämtar **riktig data** med `fetch`: menyn från en JSON-fil och vädret från ett öppet API. Du kontrollerar svaret (`ok`, `status`), hanterar fel och visar tre tillstånd för användaren: *laddar*, *fel* (med en knapp för att försöka igen) och *tomt*. Du testar utan internet genom att skicka in en falsk `fetch`.

## Bakgrund

Igår övade du på en låtsasserver. Idag byter vi ut den mot `fetch`. Det svåra är inte att hämta data, det är allt som kan gå fel: nätet ligger nere, servern svarar med fel, svaret har ett annat format än du trodde. En sida som bara fungerar när allt går bra är inte färdig. Du bygger på samma café-sida som i förra veckans övningar: menyn kommer nu från `data/meny.json`, och ett väderkort visar vädret i vald stad.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code och starta *Live Server*.
3. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console (F12) efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
4. **Skicka upp** när du är klar: `git push`.
5. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass.

Filer som använder `import` fungerar bara när sidan öppnas med *Live Server*. Dubbelklickar du på en HTML-fil hamnar du på `file://` och får ett CORS-fel i Console.

## Uppgiften steg för steg

### Steg 1. Klona, starta och titta på sidan

Forka repot, kör `git clone`, öppna mappen i VS Code och starta Live Server på `index.html`. Sidan startar men visar bara "Laddar..." eller ingenting, eftersom `api.js` inte är skriven än. Öppna `data/meny.json` direkt i webbläsaren. Titta på hur JSON ser ut. Skillnader mot ett JavaScript-objekt?

### Steg 2. Läs tests.html och kör testerna

Starta Live Server på `tests.html`. De flesta tester är röda. Läs `tests.js` uppifrån: hur fungerar `falskFetch`? Varför ska vi testa med en falsk fetch istället för den riktiga? Skriv svaret i `docs/async-anteckningar.md` eller som kommentar.

### Steg 3. hamtaJson

Skriv `hamtaJson(url, fetchFn)` i `api.js`. Tre saker kan hända: nätet är nere (fetch kastar), servern svarar med fel (`ok` är `false`) eller allt går bra. Kom ihåg: `fetch` kastar inte fel för 404 eller 500, du måste själv kolla `svar.ok`. Kör testerna.

### Steg 4. hamtaMeny och hamtaVader

Skriv `hamtaMeny` (hämtar `data/meny.json`, kontrollerar att svaret är en lista) och `hamtaVader` (bygger url:en med koordinater, plockar ut `temperatur`, `vindhastighet` och `kod` ur `data.current`). Öppna Open-Meteo-url:en från README i webbläsaren och titta på det riktiga svaret först.

### Steg 5. tolkaVaderkod

Skriv `tolkaVaderkod` som översätter väderkoden (WMO) till svensk text. Tabellen finns i kommentaren i `api.js`. Det här är en vanlig ren funktion, enkel att testa.

### Steg 6. visaTillstand och visaVader

Öppna `tillstand-ui.js`. Skriv `visaTillstand` för de fyra tillstånden och `visaVader`. Använd `textContent`, aldrig `innerHTML`: felmeddelanden kan innehålla text du inte kontrollerar. Felrutan ska ha `role="alert"` och en knapp *Försök igen* som anropar `vidForsokIgen`.

### Steg 7. Koppla ihop i main.js

Gör TODO 1 till 3 i `main.js`. När de är klara ska menyn laddas med tillstånd, filtret fungera på den hämtade menyn och vädret hämtas när du väljer stad och trycker *Hämta väder*.

### Steg 8. Utsätt sidan för fel

Öppna DevTools, fliken *Network*. Prova: (1) *Offline* i listan *No throttling*, ladda om och se felet. (2) *Slow 3G*, ladda om och se *Laddar...*. (3) Ändra `"data/meny.json"` till `"data/finns-inte.json"` och se vad som händer. (4) Töm `meny.json` till `[]` och se *tomt*. Skriv i `docs/async-anteckningar.md` vad du såg i varje fall. Ändra tillbaka efteråt.

### Steg 9. Fördjupning (frivillig): reservdata

Sätt `ANVAND_RESERVDATA = true` i `main.js` och se att vädret fungerar utan internet (det läser `data/vader-stockholm.json`). Förklara varför det går att byta ut `fetch` på det sättet utan att ändra `hamtaVader`.

## Kontrollista: så vet du att du är klar

- [ ] Alla tester på `tests.html` är gröna.
- [ ] `index.html` visar menyn hämtad från `data/meny.json` (tio rätter) och vädret för vald stad.
- [ ] Du har sett alla tre tillstånden (laddar, fel, tomt) i webbläsaren med hjälp av DevTools.
- [ ] Knappen *Försök igen* fungerar när du simulerat ett fel.
- [ ] Du använder `textContent` och inte `innerHTML` i `tillstand-ui.js`.
- [ ] Du kan förklara varför `fetch` inte kastar fel för 404.
- [ ] Du har gjort minst fem commits.

## Tips om du fastnar

- Glömmer du `await` före `svar.json()` får du en promise istället för data.
- Sidan visar ingenting alls? Öppna Console. Ett rött fel som börjar med *Uncaught (in promise)* betyder att ett fel inte fångats.
- `fetch` fungerar bara via Live Server (`http://127.0.0.1`), inte om du dubbelklickar på `index.html` (`file://`).
- Vill du se hela svaret från Open-Meteo: öppna url:en direkt i webbläsaren, eller skriv `console.log(data)` i `hamtaVader`.
- Fastnar du på ett test: läs felmeddelandet. Det står vad testet förväntade sig och vad du returnerade.
- Fungerar inte Open-Meteo hemma eller på skolan? Sätt `ANVAND_RESERVDATA = true`. Då är det fortfarande en riktig övning i tillstånd.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Reflektion: Varför kastar `fetch` inte ett fel när servern svarar 404 eller 500? Vilka tre sorters fel kan uppstå när du hämtar data, och hur ser de olika ut för användaren?

## Vill du mer? (frivilligt)

- Lägg till en felhantering som skiljer på "nätet nere" och "servern svarade fel" i texten användaren ser.
- Lägg till en knapp som uppdaterar vädret var 30:e sekund (`setInterval`) och rensa timern korrekt.
- Använd `Promise.all` för att hämta menyn och vädret samtidigt vid sidstart, och visa tillstånd för varje för sig.
