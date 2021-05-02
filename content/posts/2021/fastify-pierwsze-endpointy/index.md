---
title: "Buduję Linktree w Fastify - pierwsze endpointy z walidacją"
slug: "fastify-pierwsze-endpointy-walidacja"
author: "Feridum"
image: "./logo.png"
tags: ["node", "backend", "fastify"]
date: "2021-05-04T16:00:00.579Z"
---

Fastify jest jednym z konkurencyjnych frameworków w stosunku do Express. Posiada wiele zalet w stosunku do Express'a. Najlepiej te zalety (i pewnie wady) poznać, budując prostą aplikację. Postanowiłem zrobić klon Linktree. W tym poście skupiłem się na pierwszych endpointach i walidacji. 

<!--more-->

## Dlaczego nie Express?

Nie można zaprzeczyć, że Express jest jednym z najpopularniejszych frameworków backendowych. Nie tylko jest wykorzystywany w aplikacjach biznesowych, ale również stanowi podstawę dla wielu innych frameworków. Dlaczego więc postanowiłem wybrać coś innego? Fastify ma kilka zalet, które sprawiają, że jest to ciekawy wybór.

- cały czas jest rozwijana (Express już od prawie 2 lat nie dostał, żadnej aktualizacji),
- wspiera domyślnie async/await,
- lepsza wydajność w stosunku do Express.

No i muszę przyznać, że pisze się w tym całkiem przyjemnie ;). 

## Fastify - podstawowa konfiguracja

Na początek standardowo - trzeba zainstalować bibliotekę `fastify`.

```jsx
npm i fastify --save
```

Teraz można uruchomić naszą aplikację. Wystarczy poniższy kawałek kodu

```jsx
import Fastify from 'fastify'
const fastify = Fastify()

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
```

> Uwaga - korzystam z modules więc mogę korzystać z `import ... from ...`

Jak widać, kod jest minimalny. Mamy tutaj uruchomienie serwera na danym porcie (w przypadku realnych projektów to będzie szło ze zmiennych środowiskowych). Mamy też podstawową obsługę błędów w aplikacji. Aby uruchomić aplikację, dodałem do `package.json`, nowy skrypt.

```jsx
"scripts": {
   "start": "nodemon index.mjs"
 },
```

Nodemon pozwala na dodanie funkcji watch do naszego kodu - dzięki temu po wprowadzeniu zmian aplikacja sama się przeładuje. Po starcie aplikacja nic teraz nie robi, więc trzeba dodać pierwsze endpointy.

## Fastify - pierwsze endpointy

Podstawowa funkcjonalność Linktree to możliwość dodawania i pobierania linków. Póki, co nie zajmuję się tematem połączenia z bazą danych(będzie osobny post na to), więc linki będę zapisywać najprościej jak się da - w pamięci. 

```jsx
const links = []

fastify.get('/', async (request, reply) => {
    return { links }
})

fastify.post('/', async (request, reply) => {
    links.push(request.body)
    return true
})
```

Pierwszy endpoint można łatwo przetestować, wchodząc do przeglądarki na odpowiedni adres (`localhost:3000`) lub też wykonać odpowiedni request w terminalu lub Postman. Za pierwszym razem zwróci pustą tablicę.

```jsx
curl --location --request GET 'localhost:3000'
```

By dostać jakieś dane, trzeba najpierw je tam umieścić. 

```jsx
curl --location --request POST 'localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://news.fsgeek.pl",
    "name": "Newsletter FSGeek"
}'
```

Teraz po zrobieniu requestu GET dostaniemy nasze dane. 

```jsx
{
    "links": [
        {
            "url": "https://news.fsgeek.pl",
            "name": "Newsletter FSGeek"
        },
    ]
}
```

## Fastify - walidacja endpintów

Dwa pierwsze endpointy są. Problem jest taki, że możemy na POST wysłać cokolwiek i zostanie to zapisane. Nie jest to pożądane zachowanie. Dużo lepszym pomysłem jest walidacja danych, zanim zostaną zapisane. Możemy walidować dane w kontrolerze, ale istnieje lepsza metoda. W Fastify jest wbudowany system walidacji oparty o bibliotekę `ajv`. Wystarczy, że opiszemy jakiego zapytania oczekujemy i fastify zrobi resztę za nas. 

```jsx
const addLink = {
    body: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        name: { type: 'string' }
      },
      required: ["url", "name"],
      additionalProperties: false
    }
  }
```

Teraz gdy wyślemy zapytanie, które nie spełnia powyższej konfiguracji, dostaniemy błąd.

```jsx
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "body should have required property 'url'"
}
```

Daje nam to podstawową walidację naszych danych - i nie musieliśmy instalować nic, oprócz biblioteki Fastify. Ta biblioteka wygląda obiecująco. A ty co o tym myślisz? Pracowałeś/Pracowałaś z nią więcej?