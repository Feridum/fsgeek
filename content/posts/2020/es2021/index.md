---
title: "Co nas czeka w standardzie ES2021?"
slug: "javascript-es2021-standard"
author: "Feridum"
image: "./logo.jpg"
tags: ["javascript", "es2021"]
date: 2020-11-17T16:00:00+01:00
---

Jak co roku do standardu ECMAScript są dodawane nowe funkcjonalności, które pozwalają rozwijać język JavaScript. Już teraz mamy informacje na temat nowości na przyszły rok. Co nas zatem czeka nowego w roku 2021?

<!--more-->

`Wszystko to, co opisuję, można już testować w Chrome`

## String.replaceAll()

`String.replaceAll()` jest rozszerzeniem istniejącej już metody `String.replace()`. Do tej pory istniejąca metoda pozwalała zmienić pierwsze wystąpienie szukanego znaku w tekście. 

```jsx
const a = 'a+b+c';
a.replace('+',' '); // a b+c
```

Jak potrzebowaliśmy zmienić wszystkie wystąpienia danego znaku, to musieliśmy skorzystać z Regex'a. 

```jsx
const a = 'a+b+c';
a.replace(/\+/g, ' '); //a b c
```

Teraz będzie to łatwiejsze do zrobienia z nową metodą.

```jsx
const a = 'a+b+c';
a.replaceAll('+',' '); //a b c
```

## Promise.any()

Mój faworyt, jeśli chodzi o nowe funkcjonalności. `Promise.any()` jest ostatnią metodą, jaka brakowała do czterech metod zarządzania większą ilością Promise'ów (dokładnie o tym, jakie metody są dostępne i jak z nich skorzystać dowiesz się [tutaj](https://fsgeek.pl/post/javascript-promise-all-allsettled-race-any/)). `Promise.any()` zwraca nam pierwszą wartość, która rozwiąże się poprawnie z tablicy przekazanych Promise'ów. Najlepiej pokazuje to przykład: 

```jsx
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'resolve 100'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 'resolve 200'));
const reject1 = new Promise((resolve, reject) => setTimeout(reject, 150, 'reject 150'));

const test1 = await Promise.any([promise1, promise2]) // resolve 100
const test2 = await Promise.any([promise2, reject1]) // resolve 200
```

## Numeric separators

Następna funkcjonalność jest ciekawostką, którą będzie można wykorzystywać przy bardzo dużych liczbach, a mianowicie separator numeryczny. Jest to znak podłogi `_`, który pozwala na rozdzielenie cyfr w liczbie, ale nie ma wpływu na jej wartość. Można go wykorzystać do dużych liczb by od razu widzieć rząd wielkości np. `1_000_000` jest łatwiej odczytać niż `1000000`. To, co mi się najbardziej podoba to możliwość wykorzystania tego do zapisu binarnego, heksadecymalnego i ósemkowego.

```jsx
0b0011_0001 // 49 vs 0b00110001 
0x01_01 // 257 vs 0x0101
```

## Logical Assignment Operators

Na sam koniec funkcjonalność, która wygląda dziwnie na pierwszy rzut oka - jest to grupa 3 nowych operatorów logiczno-przypisujących: 

- `||=`
- `&&=`
- `??=`

Zapis jest mało czytelny na początku i w sumie nie za bardzo wiadomo, o co chodzi. Jednak jak się zrozumie idee działania, to mogą to być całkiem przydatne operatory.

Zacznijmy od pierwszego operatora - operator przypisania OR `a ||= b`. Jak się go rozpisze to mamy taki zapis `a || a = b`. Żeby to zrozumieć musimy pamiętać, jak działa operator OR  - `a || b`, `b` będzie sprawdzone tylko, jeśli pierwszy argument jest fałszywy. W przypadku przypisania OR, przypisanie wystąpi tylko wtedy kiedy `a` będzie fałszywe.

```jsx
let a = 0;
let b = 1;

a ||= b; // 1
console.log(a); // 1

a = 2;
a ||= b; // 2
console.log(a); // 2
```

Teraz możemy omówić pozostałe. Operator przypisania `&&` operuje na działaniu operatora AND. Zapis `a &&= b` można rozpisać jako `a && a=b` - czyli przypisanie nastąpi tylko, kiedy zmienna `a` będzie się rzutowała na wartość `true.` 

```jsx
let a = 0;
let b = 1;

a &&= b; // 0
console.log(a); // 0

a = 2;
a &&= b; // 1
console.log(a); // 1
```

Na sam koniec operator, który wykorzystuje `nullish coalescing` - `a??=b`. Jak sobie go rozpiszemy to dostaniemy coś takiego `a ?? a=b`. Czyli tutaj przypisanie nastąpi tylko, jeśli zmienna `a` ma wartość `null` i `undefined`. 

```jsx
let a = 0;
let b = 1;

a ??= b; // 0
console.log(a); // 0

a = 2;
a ??= b; // 2
console.log(a); // 2

a = null;
a ??= b; // 1
console.log(a); // 1
```

Słyszałeś o tych funkcjonalnościach wcześniej? Co o nich myślisz? Napisz komentarz lub napisz bezpośrednio do mnie na maila :).