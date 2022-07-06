import React, { useCallback } from "react"

import { Link } from "gatsby"
import { LayoutProps } from "./Layout.types."
import "../../style/main.css"
import { Header } from "../header/Header"
import CookieConsent, { Cookies } from "react-cookie-consent"
import clsx from "clsx"
import { useLocation } from "@reach/router" // this helps tracking the location

export const Layout = ({ children, className }: LayoutProps) => {
  const location = useLocation();

  const onStopFollow = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    Cookies.set("gatsby-gdpr-google-tagmanager", false);
  }

  const measuredRef = useCallback(node => {
    console.log(node)
    const element = document.getElementsByClassName('pageContainer')[0];

    if (node !== null) {
      element.classList.add('block-scroll');
    }else{
      element.classList.remove('block-scroll');
    }
  }, []);

  // @ts-ignore
  return (
    <>
      <div className="overflow-x-hidden" style={{ minHeight: 'calc(100vh - 5rem)' }}>
        <Header />
        <main className={clsx("pt-32 pb-32 px-8 lg:px-16 mx-auto ", className)}>{children}</main>

        <CookieConsent
          location="bottom"
          buttonText="Rozumiem"
          declineButtonText="Odmawiam"
          buttonWrapperClasses='w-full pb-2 lg:w-auto lg:pb-0'
          buttonClasses="border border-teal-700 bg-teal-900 text-white block rounded-sm font-bold py-2 px-3 flex items-center mr-3 mt-3 ml-auto"
          declineButtonClasses="border border-teal-700 text-teal-700 block rounded-sm font-bold py-2 px-3 flex items-center hover:bg-teal-900 hover:text-white"
          contentClasses='w-5/6'
          expires={150}
          onAccept={() => {
          }}
          onDecline={() => {
          }}
          flipButtons
          style={{
            background: "#ffffff",
            boxShadow: "rgba(0, 0, 0, 0.5) 0px 9px 10px 5px",
            borderTop: "1px solid rgb(203, 214, 226)",
            color: "#000",
            alignItems: 'center',
          }}
          disableButtonStyles
          cookieName='fsgeekCookieGT'
          overlay
          ButtonComponent={(props)=><button {...props}  ref={measuredRef}/>}
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