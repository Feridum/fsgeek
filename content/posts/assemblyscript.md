---
title: "AssemblyScript czyli WebAssembly dla programistów Typescripta"
slug: "assembly-script-czyli-webassembly-dla-programistow-typescripta"
author: "Feridum"
image: "../images/assemblyscript/logo.jpg"
tags: ["WebAssembly", "AssemblyScript", "Typescript", "Javascript"]
date: 2019-02-27T15:45:00+01:00
draft: false
---

WebAssembly z każdym rokiem coraz bardziej się rozwija i pojawia się wiele nowych narzędzi do niego, które wspomagają tworzenie kodu. Stanowi nadzieję, że będziemy w stanie wyodrębnić część funkcjonalności z kodu JavaScript i uruchomić je bezpośrednio w przeglądarce z natywną szybkością. Dzięki temu odchudzimy nasz kod JavaScript, co przełoży się na ogólną wydajność aplikacji. A co jeśli moglibyśmy tworzyć WebAssembly w JavaScripcie?

<!--more-->

## AssemblyScript

Według repozytorium na [githubie](https://github.com/appcypher/awesome-wasm-langs) aktualnie jest ponad 20 języków, które można skompilować do WebAssembly. Mamy tutaj oczywiście takie języki jak C, C++, C# i Rust ale również wiele innych. Wśród pozostałych języków możemy znaleźć taką pozycję jak AssemblyScript. Jest to specjalna wersja Typescripta, która została dostosowana do WebAssembly i którą możemy zbudować wykorzystując wyłącznie skrypty z `node_modules`. 

Aby było możliwe kompilowanie AssemblyScript dodano kilka specjalnych typów. Reprezentują one natywne typy liczbowe z WebAssembly oraz 3 dodatkowe. Do tych natywnych zaliczamy liczby stałoprzecinkowe 32 i 64 bitowe zarówno ze znakiem jak i bez (`i32`/`u32` oraz `i64`/`u64`) oraz liczby zmiennoprzecinkowe 32 i 64 bitowe (`f32` i `f64`). Dodatkowo możemy użyć mniejszych reprezentacji: 16 (`i16` oraz `u16`), 8(`i8` oraz `u8`) i 1(`bool`) bitowe zmienne. Wybór rozmiaru zmiennej ma tutaj bardzo duży wpływ na końcowy wynik działania operacji jakie wykonujemy na liczbach. Jeśli wybierzemy zbyt mały rozmiar to może się okazać, że wskutek naszych obliczeń zostanie przekroczony maksymalny rozmiar i wynik będzie mocno zafałszowany. Kolejna rzecz na którą trzeba zwrócić uwagę to rodzaj zmiennych. Tutaj słówko kluczowe `const` definiuje stałą tak jak to ma miejsce na przykład w języku C. Powoduje to, że nie możemy tego używać w środku funkcji (tak jak jesteśmy najczęściej przyzwyczajeni) tylko musimy wykorzystać `let`.


## Budowanie AssemblyScript
Tak jak wspomniałem do budowania programów napisanych w AssemblyScript wystarczy nam odpowiednia paczka z npm. Projekt możemy stworzyć na dwa sposoby: pierwszy przy pomocy `npx asinit` lub samodzielnie instalując paczkę `AssemblyScript/assemblyscript` i konfigurując wszystkie potrzebne polecenia. Najważniejsze jest polecenie, które zamieni nasz kod do postaci, którą możemy następnie zaimportować w programie JavaScript. Aby utworzyć plik `*.wasm`(który nas tak najbardziej interesuje) musimy wykorzystać następujące polecenie: `asc scieżka/plikWejsciowy.ts -b scieżka/plikWyjsciowy.wasm --validate -O`

Oczywiście najlepiej umieścić te polecenie do sekcji scripts i uruchamiać jednym poleceniem yarn'a lub npm'a. Co do samego polecenia to parę słów można poświęcić na dwie ostatnie flagi. Pierwsza sprawia,  że nasz moduł jest sprawdzany przy pomocy biblioteki Binaryen i w przypadku błędów dostajemy stosowną informację. Następnie mamy przełącznik `O` który optymalizuje nasz kod. Tutaj mamy kilka opcji jakie możemy wykorzystać więc warto zerknąć do helpa albo na tę [stronę](https://github.com/AssemblyScript/assemblyscript/wiki/Using-the-compiler)

## Nakładanie sepii na obraz

Teoria teorią ale najlepiej jest pokazać jak wygląda AssemblyScript w praktyce. Jednym z zastosowań WebAssembly jest wykorzystanie algorytmów w nim napisanych do edycji obrazów. Jednym z najprostszych przekształceń jakie możemy nałożyć na obraz to sepia. Jest to dosyć prosty algorytm i napisanie go nie jest kłopotliwe. Kod wygląda następująco:

```js
const MAX:u32 = 255;

export function sepia(size: i32):void {
  for (let i = 0; i < size; i = i + 4) {
    let r = load<u8>(i);
    let g = load<u8>(i + 1)
    let b = load<u8>(i + 2);

    let nr = 0.393 * r + 0.769 * g + 0.189 * b;
    let ng = 0.349 * r + 0.686 * g + 0.168 * b;
    let nb = 0.272 * r + 0.534 * g + 0.131 * b;

    let min_r = min(nr, MAX)
    let min_g = min(ng, MAX)
    let min_b = min(nb, MAX)

    store<u8>(i, <u8>min_r);
    store<u8>(i + 1, <u8>min_g);
    store<u8>(i + 2, <u8>min_b);
  }
}

```

Algorytm jest prosty i sprowadza się do wyliczenia nowych wartości RGB dla każdego piksela. Jedyny parametr jaki przekazujemy do funkcji to rozmiar naszego obrazka a dokładniej ilość pikseli jaka się w nim znajduje. Sam obrazek jest ładowany osobno do pamięci i potrzebujemy tego rozmiaru aby wiedzieć kiedy się skończy i nie wyjść poza zakres pamięci. 

Następnie w pętli dla każdego piksela pobierna jest wartość dla poszczególnych składowych z pamięci - leżą one obok siebie w określonej kolejnści R, G, B i kanał alpha, który się nie zmienia w tym algorytmie. Mając te wartości jesteśmy w stanie wyliczyć nowe wartości tak aby uzyskać na całym obrazku odcień sepii. Kolejnym krokiem jest obcięcie wartości tak aby nie była większa niż 255 - jest to maksymalna wartość dla pojedynczej składowej. Na samym końcu zapisuję ostateczną wartość na 8 bitach - więcej nie jest potrzebne w celu zapisania składowej koloru. Możemy teraz skompilować program i cieszyć się gotowym modułem WebAssembly, który jest gotowy do użycia w kodzie JavaScript.


Nie jest to ciężkie jak widać i każdy może próbować swoich sił bez potrzeby uczenia się kolejnego języka programowania oraz instalowania dodatkowych narzędzi. Czasem z takich zabaw mogą powstać nowe biblioteki, które spowodują zwiększenie popularności WebAssembly. A jak wam się podoba ten sposób tworzenia modułów WebAssembly? Ma on niewąpliwie wartość dla programistów JavaScript, którzy nie chcą poznawać kolejnego języka by tworzyć takie rozwiązania. Kolejną zaletą może być możliwość mieszania w przyszłości kodu zarówno zwykłego JS'a jak i WebAssembly w jednym repozytorium i budowanie tego w locie z wykorzystaniem rozwiązań CI/CD. Pochwalcie się co o tym sądzicie?

