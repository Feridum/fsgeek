---
title: "3 proste sposoby na niezmienność w JavaScript"
slug: "javascript-object-const-seal-freeze"
author: "Feridum"
image: "./logo.jpg"
tags: ["javascript", "immutability", "objects"]
date: 2020-10-12T15:45:00+02:00
---

Stałe wartości mogą być zainicjalizowane tylko jeden raz i od tej pory nie można ich zmienić. Dzięki temu zawsze wiemy, co jest w środku, więc jest to odporniejsze na błędy. A jak można zapewnić niezmienność danych w JavaScript?

<!--more-->

## Javascript-exercises

Jeśli już teraz wiesz, jakie to są sposoby, to sprawdź swoje umiejętności w specjalnie przygotowanych ćwiczeniach z JavaScript. Stworzyłem repozytorium z testami, które mają pomóc w nauce i sprawdzić wiedzę. [Sprawdź swoją wiedzę już teraz](https://github.com/Feridum/javascript-exercises)

## Const

Na sam początek sposób, który przychodzi w sposób naturalny od wprowadzenia ES6, czyli `const`. Nie jest to jednak stała w sensie, jaki znamy z innych języków programowania. Jest to bardziej stałość referencji, czyli **raz zainicjalizowanej zmiennej nie możemy zainicjalizować ponownie ani przypisać nowej wartości**. Sprawdza się to dla typów prostych np.: string czy number. Zyskują one tym samym niezmienność. Natomiast jeśli pod zmienną mamy zainicjalizowany obiekt albo tablicę to możemy ciągle modyfikować wartości wewnątrz. Najlepiej to widać na poniższym przykładzie:

```js
const a = 1;
a = 2; //Uncaught TypeError: Assignment to constant variable.

const b = {a: 1};
b = {b: 2}; //Uncaught TypeError: Assignment to constant variable.
b.a = 2; // {a: 2}
delete b.a // {}

const c = [1];
c = [2]; //Uncaught TypeError: Assignment to constant variable.
c[1] = 2; // [1,2]
```

## Object.seal()

Na szczęście to nie wszystko i mamy inne sposoby zapewnienia stałości obiektu. Pierwszym z nich jest `Object.seal()`. Powoduje on, że **obiekt jest zamknięty przed modyfikacjami**. Nie możemy dodawać nowych ani usuwać istniejących własności. Ciągle możemy jednak zmieniać wartości istniejących właściwości.

```js
const a = Object.seal({a: 1});
a.b = 2; // {a: 1}
a.a = 2; // {a: 2}
delete a.b; // {a: 2}
```

Co ciekawe nazwa jest trochę myląca, ponieważ możemy to też aplikować do **tablic.** Tak samo, jak w przypadku tablic, nie możemy dodawać nowych elementów, ale możemy zmieniać istniejące. 

```js
const a = Object.seal([1]);
a[1] = 2; // [1]
a[0] = 2; // [2]
```

## Object.freeze()

Na sam koniec zostawiłem `Object.freeze()`, który jest najbardziej restrykcyjny. Jak nazwa wskazuje, powoduje "zamrożenie" obiektu. Oprócz ograniczeń wprowadzonych już przez `Object.seal()` tutaj dodatkowo **nie możemy zmieniać wartości istniejących obiektów**. Obiekt jest teraz prawdziwie niemutowalny.

```js
const a = Object.freeze({a: 1});
a.b = 2; // {a: 1}
a.a = 2; // {a: 1}
delete a.a; // {a: 1}
```

Podobnie możemy to zaaplikować do tablic.

```js
const a = Object.freeze([1]);
a[1] = 2; // [1]
a[0] = 2; // [1]
```

## Zagnieżdżone obiekty

Trzeba uważać, jeśli zagnieżdżamy obiekty w sobie. Taki zagnieżdżony obiekt nie jest już zabezpieczony przed zmianami. Najprościej to zobaczyć na przykładzie 

```js
const a = Object.freeze({a: 1, b: {c:1}})

a.b.c = 2 // {a: 1, b: {c:2}} 
```

Jeśli chcemy mieć prawdziwie stały obiekt, to musimy na każdym poziomie zapewnić, że obiekty/tablice będą zamrożone.