---
title: "Worker Threads w Node.js"
slug: "worker-threads-w-nodejs"
author: "Feridum"
image: "../images/node-worker/logo.jpg"
tags: ["worker threads", "node.js", "javascript", "wielowatkowosc", "node"]
date: 2019-02-20T16:35:00+01:00
draft: false
---

Wielowątkowość jest obecna w prawie wszystkich językach programowania. W dobrych rękach potrafi działać cuda, przyspieszając program lub przenosząc kosztowne operacje do osobnego wątku tak aby nie obciążać aktualnego. Node.js z każdym rokiem staje się coraz popularniejszy i nic dziwnego, że w końcu i tutaj pojawiła się ta funkcjonalność. Co prawda póki co jest w fazie eksperymentalnej ale już warto się tym zainteresować.

<!--more-->

## Do czego nam się mogą przydać wątki?

Już dokumentacja dostarcza nam odpowiedzi na to pytanie. Wątków powinniśmy używać wszędzie tam gdzie mamy do czynienia z kodem, który mocno obciąża nasze CPU na przykład.: sortowanie dużych tablic, skomplikowane parsowanie plików lub też inne operacje na dużych zbiorach danych. Dzięki temu, że przekażemy obsługę tych przypadków do osobnego wątku to nie blokujemy Event Loopa w aplikacji Node.js. Oczywiście wątki nie są lekiem na wszystko i ich niewłaściwe stosowanie może przynieść więcej szkody niż pożytku. Należy pamiętać, że wywołanie wątku kosztuje nas czas i używanie ich do nieskomplikowanych czynności lub zbytnie rozdrabnianie danych może zwiększyć czas potrzebny na wykonanie algorytmu.


## Przykładowy kod dla Worker Threads

```js
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```


Jest to kod z oficjalnej dokumentacji Node.js i warto się nad nim chwilę zatrzymać i dobrze zrozumieć, ponieważ to na jego podstawie można tworzyć własne rozwiązania. Jeśli się go dobrze przeanalizuje to okazuje się, że temat jest naprawdę prosty. Pierwsze co mamy to na samej górze import biblioteki `worker_threads`, która dostarcza nam potrzebne metody. Następnie mamy instrukcję if-else sterowaną zmienną `isMainThread`, która zwraca wartość `true` jeśli aktualnie wykonywany kod należy do wątku głównego. Następna istotna część to tworzenie wątków. 

```js
const worker = new Worker(__filename, {
    workerData: script
});
```

Tworzymy nową klasę Worker podając dwa argumenty - plik, który będzie zawierał kod wykonywany w wątku oraz obiekt z dodatkowymi ustawieniami. Najważniejsze z nich to dane jakie przekazujemy do wątku, do czego używamy klucza `workerData`.

```js
worker.on('message', resolve);
worker.on('error', reject);
worker.on('exit', (code) => {
  if (code !== 0)
    reject(new Error(`Worker stopped with exit code ${code}`));
});
```

Następnie mamy grupę Event Listeners, które oczekują na wiadomości od powołanego przed chwilą do życia wątku. Najważniejsze zdarzenie na jakie powinniśmy nasłuchiwać to `message`, gdyż to tam dostaniemy wiadomości pochodzące z wątku czyli dane, które zostały wypracowane i zwrócone. 

```js
const script = workerData;
parentPort.postMessage(parse(script));
```

Na samym końcu mamy kod, który się uruchamia się w wątku. Najpierw mamy pobranie danych, które otrzymaliśmy z wątku głównego przy pomocy zmiennej `workerData`.  Następnie mamy komunikację z wątkiem głównym przy pomocy `parentPort.postMessage()`. Wiadomości wysłane w ten sposó zostaną odebrane jako zdarzenie `message`, o którym wspomniałem chwilę wyżej.


## Sortowanie tablicy w wątku

Wiedząc jak to działa jesteśmy w stanie dopasować to do naszych potrzeb i stworzyć strukturę, która rozwiąże nasz problem algorytmiczny na kilku wątkach. Najprostszym problemem do rozwiązania może być sortowanie tablicy. W zależności od rozmiaru tablicy i wybranego algorytmu sortowania operacja może zająć czas procesora więc warto przenieść to do osobnego wątku tak aby nie obciążać głównego procesu. Do potrzeb sortowania możemy stworzyć taki oto kod: 

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const {bubbleSort} = require('./bubble-sort')

const TABLE_SIZE = 20000


if (isMainThread) {
    const table = Array.from({ length: TABLE_SIZE }, () => Math.floor(Math.random() * TABLE_SIZE * 10));

    const worker = new Worker(__filename, {
        workerData: table
    });

    worker.on('message', (result) => {
        console.log(result.time);
        console.log('Finished');
        process.exit();
    });


    setInterval(()=>console.log('waiting...'), 500)

} else {
    const arr = workerData;
    const beginTime = Date.now();
    const sortedArr = bubbleSort(arr);
    parentPort.postMessage({arr: sortedArr, time: Date.now()-beginTime});
    process.exit()
}
```

Nie ma tu nic poza tym co było wyjaśnione chwilę temu.  Jedyne co dodałem do kodu dla wątku to zamknięcie procesu po tym jak wykona swoją pracę. Kod teraz wygląda na prosty jednak mieszanie kodu programu głównego i wątku nie jest najlepszą opcją. Bardzo łatwo jest pomieszać, który kod jest za co odpowiedzialny a przy bardziej skomplikowanych strukturach może się okazać, że zarządzanie tym jest kłopotliwe. Również trzeba bardzo uważać na część wspólną kodu - czyli tą poza instrukcją if-else. Będzie ona wykonywana zarówno w programie głównym jak i wątku więc umieszczenie tam niepotrzebnego kodu może niepotrzebnie wydłużyć czas działania wątku. Najprostsze rozwiązanie to wydzielenie kodu do osobnego pliku.

Po wydzieleniu kodu musimy pamiętać by zmienić pierwszy parametr podczas tworzenia Workera czyli ścieżkę do kodu. Ścieżkę musimy podać jako absolutną więc możemy wykorzystać zmienną `__dirname` aby poprawnie zlokalizować plik

```js
const worker = new Worker(`${__dirname}/thread.js`, {
    workerData: table
});
```

Całościowy rezultat podziału wygląda następująco 

__main.js__

```js
const { Worker, isMainThread } = require('worker_threads');

const TABLE_SIZE = 20000

const table = Array.from({ length: TABLE_SIZE }, () => Math.floor(Math.random() * TABLE_SIZE * 10));

const worker = new Worker(`${__dirname}/thread.js`, {
    workerData: table
});

worker.on('message', (result) => {
    console.log(result.time);
    console.log('Finished');
    process.exit();
});


setInterval(() => console.log('waiting...'), 500);
```

__thread.js__

```js
const { parentPort, workerData } = require('worker_threads');
const { bubbleSort } = require('./bubble-sort')


const arr = workerData;
const beginTime = Date.now();
const sortedArr = bubbleSort(arr);
parentPort.postMessage({ arr: sortedArr, time: Date.now() - beginTime });
process.exit()
```

Jak widać jest to bardziej eleganckie i pozwala zachować porządek w kodzie. Mamy oddzielone biblioteki, które wykorzystujemy i łatwiej jest też zarządzać całym kodem.

Muszę przyznać, że jestem bardzo zadowolony z tej funkcjonalności. Może znacząco poszerzyć możliwości JavaScriptu i sprawić, że będzie on dużo chętniej wykorzystywany. Oczywiście trzeba pamiętać, że jest to na razie funkcjonalność eksperymentalna i może się ciągle zmienić ale mam nadzieję, że już niedługo spotkamy ją w fazie stabilnej i pierwszych rozwiązaniach produkcyjnych.


