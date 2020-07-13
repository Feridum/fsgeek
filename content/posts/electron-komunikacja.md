---
title: "Komunikacja między widokiem a głównym wątkiem w Electronie"
slug: "komunikacja-miedzy-widokiem-a-glownym-watkiem-w-electronie"
author: "Feridum"
image: "../images/electron-komunikacja/logo.jpg"
tags: ["Electron", "Electronjs", "Javascript", "React"]
date: 2019-04-10T16:50:00+02:00
draft: false
---

Jak tworzymy aplikację w Electronie to widok i główna część aplikacji są od siebie oddzielone. Jednak czasami możemy potrzebować odwołać się z widoku do głównego wątku aby na przykład wyświetlić powiadomienie lub też powiadomić widok o zdarzeniu, które nastąpiło w głównym wątku. Pytanie jak to zrobić w Electronie? 

<!--more-->

## Korzystanie z funkcji Electrona  w React.js

Zanim przejdziemy do głównej części wpisu należy zacząć od tego jak zaimportować funkcje z Electrona (jak na przykład wykorzystywany w dzisiejszym poście `ipcRenderer`). Okazuje się, że nie jest to tak proste jak myślałem na początku. Po przejrzeniu odpowiedzi na Githubie i StackOverflow udało mi się wypracować takie rozwiązanie:

```ts
const electronWindow: any = window
const { ipcRenderer } = electronWindow.require("electron");


export {
    ipcRenderer
}
```

Postanowiłem umieścić wszystkie importowane metody w jednym pliku tak aby było możliwe w miarę prostą zmianę tego sposobu na inny. Należy pamiętać, że teraz nie uruchomimy naszej aplikacji w przeglądarce - nie ma tam funkcji `window.require` - od teraz możemy uruchomić nasz widok tylko wewnątrz Electrona. Nie mogę powiedzieć, że jestem w pełni zadowolony z tego rozwiązania ale póki co nie wymyśliłem niczego lepszego. A może wy znacie lepszy sposób by sobie poradzić z importowaniem tych metod do Reacta(najlepiej tak by nie musieć robić ejecta)?

## Komunikacja widok -> wątek główny
Najczęstsza sytuacja kiedy zachodzi potrzeba komunikacji to gdy chcemy uzyskać jakąś informację od głównego wątku lub też chcemy mu coś przekazać. Pierwszym sposobem wymiany danych jest komunikacji asynchroniczna czyli sytuacja gdy wysyłamy wiadomość i odpowiedź może przyjść po jakimś czasie. Jest to idealne rozwiązanie jeśli wypracowywanie odpowiedzi może portwać jakiś czas a my nie chcemy blokować widoku w oczekiwaniu na nią. Zacznijmy od początku czyli wysłania wiadomości: 
 
```ts
    ipcRenderer.send('async', 'message from renderer')
```

Pierwszy parametr określa nazwę kanału na który wysyłamy wiadomość, natomiast w drugim parametrze przesyłamy dane. Następnie mamy kod w głównym wątku odpowiedzialny za obsługę tej wiadomości

```ts
ipcMain.on('async', (event, payload) => {
  event.sender.send('async-reply', 'response from main')
})
```

Po pierwsze musimy ustawić nasłuchiwanie na wiadomości na konkretnym kanale. Pierwszy parametr w funkcji obsługującej zdarzenie przechowuje obiekt dotyczący aktualnego zdarzenia, natomiast w drugim są dostępne dane przesłane w wiadomości. Aby zwrócić wiadomość z powrotem do widoku możemy skorzystać z metody `send`, którą znajdziemy w polu `sender` w obiekcie `event`. Teraz zostało już tylko by obsłużyć powrotną wiadomość w kodzie React'a

```ts
ipcRenderer.on('async-reply', (event, payload) => {
    //obsługa odpowiedzi
})
```

Drugi sposób na komunikację pomiędzy widokiem a wątkiem głównym to komunikacja synchroniczna. Trzeba pamiętać, że blokuje ona dalsze wykonywanie kodu więc jeśli wypracowanie odpowiedzi zajmie dłużej to może to zablokować interakcje w aplikacji. Aby wysłać komunikat synchroniczny musimy wykorzystać inną metodę: 

```ts
const result = ipcRenderer.sendSync('sync', 'sync message from renderer')
```
 
Pola w funkcji mają tą samą rolę co w przypadku metody `send`. Ta metoda zwraca też od razu wynik. Teraz trzeba to tylko obsłużyć po stronie wątku. 

```ts
ipcMain.on('sync', (event, payload) => {
  event.returnValue = 'sync response';
})
```

Jedyna zmiana jaka jest w stosunku do komunikacji asynchronicznej to sposób zwracania danych.  Tutaj naszą odpowiedź musimy umieścić w polu `returnValue` obiektu `event`.

## Komunikacja wątek główny -> widok 

To teraz jak to zrobić w drugą stronę.  Jest to sytuacja raczej rzadka ale możemy czasami potrzebować informacji z głównego wątku np.: użytkownik MacOSX ustawił w systemie że chce używać Dark Theme więc powinniśmy zmienić kolory w naszej aplikacji. W poprzednim scenariuszu to widok inicjował wymianę danych. Wątek główny tylko odpowiadał na wiadomość dzięki metodzie `send`, która była w obiekcie zdarzenia. Ale jak sprawić by to wątek główny rozpoczął wymianę wiadomości kiedy nie mamy dostępnego tego obiektu? Musimy skorzystać z obiektu `webContents`, który posiada metodę `send` wysyłającą wiadomość na danym kanale do widoku. Najprościej się dostać do tego obiektu ze zmiennej przechowującej instancję stworzonego przez nas okna 

```ts
let win = new BrowserWindow({ width: 800, height: 600, frame: true })
  
win.webContents.on('did-finish-load', () => {
    win.webContents.send('from-main', 'finished loading')
})
```


Następnie po stronie widoku obsługujemy to identycznie jak w przypadku asynchronicznych zdarzeń. 
```ts
ipcRenderer.on('from-main', (event, payload) => {
  //obsługa zdarzenia
})
```

Jak najlepiej umieścić obsługę takich zdarzeń w aplikacji React'owej? Najprostsze rozwiązanie to umieścić to bezpośrednio w pojedynczym komponencie - tylko wtedy będzie to ograniczone do czasu jego życia. Bardziej uniwersalne rozwiązanie to zrobić to identycznie jak w przypadku obsługi Websocketów czyli umieścić albo w middlewarze albo w sadze. Równie dobrym pomysłem jest umieszczenie tego w React Context tak aby można było z tych informacji korzystać w kolejnych komponentach. Wiele tutaj zależy od architektury naszej aplikacji i do czego będziemy to wykorzystywać :) 


