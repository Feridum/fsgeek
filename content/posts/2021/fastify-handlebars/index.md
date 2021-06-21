---
title: "Jak stworzyć UI na backendzie?"
slug: "fastify-handlebars-tailwind"
author: "Feridum"
image: "./logo.png"
tags: ["fastify", "backend", "frontend"]
date: "2021-06-22T16:00:00.302Z"
---

W dzisiejszych czasach chyba większość nowych aplikacji powstaje jako dwa osobne byty - frontend i backend. A może dla niektórych przypadków jest to niepotrzebne? Może backend, który zwraca gotowy widok, jest dla niektórych przypadków wystarczający? W poście pokazuję jak to zrobić przy pomocy Fastify i Handlebars.

<!--more-->

## Kiedy warto zwracać frontend z backendu?

Frameworki frontendowe mają wiele zalet. Są aktualnie rozwiązaniem, które pozwala dostarczyć najlepszy UI i UX dla użytkownika końcowego. Interaktywność i możliwości tworzenia zaawansowanych aplikacji są szczególnie istotne, gdy mamy tyle innych(podobnych do siebie) rozwiązań. Natomiast mamy też wiele innych problemów do rozwiązania np.: SEO, dłuższy czas ładowania strony, konieczność synchronizacji stanów pomiędzy frontendem a backendem. Dlatego, budując teraz klon Linktree, zdecydowałem się na budowanie widoków na backendzie.

Jakie były moje argumenty za tym?

- buduję prosty widok z linkami, które nie będą bardzo interaktywne (oprócz standardowych zdarzeń jak hover i click)
- nie potrzebuję, żadnych formularzy
- zależy mi na SEO oraz szybkości ładowania strony
- wystarczy mi tylko jedna aplikacja (nie muszę martwić się o deploy dwóch różnych)
- framework JS, byłby tu przerostem formy nad treścią - **nie potrzebuję budować całego React'a by wyświetlić parę przycisków - do tego służy HTML i CSS**

## Dodanie Handlebars do Fastify

Zdecydowałem się na bibliotekę Handlebars, która ma mi tworzyć widoki. Do jej instalacji potrzebuję komendę:

```jsx
npm install handlebars point-of-view
```

Biblioteka `point-of-view` pozwala na dodanie renderowania widoków w Fastify i wspiera najpopularniejsze rozwiązania np.:ejs, handlebars, twig itd. Ja wykorzystam Handlebars, ale możesz wybrać swoją ulubioną.

```jsx
import pointOfView from 'point-of-view';
import handlebars from 'handlebars';

fastify.register(pointOfView, {
  engine: {
    handlebars,
  },
  includeViewExtension: true,
  layout: './templates/layout/layout',
})
```

Do dodania obsługi musimy tylko zarejestrować plugin point-of-view. Ciekawą opcją (dostępną tylko dla handlebars) jest `layout`, który dodaje szablon do każdego widoku. U mnie wygląda on tak:

```jsx
<!DOCTYPE html>
<html class="antialiased" lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    {{{body}}}
</body>
</html> 
```

## Pierwszy widok

Wszystko jest skonfigurowane, więc można stworzyć pierwszy widok. Widoki są zwracane zawsze jako wynik zapytania GET po wpisaniu w przeglądarkę adresu. 

```jsx
fastify.get('/', (req, reply) => {
  reply.view('./templates/main', {});
});
```

Dzięki zarejestrowaniu `point-of-view` mamy dostęp w zmiennej `reply` do funkcji `.view()`, która wyrenderuje i zwróci widok do przeglądarki. Pierwszy parametr to ścieżka do pliku, który chcemy wyrenderować, a drugi to dane, jakie chcemy przekazać np.: tablica linków.

## Dodanie Tailwinda

Oczywiście na samym HTML'u ciężko zbudować całą aplikację i potrzebujemy to jakoś ostylować. Moglibyśmy pisać wszystko ręcznie, ale możemy wykorzystać bibliotekę Tailwind. Jest to według mnie bardzo dobry wybór, jeśli potrzebujemy szybko dodać style do naszej aplikacji. 

Standardowo najpierw trzeba wszystko zainstalować:

```jsx
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest postcss postcss-cli
```

Teraz potrzebujemy dwa pliki konfiguracyjne - jeden dla postcss i drugi dla tailwinda

```jsx
//postcss.config.js

module.exports = {
  plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
  ]
}
```

```jsx
//tailwind.config.js

module.exports = {
  purge: [
      './templates/**/*.hbs'
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

Opcja `purge` pozwoli na pozbycie się nieużywanych klas w produkcyjnej wersji. **Jest to istotne pod względem wydajności naszej aplikacji**. Żeby usunąć nieużywane style, Tailwind musi wiedzieć, w jakich plikach z nich korzystamy. I ścieżki do tych plików musimy podać w opcji `purge`. Następna rzecz to plik `style.css`, który będzie po pierwsze ładował style z Taliwinda oraz pozwalał na tworzenie własnych styli.

```jsx
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.btn {
  @apply font-bold py-2 px-4 rounded w-full; 
}
.btn-blue {
  @apply bg-blue-600 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
```

Zwróć uwagę na przyciski - wykorzystałem tutaj `@apply`, co pozwala mi na tworzenie swoich klas na bazie istniejących w Tailwind. 

Została ostatnia rzecz do zrobienia - budowanie styli. W package.json dodałem kilka komend do tego 

```jsx
"watch:css": "npm run build:css -- --watch",
"build:css": "postcss templates/styles/*.css -d public",
"prod:css": "NODE_ENV=production npm run build:css" 
```

Dodatkowo podczas uruchamiania aplikacji trzeba uruchomić generowanie styli.

```jsx
"start": "npm run start:app & npm run watch:css"
```

Musimy jeszcze jedną rzecz zainstalować - `fastify-static`, który umożliwia serwowanie statycznych plików takich jak nasze wygenerowane style. 

```jsx
npm i fastify-static
```

```jsx
import fastifyStatic from 'fastify-static'

fastify.register(fastifyStatic, {
  root: join(__dirname, '/public'),
  prefix: '/public/',
})
```

Teraz możemy dodać do naszego pliku `layout.hbs` wpis 

```jsx
<link rel="stylesheet" href="/public/styles.css">
```

Trochę pracy jest, ale teraz można spokojnie tworzyć aplikację i ją stylować.