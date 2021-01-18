import React from "react"

import { Layout } from "../components/layout/Layout"

const NotFoundPage = () => (
  <Layout>
    <h1 className="text-4xl">Upps - wygląda, że strona nie istnieje</h1>
    <h3 className="text-2xl">Ale zanim pójdziesz szukać innego artykułu to mam dla ciebie super ofertę - dołącz do newslettera i zdobądź dodatkową wiedzę do każdego posta i dodatkowe zadania do utrwalenia wiedzy</h3>

    <h4 className="text-6xl underline text-center text-blue-700"><a href="https://news.fsgeek.pl/">Dołącz do newslettera</a></h4>
  </Layout>
)

export default NotFoundPage
