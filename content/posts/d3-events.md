---
title: "D3.js - obsługa zdarzeń"
slug: "d3-obsluga-zdarzen"
author: "Feridum"
image: "../images/d3-events/logo.jpg"
tags: ["d3.js", "zdarzenia", "tooltip", "javascript"]
date: 2020-08-04T16:35:00+02:00
---

Dzięki wykresom można prezentować dane w ciekawy i przystępny sposób. Ale skoro mamy je na stronie internetowej, to można dołożyć do nich więcej interaktywności, by pokazać więcej danych np. z pomocą tooltip'ów. Jest to proste do zaimplementowania o ile wiemy jak wykorzystać system zdarzeń obecny w D3.js.

<!--more-->

## Pozostałe artykuły z serii

1. [Tworzenie prostego wykresu](/post/d3-prosty-wykres-liniowy/)
2. [Osie na wykresie](/post/d3-prosty-wykres-liniowy/)


## Zdarzenia w D3.js

Zdarzenie w D3.js podpinamy pod konkretne elementy i jest to zbliżone zachowanie do tego, co jesteśmy w stanie zrobić z wykorzystaniem natywnej funkcji JS'a, co widać poniżej: 

```js
d3.select('#app').on("mouseover", console.log)

document.getElementById('app').addEventListener("mouseover", console.log);
```
Kiedy reagujemy na zdarzenie na pojedynczym elemencie, to obie metody są równie dobre. Wykorzystując natywną funkcję jako parametr dostajemy obiekt `event` (dokładny opis i pola można znaleźć [tutaj](https://developer.mozilla.org/pl/docs/Web/API/Event)). W przypadku D3.js dostajemy 3 wartości: 

- Wartość, jaka została wpisana do tego elementu
- Indeks elementu
- Grupa elementów, na podstawie których został wyliczony indeks

Jeśli chcemy dostać się do obiektu zdarzenia z natywnej funkcji to musimy skorzystać z pola `d3.event`.

Większą różnicę widać w momencie, kiedy mamy grupę obiektów, w których chcemy reagować na zdarzenia. Przy wykorzystaniu natywnego rozwiązania trzeba by podpinać każdy element osobno lub skorzystać z pętli, która przejdzie po wszystkich elementach. Dzięki wykorzystaniu D3 jest to prostsze, bo robimy to za pomocą pojedynczego polecenia. 

```js
d3.select("#app")
  .selectAll("p")
  .data(["a", "b", "c"])
  .enter()
  .append("p")
  .text(t => t)
  .on("mouseover", console.log);

```
W powyższym przykładzie umieściliśmy na stronie 3 elementy typu `p` z wartościami `a`, `b`i `c`. Wykorzystując funkcję `.on(...)` dla każdego paragrafu podpinamy funkcję, która czeka na zdarzenie `mouseover`.

Gdybyśmy zamiast prostych zmiennych tekstowych skorzystali z obiektów, to ciągle będziemy mieć dostęp do całego obiektu, co jest wygodne podczas bardziej zaawansowanych funkcji obsługi zdarzenia. Na jakie zdarzenia możemy reagować? Na te wszystkie, na które możemy reagować w JS'ie czyli np.: `click`, `mouseenter`, `mouseleave`. Pełną listę możecie sprawdzić [tutaj](https://developer.mozilla.org/en-US/docs/Web/Events)

## Tworzenie tooltipa

Wykorzystując funkcjonalność zdarzeń w D3.js możemy dodać do naszych wykresów tooltipy. Jest to element, który wzbogaca wykres i pozwala umieścić dodatkowe informacje. Dzięki temu wykres pozostaje elegancki i prosty, ale jednocześnie możemy przekazać więcej informacji użytkownikowi. Dodanie tooltipów sprowadza się do umieszczenia paru linijek w kodzie.


```js
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

chart
  .append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("r", 5)
  .attr("cx", ({ data }) => walkX(data))
  .attr("cy", ({ value }) => walkY(value))
  .on("mouseover", d => {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip
      .html(d.value)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY - 28 + "px");
  })
  .on("mouseout", d => {
    tooltip
      .transition()
      .duration(500)
      .style("opacity", 0);
  });
```

Najpierw umieścimy na wykresie punkty, które będą wskazywały użytkownikowi, gdzie będzie mógł uzyskać więcej informacji. Następnie wykorzystując zdarzenia, podpinamy się pod zdarzenie najechania myszką na punkt, co wyświetli tooltip. Jako reakcja na zdarzenie pokazujemy tooltip i umieszczamy go w odpowiednim miejscu na stronie. Następnie na zdarzeniu `mouseout` ukrywamy tooltip. W tym miejscu kończy się wykorzystanie D3.js a zaczyna UI/UX, czyli kwestia jak powinien wyglądać i zachowywać się tooltip. Warto zwrócić uwagę, że mamy dostęp do całego obiektu, dzięki czemu w prosty sposób możemy przekazać dodatkowe dane do wyświetlenia.

Teraz po tych wszystkich zmianach wykres prezentuje się następująco.

<iframe
     src="https://codesandbox.io/embed/d3-events-zyxyp?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="d3-events"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
/>
