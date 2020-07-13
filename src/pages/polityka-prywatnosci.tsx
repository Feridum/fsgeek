import { Layout } from "../components/layout/Layout"
import React from "react"


const BlogTags = () => {
  return (
    <Layout>
      <header className="post-header">
        <h1 className="post-title">Polityka prywatnosci</h1>
      </header>
      <article>
        <ol>
          <li><p>Serwis zbiera w sposób automatyczny tylko informacje zawarte w plikach cookies.</p></li>

          <li><p>Pliki (cookies) są plikami tekstowymi, które przechowywane są w urządzeniu końcowym użytkownika
            serwisu. Przeznaczone są do korzystania ze stron serwisu. Przede wszystkim zawierają nazwę strony
            internetowej swojego pochodzenia, swój unikalny numer, czas przechowywania na urządzeniu końcowym.</p></li>

          <li><p>Operator serwisu <a href="https://fsgeek.pl" target="_blank">FSGeek</a> jest podmiotem zamieszczającym
            na urządzeniu końcowym swojego użytkownika pliki cookies oraz mającym do nich dostęp.</p></li>

          <li><p>Operator serwisu wykorzystuje pliki (cookies) w celu:</p>

            <ul>
              <li>przygotowywania statystyk pomagających poznaniu preferencji i zachowań użytkowników, analiza tych
                statystyk jest anonimowa i umożliwia dostosowanie zawartości i wyglądu serwisu do panujących trendów,
                statystyki stosuje się też do oceny popularności strony;
              </li>
            </ul>
          </li>

          <li><p>Serwis stosuje dwa zasadnicze rodzaje plików (cookies) - sesyjne i stałe. Pliki sesyjne są tymczasowe,
            przechowuje się je do momentu opuszczenia strony serwisu (poprzez wejście na inną stronę, wylogowanie lub
            wyłączenie przeglądarki). Pliki stałe przechowywane są w urządzeniu końcowym użytkownika do czasu ich
            usunięcia przez użytkownika lub przez czas wynikający z ich ustawień.</p></li>

          <li><p>Użytkownik może w każdej chwili dokonać zmiany ustawień swojej przeglądarki, aby zablokować obsługę
            plików (cookies) lub każdorazowo uzyskiwać informacje o ich umieszczeniu w swoim urządzeniu. Inne dostępne
            opcje można sprawdzić w ustawieniach swojej przeglądarki internetowej. Należy pamiętać, że większość
            przeglądarek domyślnie jest ustawione na akceptację zapisu plików (cookies)w urządzeniu końcowym.</p></li>

          <li><p>Operator Serwisu informuje, że zmiany ustawień w przeglądarce internetowej użytkownika mogą ograniczyć
            dostęp do niektórych funkcji strony internetowej serwisu.</p></li>

          <li><p>Pliki (cookies) z których korzysta serwis (zamieszczane w urządzeniu końcowym użytkownika) mogą być
            udostępnione jego partnerom oraz współpracującym z nim reklamodawcą.</p></li>

          <li><p>Informacje dotyczące ustawień przeglądarek internetowych dostępne są w jej menu (pomoc) lub na stronie
            jej producenta.</p></li>

          <li><p>Bardziej szczegółowe informacje na temat plików (cookies) dostępne są na stronie
            (ciasteczka.org.pl)</p></li>
        </ol>
      </article>
    </Layout>
  )
}

export default BlogTags