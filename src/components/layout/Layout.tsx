import React from "react"

import { graphql, Link, useStaticQuery } from "gatsby"
import { LayoutProps } from "./Layout.types."
import "../../style/main.css"
import { Header } from "../header/Header"
import CookieConsent, { Cookies } from "react-cookie-consent"
import clsx from "clsx"

export const Layout = ({ children, className }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // @ts-ignore
  return (
    <>
      <div className="overflow-x-hidden" style={{minHeight: 'calc(100vh - 5rem)'}}>
        <Header/>
        <main className={clsx("pt-32 pb-32 px-8 lg:px-16 mx-auto ", className)}>{children}</main>

        <CookieConsent
          location="bottom"
          buttonText="Rozumiem"
          declineButtonText="Odmawiam"
          w="flex"
          buttonClasses="border border-teal-700 bg-teal-900 text-white block rounded-sm font-bold py-2 px-3 flex items-center"
          declineButtonClasses="border border-teal-700 text-teal-700 block rounded-sm font-bold py-2 px-3 flex items-center hover:bg-teal-900 hover:text-white ml-3"
          expires={150}
          onAccept={() => {
            Cookies.set("gatsby-gdpr-google-analytics", true)
          }}
          onDecline={() => {
            Cookies.set("gatsby-gdpr-google-analytics", false)
          }}
          enableDeclineButton
          flipButtons
          style={{
            background: "#ffffff",
            boxShadow: "rgba(0, 0, 0, 0.5) 0px 9px 10px 5px",
            borderTop: "1px solid rgb(203, 214, 226)",
            color: "#000"
          }}
          disableButtonStyles
        >
          Ta strona korzysta z plików cookies(ciasteczka). Są one wykorzystywane do zbierania anonimowych danych
          dotyczących wykorzystania strony.
          Dane są wykorzystywane do ulepszeń strony i śledzenia ilości wizyt użytkowników.

          Jeśli odmówisz dane na temat twoich wizyt nie będą zbierane. Jedno ciasteczko zostanie zapisane aby zapamiętać
          twoje preferencje.
        </CookieConsent>
      </div>
      <footer className='bg-teal-900 p-6 h-20'>
        <Link to='/polityka-prywatnosci' className='text-gray-200 text-sm'> Polityka prywatności</Link>
      </footer>
    </>
  )
}