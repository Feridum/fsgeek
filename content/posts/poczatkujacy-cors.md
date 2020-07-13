---
title: "Podstawy aplikacji webowych - SOP i CORS"
slug: "sop-cors"
author: "Feridum"
image: "../images/poczatkujacy-cors/logo.jpg"
tags: ["podstawy aplikacji webowych", "tworzenie aplikacji internetowych", "CORS", "SOP", "backend", "frontend"]
date: 2019-07-03T16:15:00+02:00
draft: false
---

Podczas pisania aplikacji ciągle musimy zwracać uwagę na bezpieczeństwo danych, które są przesyłane między klientem a serwerem. Oprócz mechanizmów, które sami implementujemy istnieją też te zaimplementowane natywnie w przeglądarce. To o czym dziś chciałbym powiedzieć to jeden z takich mechanizmów czyli SOP oraz sposób na jego rozluźnienie czyli CORS.

<!--more-->

## Czym jest SOP

Zacznijmy od mechanizmu zabezpieczającego, który jest zaimplementowany w przeglądarce czyli SOP - Same-Origin Policy. Mechanizm ten polega, że tylko strony posiadające to samo pochodzenie (origin) mogą komunikować między sobą i wymieniać dane między sobą (najczęściej jest to komunikacja na drodze klient - serwer gdzie to klient chce dane istniejące na serwerze). Jednak kiedy możemy powiedzieć, że strony (aplikacje) mają to samo pochodzenie? Do określenia tego służą nam 3 elementy : 

- Protokół
- Host
- Port

Jeśli te 3 elementy będą identyczne to znaczy, że strony mają ten sam Origin. Żeby lepiej to zobrazować mam parę przykładów: 

- `http://example.com` i `http://example.com/page/1` - OK
- `http://example.com` i `https://example.com` - inny protokół (HTTP i HTTPS)
- `http://example.com` i `http://example.com:8080` - inny port (domyślnie http:// jest na porcie 80)
- `http://example.com` i `http://posts.example.com` - inny host

Jeśli to sprawdzenie nie przejdzie (czyli przynajmniej jeden z elementów będzie różny) to przeglądarka zablokuje taką komunikację i klient nie dostanie danych o jakie prosi. 

## Czym jest CORS

Skoro wiemy czym jest SOP to teraz mechanizm, który pozwala nam to osłabić czyli CORS - Cross-Origin Resource Sharing. Jednak skoro SOP ma nas chronić to po co mechanizm, który będzie go osłabiał? Jest to spowodowane sposobem w jaki tworzymy aktualnie aplikacje internetowe. Obstawiam, że większość aktualnie tworzonych aplikacji jest tworzona jako SPA - czyli mamy kod Javascript, który komunikuje się przy pomocy odpowiednich zapytań z serwerem. No i w związku z tym, że są to osobne aplikacje (frontend i backend) to nie będą spełniały wymogu posiadania identycznego Originu. Bez CORS'a takie aplikacje nie mogłyby funkcjonować. 

CORS jest mechanizmem, który przy pomocy zwykłych nagłówków w zapytaniu HTTP informuje przeglądarkę (to przeglądarka pilnuje SOP'a), że klient, który jest na konkretnym hoście, protokole i porcie może odpytywać serwer o dane. Czyli wracając jednego z przykładów wyżej - `http://example.com` i `http://example.com:8080` - komunikacja będzie możliwa jeśli serwer (`http://example.com:8080`) poinformuje przeglądarkę że ufa klientowi, który znajduje się na `http://example.com` i ten może odpytywać o dane. Tylko jak to zrobić w aplikacji?

## Jak działa mechanizm CORS

Mechanizm CORS ma to do siebie, że jego nieumiejętne skonfigurowanie powoduje, że nie działa albo cała aplikacja albo część funkcjonalności - w zależności od tego o czym zapomnimy. Warto również pamiętać, że obowiązek poprawnej konfiguracji tego mechanizmu leży po stronie programistów piszących cześć serwerową (backend) - frontend nie jest w stanie naprawić błędów, które wynikają ze złej konfiguracji. 

Jednak zanim opiszę jakie nagłówki serwer musi wysyłać to jeszcze szybko o dwóch rodzajach zapytań jakie możemy wykonać: 

- Simple request 
- Preflighted reqest

Idea prostego zapytania (Simple request) jest następująca - jest to każde zapytanie, które spełnia wszystkie poniższe warunki: 

- Dozwolone metody: `GET`, `HEAD`, `POST`
- Dozwolone nagłówki (te które możemy sami ustawić): `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width`
- Dozwolone wartości dla `Content-Type`: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

Jak wygląda komunikacja klient - serwer w przypadku prostego zapytania: 

- Klient wysyła zapytanie do serwera
- Przeglądarka dołącza do zapytania nagłówek `Origin` 
- Serwer zwraca odpowiedź wraz z nagłówkiem `Access-Control-Allow-Origin`
- Przeglądarka sprawdza czy wartość w `Access-Control-Allow-Origin` zgadza się z wartością Origin klienta
- Jeśli wartość się nie zgadza to przeglądarka blokuje klienta przed otrzymaniem danych z serwera 
	
Jednak w aplikacjach internetowych nie wykorzystujemy prostych zapytań tylko preflight. Dlaczego? Ponieważ po pierwsze właściwie wszystko leci za pomocą json'a czyli nie zgadza się Content-Type, po drugie w 90% przypadków mamy jakieś uwierzytelnianie więc przesyłamy dodatkowy nagłówek z autoryzacją. 

Jak więc wygląda komunikacja w przypadku `preflighted request`:

- Klient chce wysłać zapytanie do serwera ale zapytanie nie spełnia założeń `simple request`
- Zapytanie jest wstrzymywane przez przeglądarkę i jest wysyłane zapytanie preflight, którego celem jest sprawdzenie czy klient może wykonać zamierzone zapytanie
- Zapytanie preflight charakteryzuje się kilkoma elementami: 
    - wysłane zapytanie ma metodę `OPTIONS` 
    - wysyłane są dodatkowe nagłówki `Access-Control-Request-Method`, `Access-Control-Request-Headers` oraz `ORIGIN` (o samych nagłówkach będzie za chwilę)
- W momencie gdy przeglądarka dostaje odpowiedź na zapytanie sprawdza zawartość nagłówków `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` w odpowiedzi
- Jeśli wszystko jest w porządku to jest wysyłane oryginalne zapytanie tak jak w przypadku Simple Request

## Nagłówki CORS

Jak widać cały mechanizm CORS opiera się na wysyłaniu odpowiednich nagłówków. Tak więc aby to poprawnie zaimplementować wystarczy, że będziemy wiedzieć do czego są poszczególne nagłówki oraz będziemy je konsekwentnie wysyłać. Same nagłówki możemy podzielić na dwa rodzaje - te wysyłane od klienta oraz te wysyłane przez serwer. I tak jak nagłówkami od strony klienta nie musimy się przejmować bo ustawia je za nas przeglądarka to o tych od strony serwera musimy pamiętać sami. 

Nagłówki po stronie klienta: 

- `Origin` - Orign klienta
- `Access-Control-Request-Method` - w zapytaniu preflight jest tu wpisywana nazwa metody z jaką klient chciał wykonać zapytanie
- `Access-Control-Request-Headers` - znajdują się tam nagłówki, które zostaną wykorzystane przy normalnym zapytaniu

Nagłówki po stronie serwera: 

- `Access-Control-Allow-Origin` - serwer zwraca tutaj informacje jaki Origin musi mieć klient by był w stanie wykonać request. Oprócz podania konkretnej wartości można podać tutaj wartość `*` co oznacza, że każdy może wykonać zapytanie.
- `Access-Control-Allow-Methods` - tutaj serwer zwraca jakie rodzaje zapytań są dozwolone
- `Access-Control-Allow-Headers` - tutaj serwer zwraca informację jakie nagłówki może wysłać klient

## Jak sobie poradzić podczas developmentu

Oczywiście prawidłowa konfiguracja dla produkcji nie gwarantuje, że będzie to działało podczas developmentu. Ja osobiście podczas pisania frontendu nie lubię stawiać u siebie backendu tylko staram się korzystać ze stagingu czy innego testowego środowiska. Ale oczywiście powoduje to problemy z mechanizmem CORS - jak sobie z tym poradzić? Parę sprawdzonych przeze mnie sposobów: 

- Zawsze jeśli mamy więcej niż jedno środowisko testowe możemy poprosić by na tym pobocznym ustawić `Access-Control-Allow-Origin` na wartość `*` lub przepisywanie Originu klienta. Jeśli macie tylko jedno środowisko przedprodukcyjne to nigdy nie róbcie takich zabiegów- potem może się okazać że coś nie działa na produkcji bo jest jakaś błędna konfiguracja
- Wyłączyć ten mechanizm obronny w swojej przeglądarce - można to zrobić albo wtyczką albo uruchomieniem przeglądarki odpowiednimi przełącznikami - rozwiązanie prawie idealne - nie działają wtedy niektóre serwisy np.: Youtube, Google Drive, Twitter a i pewnie jest tego więcej
- No i ostatnia opcja - postawienie sobie lokalnie części serwerowej i zmiana konfiguracji tak aby działała z lokalnym środowiskiem frontendowym

A wy jak sobie radzicie z CORS'em? A może macie jakieś ciekawe historie lub use-case'y związane z mechanizmem SOP lub CORS? Zapraszam do komentowania i dzielenia się wpisem.