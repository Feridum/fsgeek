import React from "react"

import { graphql, Link, useStaticQuery } from "gatsby"
import { LayoutProps } from "./Layout.types."
import "../../style/main.css"
import { Header } from "../header/Header"
import CookieConsent, { Cookies } from "react-cookie-consent"
import clsx from "clsx"
import ReactGA from 'react-ga';

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

  const onStopFollow = (event:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    Cookies.set("gatsby-gdpr-google-analytics", false);
  }

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
          buttonClasses="border border-teal-700 bg-teal-900 text-white block rounded-sm font-bold py-2 px-3 flex items-center mr-3 mt-3"
          declineButtonClasses="border border-teal-700 text-teal-700 block rounded-sm font-bold py-2 px-3 flex items-center hover:bg-teal-900 hover:text-white"
          expires={150}
          onAccept={() => {
            Cookies.set("gatsby-gdpr-google-analytics", true);
            ReactGA.initialize("UA-56643830-4");
            ReactGA.pageview(window.location.pathname + window.location.search);
          }}
          onDecline={() => {
            Cookies.set("gatsby-gdpr-google-analytics", false)
          }}
          flipButtons
          style={{
            background: "#ffffff",
            boxShadow: "rgba(0, 0, 0, 0.5) 0px 9px 10px 5px",
            borderTop: "1px solid rgb(203, 214, 226)",
            color: "#000"
          }}
          disableButtonStyles
          cookieName='fsgeekCookie'
        >
          Korzystam z ciastek by śledzić informacje o liczbie odwiedzających poszczególne strony. W dowolnej chwili masz możliwość wyłączenia plików cookie w przeglądarce, dzięki czemu nie będą zbierane żadne informacje. Kliknij w przycisk by ukryć komunikat. :)
        </CookieConsent>
      </div>
      <footer className='bg-teal-900 p-6 h-20'>
        <Link to='/polityka-prywatnosci' className='text-gray-200 text-sm'> Polityka prywatności</Link>
        <a className='text-gray-200 text-sm ml-4' onClick={onStopFollow} href='/'> Przestań mnie śledzić</a>
      </footer>
    </>
  )
}