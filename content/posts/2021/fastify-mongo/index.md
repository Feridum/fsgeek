---
title: "Jak połączyć się z MongoDB w Fastify?"
slug: "fastify-plugin-mongodb"
author: "Feridum"
image: "./logo.png"
tags: ["fastify", "mongodb"]
date: "2021-08-03T16:00:00.526Z"
---


Ciężko zrobić fajną aplikację bez bazy danych. Do wyboru mamy wiele rodzajów baz- relacyjne, NoSQL, grafowe, klucz-wartość itd. W dzisiejszym wpisie pokazuję jak połączyć projekt w Fastify z MongoDB.

<!--more-->

## MongoDB

MongoDB jest przykładem bazy danych typu NoSQL. W bazach SQL dane są przechowywane w uporządkowanej strukturze zwanej tablicą, gdzie każda z kolumn definiuje jeden rodzaj danych, a w wierszach są kolejne zestawy danych. Dane z różnych tabel są połączone przy pomocy relacji, dzięki czemu można budować skomplikowane modele. W NoSQL mamy większą dowolność w kwestii sposobu przechowywania danych i wszystko zależy od tego, jaką bazę wykorzystujemy. W MongoDB dane są przechowywane za pomocą dokumentów, w których obowiązuje struktura klucz-wartość. Najprościej sobie wyobrazić to jako rodzaj pliku *.json. Taka struktura daje sporo elastyczności i jednocześnie jest prosta do czytania.

Dlaczego zdecydowałem się na bazę NoSQL do klona Linktree? Po pierwsze nie potrzebuję tutaj żadnych relacji - dane chciałem trzymać w jak najprostszej strukturze. Czyli pobieram dane i wrzucam do widoku bez przetwarzania. Po drugie struktura nie jest ostateczna - w MongoDB mogę dużo łatwiej zmieniać kolumny i zawartość. MongoDB daje mi dużo większą elastyczność.

Do lokalnych testów polecam skorzystać z Docker'a. Poniżej umieściłem polecenie, które uruchomi taką bazę danych na porcie `27017`, login to `admin` i hasło `test`.  Na potrzeby testów sprawdzi się idealnie.

```yaml
docker run -d --rm --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=test -p 27017:27017  mongo:latest
```

## Instalacja zależności

Konfigurację mongo trzeba zacząć od instalacji wymaganych zależności

```yaml
npm i fastify-plugin mongodb fastify-env
```

Jest to minimalny zestaw bibliotek, jaki jest potrzebny do podpięcia bazy danych w Fastify. 

- `fastify-env` - do obsługi zmiennych środowiskowych (niżej jest to opisane szerzej)
- `fastify-plugin` - by stworzyć plugin, który doda obsługę bazy danych
- `mongodb` - biblioteka do połączenia z MongoDB

`mongodb` jest oficjalną biblioteką od twórców tej bazy danych. Dzięki temu będę miał dostęp do wszystkich aktualizacji, zaraz po tym, jak wyjdą. Oczywiście są inne biblioteki np.: mongoose albo TypeORM. Nie będę próbował cię przekonać, że wybór tych bibliotek jest zły. Ale do moich zapotrzebowań nie potrzebuję tak rozbudowanych rozwiązań. Innym minusem takich rozbudowanych rozwiązań są warstwy abstrakcji - jeśli wyjdzie update do mongodb, to trzeba czekać, aż autorzy zaktualizują biblioteki. W przypadku oficjalnego mongodb aktualizacja jest od razu. 

## Obsługiwanie zmiennych środowiskowych

Dodawanie bazy danych jest idealnym momentem, by wspomnieć o zmiennych środowiskowych. Do połączenia z bazą danych potrzebujemy wrażliwych informacji takich jak: adres bazy danych, użytkownik, hasło, port. Dla środowiska developerskiego nie jest problemem, by te dane były zaszyte w kodzie (i tak najczęściej to jest docker). Ale co z produkcją? Nie można sobie pozwolić na to, by dowolna osoba poznała dane dostępowe do bazy danych. To grozi wyciekiem danych, awarią aplikacji, prawne konsekwencje itd.

Najlepszy sposób, by sobie z tym poradzić to tzw.: zmienne środowiskowe. Dzięki temu dla każdego środowiska możemy ustalić inne wartości. Najczęściej są ustawiane podczas deploy'u na środowisku - powoduje to, że nawet developerzy nie znają ustawień produkcyjnych. Podczas developmentu korzysta się z pliku `.env`, by ustawić odpowiednie zmienne. Przykładowy plik wygląda następująco:

```yaml
MONGO_URL=
MONGO_DB=
```

Biblioteka `fastify-env`, pozwala korzystać z tego pliku, jak i zmiennych ustawionych w systemie.

```yaml
const fastifyEnv = require('fastify-env');

const schema = {
  type: 'object',
  required: ['MONGO_URL', 'MONGO_DB'],
  properties: {
    'MONGO_URL': {
      type: 'string',
      default: ''
    },
    'MONGO_DB': {
      type: 'string',
      default: ''
    }
  }
}

const options = {
  schema,
  dotenv: true
}

fastify.register(fastifyEnv, options)
```

Do poprawnego skonfigurowania fatstify-env potrzebna jest schema. Jest to obiekt, który zawiera klucze o nazwie naszych zmiennych oraz konfiguracji dla nich. Dodatkowo w opcjach warto zwrócić uwagę na opcję `dotenv` - po ustawieniu na true plugin pobiera zmienne z pliku .env.

## MongoDB + Fastify

Aby MongoDB był dostępny w każdym request'cie to najprościej jest stworzyć własny plugin. Najprościej skorzystać z biblioteki `fastify-plugin`, która ułatwia ten proces. Cały plugin wygląda następująco.

```yaml
const fp = require('fastify-plugin');
const {MongoClient} = require('mongodb');

const mongoPlugin = fp(async function (fastify) {
    const url = fastify.config.MONGO_URL
    const client = new MongoClient(url)
    await client.connect()
    const db = client.db(fastify.config.MONGO_DB)

    console.log('Connected successfully to server')
    fastify.decorate('mongoDb', db);
}, '3.x')

module.exports = {
    mongoPlugin
}
```

Do stworzenia własnego pluginu korzystam z biblioteki `fastify-plugin`. Przyjmuje ona jako pierwszy parametr funkcję, w której mieści się cała logika pluginu. Funkcja ta ma dostęp do obiektu `fastify`, który pozwala na dostęp do zmiennych środowiskowych oraz na rejestrację pluginu. 

Cała logika nie jest skomplikowana, ponieważ nawiązujemy tylko połączenie z bazą danych i rejestrujemy rezultat jako zmienna `mongoDb`. Gdybyśmy korzystali z innych baz, moglibyśmy nawiązać osobne połączenia i zarejestrować więcej niż jedną wartość. 

Oprócz tego w bibliotece `fastify-plugin` można przekazać inne parametry np.: minimalna wspierana wersja fastify (tak jak w przykładzie), ale jest to bardziej dla osób, które tworzą pluginy open-source.

Dalej trzeba nasz własny plugin zarejestrować.

```yaml
const { mongoPlugin } = require('./mongo.js');
fastify.register(mongoPlugin)
```

I potem można wykorzystywać przy zapytaniach.

```yaml
fastify.get('/', async (req, reply) => {
  const links = await fastify.mongoDb.collection('link').find({}).toArray()  
	reply.view('./templates/main', { links });
});
```

I właściwie tyle z podstawowej konfiguracji. Teraz można tworzyć kolejne endpointy, rozbudowywać logikę itd. A jakby była potrzeba komunikacji z inną bazą to można dorobić kolejny plugin (prawie całość to copy&paste). Nie jest to skomplikowane i muszę przyznać, że system pluginów w Fastify jest bardzo wygodny. A ty co o tym myślisz? Daj znać.