import { Layout } from "../components/layout/Layout"
import { Meta } from "../components/Meta/Meta"
import { MetaTypes } from "../components/Meta/Meta.types"
import React from "react"



const Contact = () => {
  return (
    <Layout className='flex flex-col items-center'>
      <Meta type={MetaTypes.PAGE} url={'/kontakt'}/>
      <h4 className="text-6xl underline text-center text-blue-700"><a href="https://news.fsgeek.pl/">Dołącz do newslettera</a></h4>
      <h2 className="text-black font-bold text-2xl underline hover:text-teal-600 text-center"><a href='mailto:kontakt@fsgeek.pl'>📧 Lub napisz do mnie maila na kontakt@fsgeek.pl</a></h2>
      <a href='https://socialshub.net/FSGeek'>
      <button
        className="border border-teal-700 text-black block rounded-lg font-bold py-4 px-6 mt-6 flex items-center hover:bg-teal-500" aria-label="Następna strona">
        <span> 💻 Odwiedź mnie na innych portalach</span>
      </button>
      </a>
      <a href='https://socialshub.net/AleksanderPatschek'>
        <button
          className="border border-teal-700 block rounded-lg font-bold py-4 px-6 mt-6 flex items-center hover:bg-teal-500" aria-label="Następna strona">
          <span>🧑 Poznaj autora</span>
        </button>
      </a>
    </Layout>
  )
}

export default Contact