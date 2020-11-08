---
title: "Jak zapanować nad Promise'ami w aplikacji?"
slug: "javascript-promise-all-allsettled-race-any"
author: "Feridum"
image: "./logo.jpg"
tags: ["javascript", "asynchronicznosc", "Promise"]
date: 2020-11-03T16:00:00+01:00
---

Promisy są aktualnie podstawowym sposobem radzenia sobie z asynchronicznym kodem w JavaScript. Pojawiają się prawie w każdym trochę bardziej zaawansowanym kawałku kodu. Czasem jest ich nawet aż za dużo. Jak więc sobie radzić z dużą ilością Promisów w aplikacji? 

<!--more-->

## Javascript-exercises

Jeśli już teraz wiesz, jakie sobie z tym poradzić, to sprawdź swoje umiejętności w specjalnie przygotowanych ćwiczeniach z JavaScript. Stworzyłem repozytorium z testami, które mają pomóc w nauce i sprawdzić wiedzę. [Sprawdź swoją wiedzę już teraz](https://github.com/Feridum/javascript-exercises)

## Promise hell

Jaki jest problem z Promise'ami? W końcu rozwiązały słynny problem `callback hell` (o którym poczytacie więcej we wpisie o [asynchroniczności w JS](https://fsgeek.pl/post/asynchronicznosc-w-javascript/)). Ale pojawia się za to inny problem tzw.: `promise hell`. Występuje w sytuacji gdzie mamy kilka zależnych od siebie zapytań lub też konstruujemy odpowiedź na podstawie danych z kilku źródeł. Możemy wtedy albo wykorzystywań `.then()` (ale przypomni to trochę callback hell) albo skorzystać z `async/await` (ale wtedy tworzy nam się kod synchroniczny). Jak więcej lepiej to zrobić?

## Promise.all()

Na sam początek moja ulubiona i często wykorzystywana metoda - `Promise.all()`. Przyjmuje jako parametr tablicę Promise'ów i zwraca Promise'a. Po rozwiązaniu będzie zawierał on tablicę wartości dla każdego rozwiązanego Promise'a wewnątrz. **Będzie on rozwiązany poprawnie, jeśli wszystkie wartości przekazane jako argument rozwiążą się poprawnie. Jeśli na którymś Promise wystąpi błąd, to wykonywanie funkcji zostaje wstrzymane i jest zwrócony błąd tzw.: `fail-fast`**.  Bardzo często wykorzystuję to do pobierania danych o kilku elementach jednocześnie np.: z profilu użytkownika dostaję informację o id przeczytanych książek i chcąc wyświetlić informacje o nich, trzeba pobrać dane książki z innego endpointa.

```jsx
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'resolve 100'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 'resolve 200'));
const reject1 = new Promise((resolve, reject) => setTimeout(reject, 150, 'reject 150'));

const test1 = await Promise.all([promise1, promise2]) // ['resolve 100', 'resolve 200']
const test2 = await Promise.all([promise2, reject1]) // reject 150
```

## Promise.allSettled()

Następną funkcją jest `Promise.allSettled()`. Podobnie jak poprzednia funkcja, pozwala uzyskać wartości przekazanych Promise'ów po tym, jak wszystkie się poprawnie rozwiążą. To, co je różni to sposób zachowania, gdy wystąpi błąd. **`Promise.allSettled` nie przerywa działania podczas wystąpienia błędu. Jako wynik dostajemy informację, jak każdy przekazany w argumencie Promise się rozwiązał oraz z jaką wartością.** Dzięki temu nawet jak jedna operacja się nie powiedzie, to z pozostałych dostaniemy informacje. Tutaj ważna uwaga - **dostajemy tablicę obiektów `{status, value}` więc do właściwych wartości musimy się dopiero dostać**.

```jsx
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'resolve 100'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 'resolve 200'));
const reject1 = new Promise((resolve, reject) => setTimeout(reject, 150, 'reject 150'));

const test1 = await Promise.allSettled([promise1, promise2]) 
/*
[
	{status: "fulfilled", value: "resolve 100"}
	{status: "fulfilled", value: "resolve 200"}
]
*/
const test2 = await Promise.allSettled([promise2, reject1])
/*
[
	{status: "fulfilled", value: "resolve 200"}
	{status: "rejected", value: "reject 150"}
]
*/
```

## Promise.race()

Kolejną ciekawą funkcją jest `Promise.race()`, której nazwa zdradza już sposób zachowania. Przekazujemy jako argument ponownie tablicę Promise'ów. **Jako wynik dostajemy pierwszą wartość, która się rozwiąże - nie ważne czy to będzie poprawne rozwiązanie, czy też wystąpi błąd.**

```jsx
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'resolve 100'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 'resolve 200'));
const reject1 = new Promise((resolve, reject) => setTimeout(reject, 150, 'reject 150'));

const test1 = await Promise.race([promise1, promise2]) // resolve 100
const test2 = await Promise.race([promise2, reject1]) // reject 150
```

## Promise.any()

Na sam koniec rozszerzenie poprzedniej funkcji, czyli `Promise.any()`. **Jako wynik jest zwracana pierwsza wartość, która rozwiąże się poprawnie**. Oznacza to, że nawet jeśli jakiś błąd wystąpił szybciej, to zostanie zignorowany i funkcja będzie czekać na poprawną wartość. Można by to wykorzystać, jeśli mamy bazę danych oraz cache i chcemy otrzymać poprawne dane z jednego lub drugiego miejsca.

**Niestety nie jest to jeszcze oficjalna funkcja, ale wejdzie do standardu w 2021.**

```jsx
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'resolve 100'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 'resolve 200'));
const reject1 = new Promise((resolve, reject) => setTimeout(reject, 150, 'reject 150'));

const test1 = await Promise.any([promise1, promise2]) // resolve 100
const test2 = await Promise.any([promise2, reject1]) // resolve 200
```