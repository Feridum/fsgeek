---
title: "Typecript 3.7 - Optional Chaining i Nullish Coalescing"
slug: "optional-chaining-nullish-coalescing"
author: "Feridum"
image: "../images/nowosci-typescript/logo.jpg"
tags: ["typescript", "javascript"]
date: 2019-11-11T08:50:19+01:00
draft: false
---

Ostatnio wyszedł Typescript 3.7, który zawiera kilka oczekiwanych przez programistów funkcjonalności. Dziś chciałbym opowiedzieć o dwóch nowościach na które sam czekałem i które mogą uprościć tworzony przez nas kod czyli `Optional Chaining` i `Nullish Coalescing`.

<!--more-->

## Optional chaining

Na sam początek funkcjonalność, którą możemy znaleźć np.: w języku Swift i pozwala na bardziej zwięzłe pisanie kodu. Kiedy piszemy kod i opakowujemy dane w obiekty mamy możliwość korzystania z opcjonalnych pól np.:

```ts
interface Obj {
    a: string,
    b?: {
        a: string,
        b?: {
            a: string
        }
    }
}

const obj:Obj = {
    a: 'a',
    b: {
        a: 'a',
        b: {
            a:'a'
        }
    }
}
```

Problem pojawia się gdy chcemy się dostać do tych wartości. Aby to zrobić musimy sprawdzić czy nasze pola faktycznie mają odpowiednią wartość

```ts
 obj.b.a //Object is possibly 'undefined'.

if (obj.b) {
    obj.b.a
}

if (obj.b && obj.b.b) {
    obj.b.b
}
```

Dzięki nowej funkcjonalności jesteśmy w stanie skrócić powyższy zapis do czytelniejszej formy

```ts
obj.b?.a
obj.b?.b?.a
```

Jeśli pola `obj.a i obj.b.b` są różne od `null` lub `undefined` to dostaniemy wartość zmiennej, która znajduje się w tym obiekcie. Jeśli w którymkolwiek momencie okaże się, że zmienne nie posiadają wartości to dostaniemy w wyniku wartość `undefined`

```ts
 
const obj:Obj = {
    a: 'a',
    b: {
        a: 'a',
    }
}

obj.b?.b?.a // undefined
```


Oprócz możliwości dostania się do pola w obiekcie możemy również wykorzystać to do odwołania się do elementu w tablicy

```ts
 interface Tab {
    a?: number[]
}

const obj2: Tab = {
    a: [0,1]
}

obj2.a[0] // Object is possibly 'undefined'.
obj2.a?.[0]

```

Ostatnia możliwość to wywołanie funkcji

```ts
interface Fun {
    a?: ()=>void
}

const obj3: Fun = {
    a: () => { }
}

obj3.a() // Object is possibly 'undefined'.
obj3.a?.()
```


## Nullish Coalescing

Druga nowość to `Nullish Coalescing` o którym myślę jako domyślnej wartości. Do tej pory mogliśmy ustawiać domyślną wartość na dwa sposoby 

```ts
    value ? value : default
    value || default
```

Oba sposoby mogą jednak powodować niechciane efekty uboczne np.:
```ts
const example = 0;
const defaultValue = 1;

console.log(example ? example : defaultValue);
console.log(example || defaultValue) 
```

Nawet jeśli dopuszczamy wartość `0` jako poprawną to taki zapis powoduje, że zostanie ona zastąpiona wartością domyślną. Oczywiście da się temu zapobiec dodając dodatkowe warunki ale wydłuża to niepotrzebnie kod. Nowy `Nullish Coalescing` zwróci wartość domyślną tylko jeśli zmienna ma wartość `null` lub `undefined`. W każdym innym przypadku będzie to oryginalna wartość zmiennej

```ts
console.log(null ?? 1); // 1
console.log(undefined ?? 1); //1
console.log(0 ?? 1); //0
console.log(NaN ?? 1); //NaN
console.log('' ?? 1); // ''

```


A jak wam się podobają nowe funkcjonalności? Zaktualizowaliście już Typescript'a w waszych projektach? Będziecie używać tych funkcjonalności czy może już z nich korzystacie? No i najważniejsze - za chwilę te nowości będą też dostępne w czystym JavaScript.

