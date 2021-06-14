import { Layout } from "../components/layout/Layout"
import { Meta } from "../components/Meta/Meta"
import { MetaTypes } from "../components/Meta/Meta.types"
import React from "react"



const Opinion = () => {
  return (
    <Layout className='flex flex-col items-center'>
      <Meta type={MetaTypes.PAGE} url={'/opinia'}/>
      <h4 className="text-6xl underline text-center text-blue-700">Super! Dzięki za udzielenie opinii na temat maila.</h4>
      <h3 className="text-4xl text-blue-700 my-2">To pomaga mi rozwijać maile, które dostajesz.</h3>
      <h2 className="text-black font-bold text-2xl hover:text-teal-600 text-center">
        <a href='mailto:kontakt@fsgeek.pl'>📧 Jeśli mogę coś więcej dla Ciebie zrobić napisz na kontakt@fsgeek.pl</a>
      </h2>
    </Layout>
  )
}

export default Opinion