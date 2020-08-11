---
title: "D3.js - osie na wykresie"
slug: "d3-osie-na-wykresie"
author: "Feridum"
image: "../images/d3-axes/logo.jpg"
tags: ["d3.js", "wykres", "liniowy", "osie", "javascript"]
date: 2020-04-22T16:10:00+02:00
draft: false
---

Nie ma wykresu bez dobrze opisanych osi, które mówią nam jak odczytywać dane z wykresu i co reprezentują. Są więc istotnym elementem, którego nie można pominąć. Na szczęście D3.js udostępnia nam grupę funkcji, które pozwalają w łatwy sposób dodać i dostosowywać wygląd osi.

<!--more-->

## Inne artykuły z serii o D3.js

1. [Tworzenie prostego wykresu liniowego](/post/d3-prosty-wykres-liniowy)
2. [Obsługa zdarzeń](/post/d3-obsluga-zdarzen)


## Osie w D3.js

Do dodania osi możemy skorzystać z przygotowanych funkcji, które możemy podzielić na dwie grupy - pierwsza do tworzenia (osi pionowych i poziomych) i druga do dostosowywania wyglądu.

Do tworzenia osi mamy 4 metody: 

- `axisTop()` - oś pozioma, gdzie etykiety są powyżej osi
- `axisBottom()` - oś pozioma, gdzie etykiety jest poniżej osi
- `axisLeft()` - oś pionowa z etykietą po lewej stronie
- `axisRight()` - oś pionowa z etykietą po prawej stronie

Przy wywoływaniu każdej z metod możemy przekazać funkcję, która będzie mapowała nasze wartości z osi na pozycję w svg - możemy wykorzystać tą samą funkcję skali, której użyliśmy przy rozmieszczaniu punktów wykresu. Druga opcja to pominięcie tego przy tworzeniu osi i wywołanie funkcji `.scale()`. Musimy wybrać jedną z dwóch metod ponieważ bez tego nie powstanie oś i dostaniemy błąd. 

Kolejne funkcje służą już tylko do dostosowywania wyglądu wykresu. Mamy tu kilka opcji, które możemy wykorzystać: 

- `ticks()`, `tickArguments()` - służy do ustawiania kroku wyświetlania etykiety (ile ich chcemy na wykresie) oraz do jej formatowania. Jeśli chcemy tylko ustawić formatowanie możemy skorzystać z `tickFormat`
- `tickValues()` - zamiast ustawiać ilość lub krok etykiety możemy bezpośrednio podać jakie etykiety nas interesują.
- `tickFormat()` - funkcja ustawiająca format wyświetlanych etykiet; najlepiej skorzystać tutaj z funkcji [d3-format](https://github.com/d3/d3-format)
- `tickSizeInner()` - ustawiamy długość słupków osi
- `tickSizeOuter()` - jest to wielkość krańcowych słupków osi (słupki, które ograniczają osie z obu stron)
- `tickPadding()` - odległość pomiędzy etykietą a słupkiem osi
	
Pomiędzy `ticks` i `tickArguments`  jest tylko różnica w zapisie - `tickArguments([10,'0.1f'])` jest równy w zapisowi `ticks(10, "0.1f")`.

Dodatkowo jeśli ustawiamy rozmiar wewnętrznych i zewnętrznych słupków na taką samą wartość to możemy, zamiast ustawiać osobno każdą wartość, wykorzystać funkcję `tickSize()`.

Jak teraz wygląda dodanie takich osi?
```js
const axisX = d3
  .axisBottom(walkX)
  .tickArguments([10, ".1f"]) // .ticks(10, "0.1f")
  .tickSize(3);

const axisY = d3
  .axisLeft()
  .scale(walkY)
  .tickValues([0, 12, 20, 25, 34])
  .tickFormat(d3.format(".0f"))
  .tickSizeInner(2)
  .tickSizeOuter(1)
  .tickPadding(5);

chart
  .append("g")
  .attr("transform", "translate(0, 370)")
  .call(axisX);

chart
  .append("g")
  .attr("transform", "translate(20, 0)")
  .call(axisY);
```

Większość elementów opisałem już wyżej i jedyne co zostało do zrobienia to odpowiednie ułożenie osi. Aby to zrobić poprawnie musimy zerknąć jakie wartości ustaliliśmy przy skalowaniu wykresu - oś X przesuwamy 370px w dół natomiast oś Y przesuwamy o 20px w prawo. Ostatni krok to wywołanie funkcji, która wyrysuje nasze osie w elemencie `g`

<iframe
     src="https://codesandbox.io/embed/d3-axes-vfzwi?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="d3-axes"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Po dodaniu osi zaczyna to wyglądać jak prawdziwy wykres. Teraz możemy bawić się wykresem by dopracować wygląd, dodać animacje, tooltipy i inne elementy, które go uatrakcyjnią.