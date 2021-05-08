---
title: "Fastify + Hotwire - nowy (lepszy?) pomysł na frontend"
slug: "hotwire-w-fastify"
author: "Feridum"
image: "./logo.png"
tags: ["fastify", "hotwire", "frontend", "backend"]
date: "2021-05-11T16:00:00.685Z"
---

Obstawiam, że 90% aktualnie tworzonych aplikacji opiera się na podział frontend, backend i przesył danych pomiędzy nimi w postaci JSON'a. Frontend prosi o dane i gdy je otrzymuje, to odpowiednio modyfikuje wygląd strony. A może można przesyłać coś innego niż JSON?

<!--more-->
## Co przesyłamy między przeglądarką a serwerem?

Frontend i backend muszą się jakoś komunikować. Jak to wyglądało na przestrzeni lat? Na początku backend i frontend były jednym organizmem. Backend tworzył pliki HTML i wysyłał do przeglądarki. Proste. Tylko od strony UI/UX było słabe, ponieważ każde zapytanie było równoznaczne z odświeżeniem strony.

Wtedy zaczęto rozdzielać frontend od backendu. Ciężar odświeżania danych jest teraz na frontendzie. Frontend tworzy UI, wysyła zapytania o dane i odświeża UI strony. Backend musi tylko zwrócić dane w postaci JSON'a. Nie interesuje go już, co zostanie z tymi danymi zrobione. Od strony UI/UX jest już spoko, ale są inne problemy - SEO, duplikowanie stanu, konieczność synchronizacji itp.

Teraz zaczynamy próbować podejścia hybrydowego. Mamy backend, który tworzy część widoków, a część zwraca jako kod JS'a by sam się sobą zajął. W Ruby pojawił się ostatnio inne podejście oparte o wysyłanie do frontendu fragmentów HTML'a, które trzeba zaktualizować. Oto Hotwire.

## Czym jest Hotwire?

Hotwire (HTML over the wire) jest nowym pomysłem na przesyłanie danych pomiędzy frontendem a backendem. Został stworzony przez Basecamp i polega na wysyłaniu fragmentów HTML zamiast JSON'a. Dzięki temu, że strona jest budowana na backendzie, to ładuje się szybko i cały stan aplikacji jest trzymany w jednym miejscu. Co więcej, dzięki przesyłaniu fragmentów HTML'a nie musimy przeładować całego widoku, tylko pojedyncze elementy - tak jak w SPA.

## Jak Hotwire wygląda w praktyce?

Do zabawy z Hotwire wykorzystałem Fastify. Aby to dodać wykorzystałem wtyczkę `fastify-hotwire`, która umożliwia prostą implementację tego rozwiązania. 

```jsx
npm i fastify-hotwire --save
```

Teraz zostaje kwestia dodania wtyczki do Fastify 

```jsx
fastify
    .register(import('fastify-hotwire'), {
        templates: join(__dirname, 'views'),
        filename: join(__dirname, 'worker.js')
    })
    .register(import('fastify-formbody'))
```

Drugą wtyczkę dodałem do poprawnej obsługi formularzy i odczytu danych z formularza. To, co musimy podać przy rejestracji wtyczki `fastify-hotwire`, to jest folder, gdzie będziemy trzymać widoki oraz plik odpowiedzialny za renderowanie plików. Mamy tutaj pełną dowolność, jeśli chodzi o wybór narzędzia do tworzenia widoków. Ja skorzystałem z `ejs`, który jest dosyć popularny, ale możesz skorzystać z dowolnej biblioteki.

```jsx
import ejs from 'ejs'

export default async ({ file, data, fragment }) => {
   const body = await ejs.renderFile(file,data)

   return body
}
```

Cała aplikacja to bardzo podstawowa wersja TODO list - czyli jest możliwość dodawania zadań i ustawianie ich jako ukończonych. Jak to wygląda w praktyce?

## Wyświetlanie głównego widoku

Na początek wyświetlenie wszystkich elementów. Aby to zrobić musimy obsłużyć zapytanie GET na adresie `/`.

```jsx
fastify.get('/', async (req, reply) => {
    return reply.render('index.ejs', { tasks: tasks })
})
```

Dzięki zarejestrowaniu `fastify-hotwire` mamy dostępne w obiekcie `reply` dodatkowe metody. Podstawową z nich jest `render`, która  renderuje całą stronę. Plik `index.ejs` prezentuje się następująco.

```jsx
//index.ejs
<head>
    <script src="https://unpkg.com/@hotwired/turbo@7.0.0-beta.4/dist/turbo.es5-umd.js"></script>
</head>

<form action="/task" method="POST" style="margin-top: 40px">
    <input name="content" type="text" />
    <button type="submit">Create New Task</button>
</form>

<%- include('tasks'); %>
```

To, co najważniejsze, to skrypt hotwire w nagłówku. Reszta plików prezentuje się następująco. Są odpowiedzialne za wyświetlenie listy zadań oraz wyświetlenie pojedynczego elementu.

```jsx
//tasks.ejs

<table id='tasks'>
        <% tasks.forEach(function(task){ %>
                <%- include('task', {task: task}); %>
        <% }); %>
</table>
```

```jsx
// task.ejs

<tr id="task_<%= task.id %>">
    <td style="width: 200px">
        <%= task.name %>
    </td>
    <td style="width: 200px">
        <%= task.status %>
    </td>
    <td style="width: 200px">
            <form action="/finish-task" method="POST" style="margin-bottom: 0;">
                <input value="<%= task.id %>" name='id' style="visibility: hidden; width: 0">
                <button type="submit">Finish</button>
            </form>
    </td>
</tr>
```

## Dodawanie nowych zadań

Aby dodać nowe zadania, bez konieczności przeładowania strony, skorzystałem z Turbo Streams. Jest to dodatkowo wspierane przez użytą przeze mnie bibliotekę. Sprowadza się to do następującego kodu.

```jsx
fastify.post('/task', async (req, reply) => {
    const newTask = { id: tasks.length, name: req.body.content, status: 'TODO' };
    tasks.push(newTask)

    return reply.turboStream.append(
        'task.ejs',
        'tasks',
        { task: newTask }
    )
})
```

Cały kod sprowadza się do wyrenderowania nowego zadania przy pomocy pliku `task.ejs`, oraz dodanie tego do elementu HTML, który ma `id="tasks"`. 

## Zmiana statusu zadania

Tutaj jest podobnie. W pliku `task.ejs` jest mały formularz, który umożliwia zmianę statusu zadania. Kod na backendzie, który to umożliwia, wygląda następująco.

```jsx
fastify.post('/finish-task', async (req, reply) => {
    const id = req.body.id;

    tasks[id] = { ...tasks[id], status: 'FINISHED' }

    return reply.turboStream.replace(
        'task.ejs',
        `task_${id}`,
        { task: tasks[id] }
    )
})
```

Tutaj wykorzystałem metodę `replace`. Wyszukuje ona element HTML o podanym `id` i zamienia zawartość.

Ogólnie koncept mi się podoba. Jest to kolejna próba połączenia frontendu i backendu do jednego projektu, ale z lepszym UX dla użytkownika. Myślę, że podobne koncepty będą się pojawiały coraz częściej. A ty co o tym sądzisz?
