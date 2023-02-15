import { CookieConsent } from 'react-cookie-consent';

export const CookieBar = () => {
  console.log('test');
  return (
    <CookieConsent
      location="bottom"
      buttonText="Rozumiem"
      declineButtonText="Odmawiam"
      buttonWrapperClasses="w-full pb-2 lg:w-auto lg:pb-0"
      buttonClasses="border border-teal-700 bg-teal-900 text-white block rounded-sm font-bold py-2 px-3 flex items-center mr-3 mt-3 ml-auto"
      declineButtonClasses="border border-teal-700 text-teal-700 block rounded-sm font-bold py-2 px-3 flex items-center hover:bg-teal-900 hover:text-white"
      contentClasses="w-5/6"
      expires={150}
      onAccept={() => {}}
      onDecline={() => {}}
      flipButtons
      style={{
        background: '#ffffff',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 9px 10px 5px',
        borderTop: '1px solid rgb(203, 214, 226)',
        color: '#000',
        alignItems: 'center',
      }}
      disableButtonStyles
      cookieName="fsgeekCookieGTN"
      overlay
    >
      Hej. Jak pewnie domyślasz się, ta strona korzysta z ciasteczek. Możesz
      sprawdzić szczegóły w{' '}
      <a href="/polityka-prywatnosci/" className="underline">
        Polityce prywatności
      </a>
      . Wchodząc na stronę zgadzasz się na korzystanie z ciasteczek zgodnie z
      ustawieniami przeglądarki. <br />
      Kliknij w przycisk by ukryć komunikat. :)
    </CookieConsent>
  );
};
