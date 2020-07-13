import { Link } from "gatsby"
import { LeftIcon, RightIcon } from "../../icons"
import React from "react"
import { PageNavigationProps } from "./PageNavigation.types"


export const PageNavigation = ({ previousPage, nextPage }: PageNavigationProps) => {

  return (
    <div className="flex mt-10">
      {previousPage && <Link to={previousPage} className="mr-auto" title="Poprzednia strona">
        <button
          className="border border-teal-700 text-teal-700 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-teal-900 hover:text-white" aria-label="Poprzednia strona">
          <LeftIcon size={30} className='sm:mr-3'/>
          <span className='hidden sm:block'>Poprzednia strona</span>
        </button>
      </Link>}
      {nextPage && <Link to={nextPage} className="ml-auto" title="Następna strona">
        <button
          className="border border-teal-700 bg-teal-900 text-white block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" aria-label="Następna strona">
          <span className='hidden sm:block'>Następna strona</span>
          <RightIcon size={30} className='sm:ml-3'/>
        </button>
      </Link>}
    </div>
  )
}