import React, { useState } from "react"
import clsx from "clsx"

export const Header = () => {
  const [isMenuHidden, setHidden] = useState(true)

  return (
    <nav className="fixed w-full w-full flex flex-col lg:flex-row">
      <div className="flex items-center lg:flex-shrink-0 text-white p-6 bg-teal-500 w-full lg:w-auto">
        <span className="font-semibold text-xl tracking-tight">FSGeek</span>

        <div className="ml-auto block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setHidden(hidden => !hidden)}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={clsx("lg:flex-grow lg:flex lg:items-center lg:w-auto bg-transparent w-full lg:bg-teal-500")}>
        <div className={clsx("text-sm lg:flex-grow overflow-hidden transition-all ease-in-out duration-500 lg:flex lg:items-center", isMenuHidden && "w-0", !isMenuHidden && "w-full")}>
          <a href="#responsive-header"
             className="block pt-4 pl-6 pb-4 lg:pt-0 lg:pb-0  text-teal-200 hover:text-white mr-4 bg-teal-500 w-4/5 lg:w-auto">
            Docs
          </a>
          <a href="#responsive-header"
             className="block pt-4 pl-6 pb-4 lg:pt-0 lg:pb-0  text-teal-200 hover:text-white mr-4 bg-teal-500 w-4/5 lg:w-auto">
            Docs
          </a>
          <a href="#responsive-header"
             className="block pt-4 pl-6 pb-4 lg:pt-0 lg:pb-0  text-teal-200 hover:text-white mr-4 bg-teal-500 w-4/5 lg:w-auto">
            Docs
          </a>
        </div>
      </div>
    </nav>
  )
}