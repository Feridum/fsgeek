import { Layout } from "../components/layout/Layout"
import { Meta } from "../components/Meta/Meta"
import { MetaTypes } from "../components/Meta/Meta.types"
import React from "react"



const Contact = () => {
  return (
    <Layout className='flex flex-col'>
      <Meta type={MetaTypes.PAGE} url={'/kontakt'}/>
      <p>Cześć 👋</p>
      <p>Nazywam się Olek. Zawodowo programuję od 2015 roku. Zajmuję się głównie JavaScript - front, backend i mobile. Uwielbiam efektywną pracę i lubię szukać sposobów na ułatwienie sobie pracy. Bardzo lubię też pomagać innym więc jak masz jakiś problem to napisz do mnie na maila lub odezwij się w na jednym z Social Mediów.</p>
      <p>Aktualnie uczę się do roli Architekta więc możesz się spodziewać więcej postów z tej tematyki.</p>
      <p>Miłego dnia i do usłyszenia</p>

      <p className="mt-4">PS.: Jeśli chcesz być na bieżąco to zerknij do newslettera. Najlepsze artykuły z minionego tygodnia</p>
      <h4 className="text-2xl underline text-center text-blue-700 mt-6"><a href="https://news.fsgeek.pl/">Dołącz do newslettera WebDev News</a></h4>
      
      <a href='https://links.fsgeek.pl'>
      <button
        className="border border-teal-700 text-black block rounded-lg font-bold py-4 px-6 mt-6 flex items-center hover:bg-teal-500" aria-label="Następna strona">
        <span> 💻 Odwiedź mnie na innych portalach</span>
      </button>
      </a>
      <h2 className="text-black font-bold text-2xl underline hover:text-teal-600 mt-4"><a href='mailto:kontakt@fsgeek.pl'>📧 Lub napisz do mnie maila na kontakt@fsgeek.pl</a></h2>
    </Layout>
  )
}

export default Contact