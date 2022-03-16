---
title: "Jak ogarnąć relacje w bazie danych - Prisma i Fastify"
slug: "relacje-baza-danych-prisma-fastify"
author: "Feridum"
image: "./logo.png"
tags: ["prisma", "fastify", "bazy danych"]
date: "2022-03-17T09:00:00.585Z"
---

Relacje leżą u podstaw baz relacyjnych. Bez nich nie bylibyśmy w stanie tworzyć tak zaawansowanych modeli. W dzisiejszym poście pokazuję, jak można dodać relacje do bazy danych w Prisma.

<!--more-->


## Wersja YouTube

`youtube: https://youtu.be/sgCpMHCc6F0`

## Relacja 1:1 - jeden do jednego

Relacja jeden do wielu charakteryzuje się silnym powiązaniem dwóch elementów. Przykładem takiej relacji, może być relacja użytkownik <-> autor w systemie blogowym. Pomyśl np.: o Medium. Możesz się tam zalogować jako użytkownik, ale nie musisz od razu być autorem. Oczywiście, nie wiem jak oni, mają to zaimplementowane pod spodem, ale mogłyby do tego służyć dwie osobne tabele z relacją 1:1. **Czyli użytkownik może mieć tylko jedno konto autora, a autor może być przypisany tylko do jednego użytkownika**. Jak by to wyglądało w Prisma?

```
model Author {
  //inne pola
  user        User   @relation(fields: [userId], references: [id])
  userId      Int    @unique
}

model User {
  //inne pola
  author   Author?
}

```


W przypadku relacji 1:1 jedna strona relacji będzie trzymała informacje o tej relacji (będzie to kolumna z ID obiektu z drugiej tabeli). Na co warto zwrócić uwagę przy tworzeniu schemy:
- Author? - oznacza, że relacja z tej strony jest opcjonalna, czyli użytkownik może istnieć bez autora.
- User - w tym przypadku relacja jest obowiązkowa, czyli w momencie tworzenia autora musi być podpięty tam użytkownik.
- @relation(fields: [userId], references: [id]) - ustawienia relacji, fields: lista pól w danym modelu, references: lista pól w modelu, do którego robimy relacje.

## Relacja 1:n - jeden do wielu

W odróżnieniu od 1:1 tutaj mamy już więcej elementów. Przykładem z systemu blogowego może być relacja między autorem a artykułem. **Czyli autor może mieć wiele różnych artykułów, ale artykuł może mieć tylko jednego autora**. 

```
model Post {
  author   Author @relation(fields: [authorId], references: [id])
  authorId Int
}

model Author {
  posts       Post[]
}
```

W przypadku relacji 1:n informacja o relacji jest trzymana po stronie 1. Czyli skoro post może mieć tylko jednego autora, to informacje o autorze trzymamy w poście. Po stronie Postu wygląda to, jak relacja 1:1. Jedyna różnica jest w modelu autora, gdzie przy pomocy Post[] deklarujemy, że autor może mieć wiele postów. Natomiast jak zerkniemy do tabel w bazie danych, to nie zobaczymy tablicy postów u Autora.

## Relacja m:n - wiele do wielu 
Na sam koniec relacja wiele do wielu. Kontynuując przykład systemu blogowego, niech będą to tagi do artykułu. **Jeden tag może być przypisany do wielu artykułów oraz jeden artykuł może mieć wiele tagów**. 


```
model Post {
  tags Tag[]
}

model Tag {
  name String @id
  posts Post[]
}
```


Jeśli chodzi o konfigurację to relacja n:m jest najprostsza. Definiujemy w obu obiektach, że mogą przechowywać tablicę innych obiektów. I tyle. Od strony bazy danych jest to bardziej skomplikowane, ponieważ musimy stworzyć tzw. tabelę łączącą. Najczęściej w ten sposób mamy w tabeli dwie kolumny, które będą przechowywać ID tabel, które są w relacji. Może wyglądać to następująco:

| tagId | postId | 
| ----- | ---- |
|1| 1|
|1| 2|
|2| 2|

I takich par może być bardzo dużo. Za każdym razem, gdy przypiszemy tag do naszego postu to powstanie nowy wiersz w tabeli. Czyli stworzenie nowego artykułu z 3 tagami powoduje, że w tabeli łączącej powstaną 3 nowe rekordy. Trzeba o tym pamiętać.

## Skąd mam wiedzieć jaką relację zastosować?

To jest najcięższe pytanie. Nie znam idealnego procesu, który pozwoli ci dobrać odpowiednią relację. Jeśli zastanawiasz się jaką relację dać między obiektami A i B to zadaj sobie pytania:
- czy obiekt A może mieć wiele obiektów B (czy A będzie mieć zależność do 1, czy więcej obiektów B)
- czy obiekt B może mieć wiele obiektów A (czy B będzie mieć zależność do 1, czy więcej obiektów A)

Kluczem do sukcesu jest dobre przeanalizowanie obiektów i wymagań biznesowych. Jeśli nie wiesz jaką relację to zadaj biznesowi dodatkowe pytania.

Popatrz na przykład z relacją między autorem a artykułem. Założyłem, że artykuł może mieć tylko jednego autora. Są czasami artykuły, które mają kilku autorów. I tu się pojawia kolejne pytanie.

## Czy takie same relacje będą w innym systemie?

Nie!

Wiele zależy od systemu, jaki tworzysz. W jednym systemie coś, co będzie relacją 1:n w innym może być n:m, a w jeszcze innym 1:1. Na etapie projektowania takich relacji warto się zastanowić, na czym nam zależy w systemie i jakie ograniczenia chcemy nałożyć na użytkownika. Musisz też pamiętać, że każda aplikacja jest unikalna i nie możesz ślepo przenosić rozwiązań z innych aplikacji do siebie.