---
title: "7 typów w Typescript, które ułatwią ci życie"
slug: "typescript-utility-types"
author: "Feridum"
image: "./logo.jpg"
tags: ["typescript", "utility types"]
date: 2021-01-18T16:00:00+01:00
---

Pisząc w Typescript mamy bardzo duże możliwości konstruowania własnych typów. Ale czasami nie ma co tworzyć czegoś drugi raz. Warto znać zestaw `Utility types`, które przyspieszą naszą pracę i wyeliminują powtarzalność w typowaniu.

<!--more-->

## Partial\<T>

Bardzo wygodny **typ, który ustawia wszytskie pola w naszym typie jako opcjonalne**. Możemy go wykorzystać, kiedy tworzymy metodę tworzącą obiekt o konkretnym typie.

```javascript
type Person = {
    name: string,
    age: number,
}

const createPerson = (person: Partial<Person>): Person=>{

    return {
        name: 'Default',
        age: 0,
        ...person
    }
}
```

W tym przypadku tworzymy obiekt ręcznie (nadając jakieś domyślne wartości), ale można je nadpisać. No i mamy tylko jeden obiekt do zmiany w przyszłości.

## Required\<T>

Tutaj mamy odwrotność typu Partial. **Typ Required ustawia wszytkie pola jako obowiązkowe**. Dobry typ do wykorzystania przy typowaniu API. Czasami dostajemy jako odpowiedź wartości puste. A do reszty systemu dobrze jest przekazywać konkretne wartości. Na styku tych dwóch podejść korzystamy z Required i dajemy puste wartości. Typ ten nie usuwa natomiast opcji null z pola

```javascript
type ApiPerson = {
    username?: string
    email: string | null
}

type Person = Required<ApiPerson>

const person: Person = {
    email: null,
    username: ''
}
```

## Record<K, T>

Jeden z moich ulubionych typów. **Określa typ obiektu, którego klucze są opisane typem K (enum albo unia) oraz o wartościach typu T**. Korzystam z niego zawsze, gdy mam do otypowania jakiś obiekt o konkretnej strukturze. Bardzo przyjemnie się go wykorzystuje razem z enumem do tworzenia obiektów konfiguracyjnych.

```javascript
enum FormTypes {
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD'
}

type Form = {
    title: string,
    fields: string[],
}

const settingsForm:Record<FormTypes, Form> = {
    [FormTypes.EMAIL]: {title: 'Change email', fields: ['email', 'password']},
    [FormTypes.PASSWORD]: {title: 'Change password', fields: ['oldPassword', 'newPassword']},
}
```

Są dwie zalety takiego typowania. Po pierwsze musimy określić obiekt dla wszystkich możliwych wartości klucza. Dzięki temu nie ma opcji, by zapomnieć o konkretnej wartości w przyszłości podczas modyfikacji typu. Druga zaleta to kontrola wartości obiektu.

## Pick<T, K>

**Pick pozwala na stworzenie nowego typu z typu T. W nowym typie będą tylko obecne pola, które określiliśmy typem K**. Będzie to pomocne, gdy musimy otypować część obiektu. Moglibyśmy tworzyć nowy typ od zera, ale jest nieoptymalne.

```javascript
type User = {
    firstname: string,
    lastname: string,
    age: number,
}

const greet = (name: Pick<User, "firstname" | 'lastname'>) =>{

    return `Hello ${name.firstname} ${name.lastname}`
}
```

A dlaczego nie stworzyć nowego typu? Ponieważ w razie aktualizacji obiektu User od razu mamy informacje czy reszta systemu będzie działała poprawnie, bo np.: backend zmienił sposób wysyłania odpowiedzi.

## Omit<T,K>

Podobnym typem jest Omit. **Tutaj bierzemy cały nasz typ i usuwamy klucze, by utworzyć nowy typ**. Przykład pokazany przy typie Pick będzie wyglądał następująco.

```javascript
type User = {
    firstname: string,
    lastname: string,
    age: number,
}

const greet = (name: Omit<User, "age">) =>{

    return `Hello ${name.firstname} ${name.lastname}`
}
```

Musimy pamiętać, że w przyszłości gdy będziemy dodawać kolejne pola, to będą też wymagane jako argument funkcji. Musisz zdecydować czy to jest to, co chcesz osiągnąć czy lepiej użyć typu Pick.

## NonNullable<T>

**NonNullable potrafi usunąć puste wartości (null i undefined) z typu**. Może to być pomocne gdy mamy opcjonalną wartość. Najczęściej będziemy wtedy określać wartość domyślną. Wtedy w kolejnych miejscach systemu możemy dać typ NonNullable, by ominąć sprawdzanie.

```javascript
type ApiUsername = string | null

const mapApiUsername: (username: ApiUsername) => NonNullable<ApiUsername> = (username) =>{
    return username ?? '';
}
```

## ReturnType<T>

ReturnType jest bardzo ciekawym typem - dzięki niemu dostajemy typ, jaki jest zwracany przez funkcję typu T. Najlepiej pokaże to przykład

```docker
const a: ReturnType<()=>number>; // a jest typu number
```

Nie przychodzą mi do głowy żadne przykłady, gdzie można by z tego skorzystać. Może do otypowania wyniku jakieś funkcji z biblioteki. Daj znać, czy masz pomysł do czego to wykorzystać? 

## Czy to już wszystkie typy?

Nie, jest jeszcze parę typów, których nie opisałem w tym poście - nie zdarzyło mi się z nich jeszcze korzystać w kodzie. Natomiast te powyżej opisane wykorzystuję często i **zachęcam do wypróbowania - nasz kod będzie mniejszy, czytelniejszy i bardziej odporny na błędy związane z modyfikacją typów**.

A jakie jeszcze mamy typy?

- Exclude<Type, ExcludedUnion>
- Extract<Type, Union>
- Parameters<Type>
- ConstructorParameters<Type>
- InstanceType<Type>
- ThisParameterType<Type>
- OmitThisParameter<Type>
- ThisType<Type>

Zachęcam do poczytania, wykorzystania w waszym kodzie i łączenia tych typów w różne kombinacje.