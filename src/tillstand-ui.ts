// Dag 8: visa tillstånden i sidan.

import { tolkaVaderkod } from "./api";

// Skriver ut rätt sak i container beroende på tillstånd.
//   { typ: "laddar" }                 -> <p class="laddar" role="status">Laddar...</p>
//   { typ: "tomt" }                   -> <p class="tom">Inga rätter hittades.</p>
//   { typ: "fel", meddelande }        -> <div class="fel" role="alert"> med en <p> (texten "Något gick fel: " + meddelandet)
//                                        och en <button type="button" class="forsok-igen">Försök igen</button>.
//                                        Klick på knappen anropar alternativ.vidForsokIgen?.().
//   { typ: "klar", ... }              -> tömmer container och anropar alternativ.visaKlar?.(container, tillstand)
// Töm alltid container först (replaceChildren). Använd textContent, aldrig innerHTML.
export function visaTillstand<K extends { typ: "klar" }>(container: HTMLElement, tillstand: { typ: "laddar" } | { typ: "tomt" } | { typ: "fel"; meddelande: string } | K, alternativ: Partial<Alternativ<K>>): void {
  container.replaceChildren()
  const typ = tillstand.typ
  if (typ === "laddar") {
    const laddar = document.createElement("p")
    laddar.className = "laddar"
    laddar.role = "status"
    laddar.textContent = "Laddar..."
    container.append(laddar)
  } else if (typ === "tomt") {
    const tom = document.createElement("p")
    tom.className = "tom"
    tom.textContent = "Inga rätter hittades."
    container.append(tom)
  } else if (typ === "fel") {
    const fel = document.createElement("div")
    fel.className = "fel"
    fel.role = "alert"
    const meddelande = document.createElement("p")
    meddelande.textContent = `Något gick fel: ${tillstand.meddelande}`
    fel.append(meddelande)
    const knapp = document.createElement("button")
    knapp.className = "forsok-igen"
    knapp.textContent = "Försök igen"
    knapp.type = "button"
    knapp.addEventListener("click", () => {
      alternativ.vidForsokIgen?.()
    })
    fel.append(knapp)
    container.append(fel)
  } else {
    container.replaceChildren()
    alternativ.visaKlar?.(container, tillstand)
  }
  return container
}

// Skriver vädret i container som en <p class="vader-rad">, till exempel:
//   "Stockholm: 8.4 °C, mest klart eller molnigt, vind 14.2 km/h"
// vader är { temperatur, vindhastighet, kod }. Använd tolkaVaderkod.
export function visaVader(container: HTMLElement, stad: string, vader: Vader): void {
  container.replaceChildren()
  const weather = document.createElement("p")
  weather.className = "vader-rad"
  // weather.textContent = "Stockholm: 8.4 °C, mest klart eller molnigt, vind 14.2 km/h"
  weather.textContent = `${stad}: ${vader.temperatur} °C, ${tolkaVaderkod(vader.kod)}, vind ${vader.vindhastighet} km/h`
  container.append(weather)
  return container
}

