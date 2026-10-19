// Dag 8: koppla ihop allt.
// Du har en färdig sida från dag 5. Nu ska menyn och vädret hämtas med fetch, med tre tillstånd.
// Läs hela filen först. Gör sedan TODO-punkterna i ordning och testa i webbläsaren efter varje.
import { visaMeny, uppdateraRubrik, markeraDagensRatt, visaOrder } from "./ui.js";
import { billigast } from "./meny.js";
import { filtreraMeny } from "./filter.js";
import { kopplaFilter, kopplaLaggTill } from "./events.js";
import { laggTillIOrder, rensaOrder } from "./order.js";
import { hamtaMeny, hamtaVader } from "./api.js";
import { laddaMeny, laddaData } from "./tillstand.js";
import { visaTillstand, visaVader } from "./tillstand-ui.js";

// Sätt till true om väder-API:et inte fungerar (till exempel på skolans nät).
const ANVAND_RESERVDATA = false;

const STADER = {
  stockholm: { namn: "Stockholm", lat: 59.33, lon: 18.07 },
  goteborg: { namn: "Göteborg", lat: 57.71, lon: 11.97 },
  malmo: { namn: "Malmö", lat: 55.6, lon: 13.0 },
  kiruna: { namn: "Kiruna", lat: 67.86, lon: 20.23 },
};

const lista = document.querySelector("#meny-lista");
const rubrik = document.querySelector("#meny-rubrik");
const filterGrupp = document.querySelector("#filter");
const vaderForm = document.querySelector("#vader-form");
const stadVal = document.querySelector("#stad");
const vaderResultat = document.querySelector("#vader-resultat");

// Menyn finns inte från början längre. Den hämtas, och sparas här när den kommit.
let meny = [];
let aktivtFilter = "alla";

// ---- Menyn ----
function ritaMeny() {
  const ratter = filtreraMeny(meny, aktivtFilter);
  visaMeny(lista, ratter);
  uppdateraRubrik(rubrik, ratter.length);
  const lunch = ratter.filter((ratt) => ratt.kategori === "lunch");
  if (lunch.length > 0) {
    markeraDagensRatt(lista, billigast(lunch).id);
  }
}

// TODO 1: Skriv laddaMenyn(). Den ska anropa laddaMeny(() => hamtaMeny(), vidTillstand).
//   I vidTillstand anropar du visaTillstand(lista, tillstand, { vidForsokIgen, visaKlar }).
//   - vidForsokIgen: laddaMenyn själv (så att knappen "Försök igen" fungerar).
//   - visaKlar: spara tillstand.ratter i variabeln meny, anropa ritaMeny() och uppdatera ordern med visaOrder.
function laddaMenyn() {
}

kopplaFilter(filterGrupp, (filter) => {
  aktivtFilter = filter;
  if (meny.length > 0) {
    ritaMeny();
  }
});

// ---- Beställningen (som förut) ----
let order = [];
const orderRef = {
  lista: document.querySelector("#order-lista"),
  summa: document.querySelector("#order-summa"),
  tom: document.querySelector("#order-tom"),
};
kopplaLaggTill(lista, (id) => {
  order = laggTillIOrder(order, id);
  visaOrder(orderRef, order, meny);
});
document.querySelector("#rensa-order").addEventListener("click", () => {
  order = rensaOrder();
  visaOrder(orderRef, order, meny);
});

// ---- Vädret ----
// Vid reservläge byter vi ut fetch mot en funktion som läser en lokal fil.
const vaderFetch = ANVAND_RESERVDATA ? () => fetch("data/vader-stockholm.json") : fetch;

// TODO 2: Skriv laddaVader(). Hämta vald stad: STADER[stadVal.value].
//   Anropa laddaData(() => hamtaVader(stad.lat, stad.lon, vaderFetch), vidTillstand).
//   I vidTillstand: visaTillstand(vaderResultat, tillstand, { vidForsokIgen: laddaVader, visaKlar }).
//   visaKlar ska anropa visaVader(container, stad.namn, tillstand.data).
function laddaVader() {
}

// TODO 3: Lyssna på submit på vaderForm. Anropa preventDefault och sedan laddaVader().

// ---- Start ----
visaOrder(orderRef, order, meny);
laddaMenyn();
laddaVader();
