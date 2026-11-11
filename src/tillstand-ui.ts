// Dag 8: visa tillstånden i sidan.

// Skriver ut rätt sak i container beroende på tillstånd.
//   { typ: "laddar" }                 -> <p class="laddar" role="status">Laddar...</p>
//   { typ: "tomt" }                   -> <p class="tom">Inga rätter hittades.</p>
//   { typ: "fel", meddelande }        -> <div class="fel" role="alert"> med en <p> (texten "Något gick fel: " + meddelandet)
//                                        och en <button type="button" class="forsok-igen">Försök igen</button>.
//                                        Klick på knappen anropar alternativ.vidForsokIgen?.().
//   { typ: "klar", ... }              -> tömmer container och anropar alternativ.visaKlar?.(container, tillstand)
// Töm alltid container först (replaceChildren). Använd textContent, aldrig innerHTML.
export function visaTillstand<K extends { typ: "klar" }>(container: HTMLElement, tillstand: { typ: "laddar" } | { typ: "tomt" } | { typ: "fel"; meddelande: string } | K, alternativ: Partial<Alternativ<K>>): void {
  // TODO
}

// Skriver vädret i container som en <p class="vader-rad">, till exempel:
//   "Stockholm: 8.4 °C, mest klart eller molnigt, vind 14.2 km/h"
// vader är { temperatur, vindhastighet, kod }. Använd tolkaVaderkod.
export function visaVader(container: HTMLElement, stad: string, vader: Vader): void {
  // TODO
}
