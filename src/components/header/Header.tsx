import React, { useState } from "react"
import clsx from "clsx"
import { Link } from "gatsby"
import { FacebookIcon, TwitterIcon } from "../../icons"

export const Header = () => {
  const [isMenuHidden, setHidden] = useState(true)

  return (
    <nav className="fixed w-full w-full flex flex-col lg:flex-row z-40">
      <div className="flex items-center lg:flex-shrink-0 text-white p-6 bg-teal-900 w-full lg:w-auto bg-opacity-100">
        <Link to='/' className="font-semibold text-xl tracking-tight">FSGeek</Link>

        <div className="ml-auto block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setHidden(hidden => !hidden)}
            name='Otwórz menu'
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={clsx("lg:flex-grow lg:flex lg:items-center lg:w-auto bg-transparent w-full lg:bg-teal-900 lg:h-auto", isMenuHidden && "h-0", !isMenuHidden && "h-auto")}>
        <div
          className={clsx("text-sm lg:flex-grow overflow-hidden transition-all ease-in-out duration-500 lg:flex lg:items-center", isMenuHidden && "w-0", !isMenuHidden && "w-full")}>
          <Link to='/' title='Strona główna'>
            <div
              className="block pt-4 pl-6 pb-4 lg:pt-0 lg:pb-0  text-gray-200 hover:text-white mr-4 bg-teal-900 w-4/5 lg:w-auto">
              Zobacz inne ciekawe posty
            </div>
          </Link>
          <Link to='/tags' title='Tagi'>
            <div
              className="block pt-4 pl-6 pb-4 lg:pt-0 lg:pb-0  text-gray-200 hover:text-white mr-4 bg-teal-900 w-4/5 lg:w-auto h-" >
              Tagi
            </div>
          </Link>
          <Link to='/kontakt' title='Tagi'>
            <div
              className="block pt-4 pl-6 pb-4 lg:pt-0 lg:pb-0  text-gray-200 hover:text-white mr-4 bg-teal-900 w-4/5 lg:w-auto h-" >
              Poznaj autora
            </div>
          </Link>

          <div className='flex flex-row lg:ml-auto pb-6 lg:pb-0 px-6 bg-teal-900 w-4/5 lg:w-auto'>
            <a href="https://www.facebook.com/fsgeekk"
               target="_blank" title="Otwórz fanpage" rel="noreferrer">
              <FacebookIcon size={20}/>
            </a>
            <a href="https://twitter.com/FSGeekk"
               target="_blank" title="Otwórz profil na Twitter" rel="noreferrer">
              <TwitterIcon size={20} className='ml-3'/>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}