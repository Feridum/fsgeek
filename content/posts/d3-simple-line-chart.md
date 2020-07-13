---
title: "D3.js - tworzenie prostego wykresu liniowego"
slug: "d3-prosty-wykres-liniowy"
author: "Feridum"
image: "../images/d3-simple-line-chart/logo.jpg"
tags: ["d3.js", "wykres", "liniowy", "javascript"]
date: 2020-04-14T15:15:00+02:00
draft: false
---

Wykresy są doskonałym sposobem do reprezentowania nudnych danych liczbowych. Dobrze zrobiony wykres potrafi przykuć wzrok osoby, która od liczb ucieka z krzykiem. Istnieje wiele bibliotek do tworzenia wykresów a przynajmniej część z nich opiera się na bibliotece D3.js. Ja chciałbym się skupić na tej ostatniej i pokazać jak można stworzyć w niej te proste jak i zaawansowane wykresy.

<!--more-->

## Inne artykuły z serii o D3.js

1. [Osie na wykresie](/post/d3-osie-na-wykresie)


## Dlaczego D3.js?

Biblioteka D3.js służy do wizualizacji danych na stronie internetowej przy pomocy SVG, Canvasa lub czystego HTML'a. Łączy ona techniki wizualizacji danych wraz z interakcją z nimi oraz manipulacją drzewem DOM. Powoduje to, że biblioteka jest potężna i w doświadczonych rękach można nią działać cuda. Jeśli nie jesteście przekonani to zerknijcie na przykłady gotowych [wizualizacji](https://observablehq.com/@d3/gallery). Jest też druga strona medalu - żeby móc tworzyć tak zaawansowane rzeczy biblioteka posiada bardzo bogate [API](https://github.com/d3/d3/blob/master/API.md), które na początku może przerażać.

A dlaczego nie korzystać z gotowych bibliotek, które już opakowują D3.js w wygodny interfejs? Jest to na pewno wygodne i szybkie na początku. Ale z doświadczenia wiem, że klienci lubią wymyślać różne rzeczy i może się zdarzyć, że nie będziemy w stanie tego zrobić w naszej bibliotece lub będziemy musieli się bardzo natrudzić by uzyskać pożądany efekt. Potrafiąc korzystać z czystego D3.js będziemy w stanie mocno czarować na wykresie i nie będziemy niczym ograniczeni. Drugi argument to kwestia nadmiaru bibliotek w naszych aplikacjach - powinniśmy starać się używać jak najmniej różnego rodzaju interfejsów tylko korzystać z konkretnych bibliotek - dzięki temu kod wynikowy będzie mniejszy i nie jesteśmy niczym ograniczeni.

## Tworzenie pierwszego wykresu

Z racji tego, że D3.js nie jest prostą biblioteką mam zamiar stworzyć serię postów gdzie po kolei będziemy tworzyć coraz to bardziej skomplikowane wykresy. Dzisiaj zaczniemy od samych podstaw czyli wykreślenia prostego wykresu liniowego.

Najpierw najprostszy krok czyli stworzenie obszaru gdzie będzie kreślony wykres.

```js
import * as d3 from "d3";

const chart = d3
	.select("#app")
	.append("svg")
	.attr("width", 400)
	.attr("height", 400)
	.append("g");
```

Będziemy tworzyć nasz wykres przy pomocy SVG. D3.js wykorzystujemy tutaj by najpierw znaleźć element o id `app` na stronie i umieścić tam element `svg` o konkretnych wymiarach. Wykres liniowy to jest tak naprawdę prosta łamana więc do stworzenia jej w svg potrzebujemy elementu `path`

```js
const data = [
  { data: 1, value: 0 },
  { data: 20, value: 20 },
  { data: 30, value: 12 },
  { data: 40, value: 34 },
  { data: 50, value: 25 }
];

chart
  .datum(data)
  .append("path")
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-width", 5)
  .attr(
    "d",
    d3
      .line()
      .x(({ data }) => data)
      .y(({ value }) => value)
  );
```

Widzimy tutaj wykorzystanie nowych elementów z biblioteki. Po pierwsze mamy funkcje `.datum()`, która ustawia dane dla aktualnie wybranego elementu. Następnie dodajemy element `path` oraz ustawiamy mu odpowiednie atrybuty.  Najważniejszy z nich - `d` - określa jak ma wyglądać nasza prosta łamana. Moglibyśmy zrobić to ręcznie ale nie jest to proste i wygodne (przykładowa wartość `M1,0L20,20L30,12L40,34L50,25`). Na szczęście możemy wykorzystać kolejną z funkcji `d3.line()`, która stworzy nam linię z tablicy danych jakie przekazaliśmy. Dodatkowo mamy funkcje `x()` i `y()`, które pozwalają po pierwsze wybrać jakie wartości mają być dla x i y oraz dodatkowo je zmodyfikować jeśli będzie to potrzebne. 

Jednak jeśli teraz uruchomimy nasz kod to zobaczymy, że po pierwsze nasz wykres nie wypełnia całej wolnej przestrzeni oraz wykres będzie odwrócony. To pierwsze jest spowodowane tym, że póki co nasze punkty wskazują konkretne punkty na osi współrzędnych elementu svg. Drugi problem jest powiązany z osią układu współrzędnych. Ze szkoły jesteśmy przyzwyczajeni do osi współrzędnych gdzie punkt (0,0) jest w lewym, dolnym rogu i oś X rośnie w prawo a oś Y w górę. Niestety w grafice komputerowej wygląda to inaczej - punkt (0,0) jest w lewym, górnym rogu i tak jak oś X rośnie w prawo tak oś Y rośnie w dół. 

Żeby nasz wykres wyglądał tak jesteśmy przyzwyczajeni to musimy go przeskalować. Znowu moglibyśmy robić to ręcznie ale po co, skoro są do tego funkcje.

```js
const walkX = d3
  .scaleLinear()
  .domain([0, 50])
  .range([20, 380]);
const walkY = d3
  .scaleLinear()
  .domain([0, 35])
  .range([380, 20]);


//reszta kodu

.attr(
    "d",
    d3
      .line()
      .x(({ data }) => walkX(data))
      .y(({ value }) => walkY(value))
  );
```

Każda z funkcji odpowiada za jedną z osi. Z racji tego, że nasz wykres jest liniowy to użyjemy skali liniowej, która odwzoruje nasze punkty z danych na punkty na wykresie. Potrzebujemy określić domenę (`.domain()`) oraz zakres (`.range()`) do jakich mają być nasze punkty odzwierciedlone. W domenie ustawiamy tablicę z minimalną i maksymalną wartością w danej osi, natomiast w zakresie ustawiamy liczby do jakich mają być tamte wartości przeskalowane. Z racji tego, że chcę aby wykres zajmował całą przestrzeń `svg` to w zakresie podaję szerokość elementu svg z 20 pikselowym marginesem z obu stron. Połączenie domeny i zakresu jest potrzebne by móc odpowiednio rozmieścić punkty na wykresie by wyglądało prawidłowo i nie ucięło żadnych punktów. 

Warto na sam koniec tylko zwrócić uwagę na zakres dla osi Y. Tak jak wspominałem jest ona odwrócona w stosunku do tego co znamy i wartości musimy odwrócić - czyli chcemy by nasza wartość `0` była na svg na współrzędnej Y równej `380`.

Efekt końcowy wygląda następująco: 

<iframe
     src="https://codesandbox.io/embed/d3-simple-line-chart-gkops?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="d3-simple-line-chart"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Nie jest to może najbardziej zaawansowany wykres ale wszystko w swoim czasie. Teraz możemy dodawać kolejne elementy do wykresu jak osie, etykiety, dodatkowe elementy graficzne, jakieś animacje by z prostego wykresu zrobić naprawdę fajny element graficzny na stronę.

