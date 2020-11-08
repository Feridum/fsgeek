---
title: "Asynchroniczność w JavaScript"
slug: "asynchronicznosc-w-javascript"
author: "Feridum"
image: "../images/asynchronicznosc-js/logo.jpg"
tags: ["javascript", "asynchronicznosc", "Promise", "async/await", "callback"]
date: 2019-02-06T15:55:00+01:00
draft: false
---

Asynchroniczność to chleb powszedni dla programistów JavaScript. Przez jednych uwielbianych, przez innych nienawidzony ale nie można odmówić mu użyteczności. Oczywiście istnieje kilka sposobów jak można sobie z nią poradzić oraz jeszcze więcej pułapek na które trzeba uważać podczas używania tych rozwiązań. Warto wiedzieć jakie mamy możliwości do wyboru oraz czym się różnią od siebie.
<!--more-->

## Co to jest asynchroniczność?

Zanim opiszę jak sobie radzić z asynchronicznością najpierw parę słów na temat tego konceptu. Trzeba zacząć od tego że JavaScript był do tej pory jednowątkowy - wątki zostały dopiero co dodane do Node'a i nie są jeszcze popularne ale to może się zmienić za jakiś czas. Problemem przy takim jednowątkowym działaniu są długo trwające operacje, które potrafią zamrozić stronę i uniemożliwić wykonywanie operacji na niej. Synchroniczny kod przechodzi linijka po linijce wykonując po kolei instrukcje które się w nich znajdują. Jeśli jakaś linijka zawierałaby dużą operację np.: czytanie z pliku lub pobranie wartości z serwera to wykonywanie reszty kodu byłoby wstrzymane do momentu ukończenia aktualnej.  

```js
const fs = require('fs');


console.log(1)
const content = fs.readFileSync('./file.txt', 'utf8')
console.log(content)
console.log(2)

//1
//File content
//2

```

W przypadku gdy robimy to asynchronicznie to operacja (znowu jako przykład można podać wczytywanie pliku lub pobieranie wartosći z serwera) jest tylko inicjowana ale program nie czeka na jego ukończenie tylko wykonuje kolejne polecenia. W momencie gdy nasza asynchroniczna akcja się zakończy program jest o tym informowany i można wykonać operacje na danych.

```js
const fs = require('fs');


console.log(1)
fs.readFile('./file.txt', 'utf8' ,(err, content)=>{
    console.log(content)
})
console.log(2)

//1
//2
//File content
```

## Callback hell

Na samym początku do obsługi asynchronicznych wywołań służyły tak zwane `callback's` czyli tak naprawdę zwykłe funkcje. Są one przekazywane do operacji, które wykonują asynchroniczne wywołania i zawierają kod, który obsłuży akcję gdy ta się wykona zarówno pozytywnie jak i w przypadku wystąpienia błędu. Takie funkcje możemy na przykład zobaczyć w operacjach dotyczących operacji na plikach w Node.js.

```js
fs.readFile('./file.txt', 'utf8' ,(err, content)=>{
    // obsługa naszego pliku
})
```

Dla pojedynczych operacji sprawdza się idealnie. Problem pojawia się w momencie gdy potrzebujemy wykonać kilka zapytań asynchronicznych i każde z nich polega na poprzednim. Jest to bardzo częsty przypadek w przypadku aplikacji gdy najpierw się logujemy i otrzymujemy dane użytkownika i następnie na podstawie tych danych pobieramy kolejne. Powstaje w ten sposób skomplikowany kod z dużą ilością zagnieżdżeń nazywany zazwyczaj: `callback hell`

```js
fs.readFile('./a.txt', 'utf8' ,(err, file)=>{
    fs.readFile(content, 'utf-8', (err, content) =>{
        // obsługa naszego pliku lub kolejne zapytania
    })
})
```

## Promises
Funkcjonalność Promise'ów została dodana w ES6, zastępując istniejące dotychczas funkcje callback(oczywiście same callbacki zostały ale w nowych rozwiązaniach nie są już spotykane). Obiekty typu Promise "obiecują" wykonanie pewnej czynności i następnie zwrócenie rezultatu lub wyrzucenie błędu. Obiekt ten zawsze występuje w jednym z trzech stanów : 

- `Pending` - wywołanie zostało zainicjowane ale jeszcze nie ukończone
- `Fullfilled` - wywołanie zakończone sukcesem
- `Rejected` - wywołanie zakończone porażką

W zależności od wyniku Promise ostatecznie trafia do jednego z dwóch ostatnich stanów - nie może istnieć jednocześnie w obu. W zależności od tego w jakim stanie skończy nasz Promise to mamy inne metody do jego obsługi.

Dla stanu `Fullfiled`:

```js
Promise(...).then(result=>{
    //obsługa rezultatu Promise'a
})

``` 

Dla stanu `Rejected`: 

```js
Promise(...).catch(error=>{
    //obsługa błędu Promise'a
})
```

Teraz możemy przepisać nasz kod który pobiera wartość z pliku tekstowego tak aby używał Promise'a. 

```js
const fs = require('fs').promises

fs.readFile('./a.txt', 'utf-8').then(console.log)

```

Zapis mi osobiście bardziej odpowiada i sprawia, że kod się czyta dużo bardziej naturalnie. Należy zwrócić tutaj uwagę na import biblioteki `fs`. Użyłem tutaj zestawu metod, które wykorzystują Promise'y. Tutaj tylko ostrzeżenie - jest to funkcjonalność [eksperymentalna](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api) więc nie korzystajcie z niej na produkcji.

Konstrukcja Promise'ów pozwala nam również w prosty sposób poradzić sobie z problemem, który powodował powstanie callback hell. Mianowicie w metodach obsługujących zakończone czynności możemy zwrócić kolejnego Promise'a, którego będziemy oczekiwali w następnej metodzie itd. Taka sytuacja jest określana mianem `Promise chaining` i pozwala na wygodną obsługę wyniku zwróconego przez Promise'a.

```js
const fs = require('fs').promises

fs.readFile('./a.txt', 'utf-8').then((path)=>fs.readFile(path, 'utf-8')).then(console.log)

```

Więcej o Promise'ach możesz przeczytać tutaj - [Promise.all(), .allSettled(), .race(), any()](https://fsgeek.pl/post/javascript-promise-all-allsettled-race-any/)


## Async/await

Na sam koniec zostawiłem wisienkę na torcie czyli składnię `async/await`, która pojawiła się prawie zaraz po Promise'ach ponieważ już w ES7. Jest to inny sposób w jaki możemy sobie poradzić z Promise'ami - a dokładniej jak sprawić by kod asynchroniczny zapisać jako synchroniczny. Mamy tutaj dwa nowe słowa kluczowe, które najczęściej stosujemy razem: `async` i `await`.  Słowo `async` stosujemy tylko do funkcji - oznaczamy tym, że funkcja zawsze zwraca Promise'a nawet jeśli zwracana wartość nim nie jest. 

```js
const readFile = async ()=> {
    return 'test'
}

readFile().then(console.log) //test
```


Drugie zastosowanie jest związane z słowem kluczowym `await` - możemy go stosować tylko wewnątrz funkcji `async`. 
Słowo await powoduje, że program czeka z przejściem do następnej linii w kodzie do momentu zakończenia się asynchronicznej akcji, która jest tuż za tym słowem.

```js
const readFile = async ()=> {
    const resultA = await fs.readFile('./a.txt', 'utf-8')
    const resultFile = await fs.readFile(resultA, 'utf-8');

    return resultFile
}
```

W ten sposób możemy pisać kod asynchroniczny ale który wygląda na synchroniczny. Mamy pewność, że w momencie gdy program przechodzi do następnej linii to interesująca nas wartość jest już obecna i czeka na wykorzystanie. Nawet nie musimy w przypadku dwóch ostatnich linijek korzystać z `await` tylko skorzystać z właściwości funkcji `async` i bezpośrednio zwrócić Promise'a.

```js
const readFile = async ()=> {
    const resultA = await fs.readFile('./a.txt', 'utf-8')
    return fs.readFile(resultA, 'utf-8');
}
```

Oczywiście dzisiaj przedstawiłem pokrótce najpopularniejsze sposoby na poradzenie sobie z asynchronicznością. Temat jest tak obszerny, że o każdej z tych metod można napisać osobny post. Ja najczęściej wykorzystuję Promise'y ale ostatnio również korzystam dużo z async/await i pracuje mi się z tym bardzo wygodnie. A wy z czego korzystacie? 

Jeśli ten wpis był dla ciebie pomocny i znasz kogoś, komu też mógłby pomóc - wyślij mu ten post - na pewno będzie Ci za to wdzięczny, 