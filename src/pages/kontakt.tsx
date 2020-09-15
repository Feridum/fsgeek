import { Layout } from "../components/layout/Layout"
import { Meta } from "../components/Meta/Meta"
import { MetaTypes } from "../components/Meta/Meta.types"
import React from "react"



const Contact = () => {
  return (
    <Layout className='flex flex-col items-center'>
      <Meta type={MetaTypes.PAGE} url={'/tags'}/>
      <h2 className="text-black font-bold text-4xl underline hover:text-teal-600"><a href='mailto:blog@fsgeek.pl'>📧 Napisz do mnie maila</a></h2>
      <a href='https://socialshub.net/FSGeek'>
      <button
        className="border border-teal-700 text-black block rounded-lg font-bold py-4 px-6 mt-6 flex items-center hover:bg-teal-500" aria-label="Następna strona">
        <span className='hidden sm:block'> 💻 Odwiedź mnie na innych portalach</span>
      </button>
      </a>
      <a href='https://socialshub.net/AleksanderPatschek'>
        <button
          className="border border-teal-700 block rounded-lg font-bold py-4 px-6 mt-6 flex items-center hover:bg-teal-500" aria-label="Następna strona">
          <span className='hidden sm:block'>🧑 Poznaj autora</span>
        </button>
      </a>
    </Layout>
  )
}

export default Contact