---
title: "Prisma i Fastify - podstawowe operacje CRUD"
slug: "prisma-fastify-basic-crud"
author: "Feridum"
image: "./logo.png"
tags: ["prisma", "fastify", "crud"]
date: "2022-01-23T14:48:35.233Z"
---

Prisma jest biblioteką, która ułatwia pracę z bazą danych. Do podstawowych operacji na bazie danych należy tzw.: CRUD - create, read, update i delete. W poście pokazuję, jak wyglądają takie operacje w Prisma i Fastify.

<!--more-->


## Wolisz Video?

Na YouTube dodałem film, gdzie pokazuję krok po kroku, jak tworzę takiego CRUD’a. Jeśli wolisz tę formę, to zapraszam. Nie zapomnij polubić film i zasubskrybować.

`youtube: https://youtu.be/Ya7WJwvlTxE`

## Konfiguracja Prisma w projekcie

Na tym etapie zakładam, że masz utworzony projekt Fastify(lub dowolną inną biblioteką backendową). Prisma najprościej jest skonfigurować przy pomocy polecenia

```jsx
npx prisma init
```

Powoduje to powstanie:

- pliku .env z wartością DATABASE_URL, którą trzeba poprawnie uzupełnić
- plik prisma/schema.prisma z zawartością

```jsx
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Jest to nic innego jak oznaczenie, że korzystamy z klienta js i korzystamy z bazy danych postgressql. Inne bazy danych, z jakich możesz skorzystać to: 

- PostgreSQL
- MySQL
- SQLite
- AWS Aurora
- Microsoft SQL Server
- Azure SQL
- MongoDB (preview)
- PlanetScale (preview)

Pełną listę wspieranych wersji znajdziesz tutaj: [Wspierane bazy danych w Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases).

To, co musisz zrobić to stworzyć model, na którym będziesz pracować. Poniżej daję przykład, ale możesz stworzyć własny według uznania.

```jsx
model Post {
  id      Int    @unique @default(autoincrement())
  title   String
  content String
}
```

Krótkie wyjaśnienie co tu się dzieje. `Int` oraz `String` to typy pól, jakie będą w bazie danych. Dużo ciekawsze są atrybuty `@unique` i `@default`. Dodają one specjalnie zachowanie do kolumn w bazie danych. 

- `@unique` - wartości w kolumnie muszą być unikalne
- `@default(autoincrement())` - ta kolumna ma wartości domyślnie w postaci kolejnych liczb.

> Twoje zmiany są lokalne dopóki nie zrobisz migracji

Migracja to jest operacja, która przekształca obcy schemat bazy danych do nowej postaci. Będziesz ją wykonywał za każdym razem, gdy zmienisz coś w modelu. Aby wygenerować migrację i przesłać do bazy danych wpisz komendę: 

```jsx
npx prisma migrate dev
```

Utworzy to plik migracji oraz zastosuje migrację na bazę danych, z którą jesteś połączony (o ile dobrze wypełniłeś plik .env). Spowoduje to też wygenerowanie klienta, którego będziemy używać w następnych krokach.

## Inicjalizacja Prisma Client

Tutaj jest krótki kawałek kodu:

```jsx
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
```

Tyle wystarczy, by korzystać z Prisma w kodzie.

## Operacja Create

```jsx
fastify.post('/post', async(request) =>{
  return prisma.post.create({data: request.body})
})
```

Bardzo prosta operacja, która stworzy nowy wiersz w tabeli Post. Co tu się dzieje?

- .post → zgodnie z REST do tworzenia nowych zasobów jest wykorzystywana metoda POST
- prisma.post.create - jest to operacja asynchroniczna, która utworzy nowy post i zwróci wynik polecenia (czyli nowy post)
- {data: request.body} - najważniejsze pole, jakie trzeba uzupełnić z danymi do utworzenia nowego obiektu w bazie danych

Przykładowy obiekt, który trzeba wysłać jako body

```jsx
{
	"title": "test",
	"content":  "kontent"
}
```

I gotowy CURL

```jsx
curl --request POST \
  --url http://localhost:3000/post \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "test",
	"content":  "kontent"
}'
```

## Operacja Read

```jsx
fastify.get('/post', async()=>{
  return prisma.post.findMany();
})

fastify.get('/post/:id', async(request)=>{
  return prisma.post.findUnique({
    where:{
      id: Number(request.params.id)
    }
  });
})
```

Jedna z najczęściej wykorzystywanych operacji. W Prisma możemy dane pobierać na 3 różne sposoby:

- findMany - zwraca listę rekordów
- findUnique - zwraca jeden rekord wykorzysując id albo unikalny atrybut
- findFirst - zwraca pierwszy element z listy, która pasuje do kryteriów

Domyślnie parametry zapytania są typu String, a moje ID w bazie istnieje jako Int i dlatego konieczna była konwersja.

I curle do testowania

```jsx
curl --request GET \
  --url http://localhost:3000/post/4
```

```jsx
curl --request GET \
  --url http://localhost:3000/post
```

## Operacja Update

```jsx
fastify.put('/post/:id', async (request, reply)=>{
  return prisma.post.update({
    where:{
      id: Number(request.params.id)
    },
    data: request.body
  })
})
```

Zgodnie z REST mamy tutaj operację PUT. Operacja Update jest bardzo podobna do create i read.

Jeśli przeanalizujesz kod, to zauważysz, że mamy tu sekcję związaną z pobraniem pojedynczego kodu (zerknij do findUnique wyżej) i tworzenia nowych obiektów.

Podobnie jak w przypadku Create dostaniemy w odpowiedzi zmodyfikowany obiekt.

## Operacja Delete

```jsx
fastify.delete('/post/:id', async (request, reply)=>{
  return prisma.post.delete({
    where:{
      id: Number(request.params.id)
    }
  })
})
```

Na sam koniec operacja usuwania pojedynczego obiektu. Zgodnie z REST do takiej operacji służy `delete`. Podobnie jak przy operacji Update, tutaj też widać podobieństwa do findUnique.

Jako rezultat otrzymamy skasowany obiekt. Jeśli obiekt nie zostanie znaleziony, to w odpowiedzi będzie null.

Co sądzisz o tej bibliotece? Bardzo mi się spodobała i będę z niej korzystał więcej. Daj znać co o tym myślisz na Fb/Inst/Twitter.