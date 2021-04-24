---
title: "3 sposoby na zmianę kolejności elementów na stronie"
slug: "css-rozmieszczanie-elementow-flexbox-grid"
author: "Feridum"
image: "./logo.png"
tags: ["javascript", "css", "frontend", "webdevelopment"]
date: "2021-04-13T16:00:00.474Z"
---

Najgorszy koszmar frontend dewelopera? Designer, który przesuwa elementy po stronie, jak mu się podoba. Niech pierwszy rzuci klawiaturą, kto nie trafił na takiego designera. Na szczęście nie jesteśmy bezbronni na froncie i mamy narzędzia, które pomagają nam te wizje wprowadzić w życie.

<!--more-->

## Po co przesuwamy elementy na stronie?

Przesuwanie elementów jest popularniejsze, niż Ci się może wydawać. Szczególnie gdy tworzymy stronę w pełni responsywną. Największe różnice mamy pomiędzy widokiem mobilnym a desktop. Na widoku mobilnym musimy wszystko ustawić w jednej kolumnie - jest to wymuszone przez rozmiary urządzeń. Natomiast na desktop mamy więcej miejsca i możemy poprzesuwać elementy, by poprawić UX. Mamy też coraz większe monitory i szkoda marnować całe miejsce na tło. No i od nas (i designera) zależy, jak to zrobimy.

## Przesuwanie elementów przy pomocy JS'a

Elementy najprościej "przesuwać" przy pomocy JS'a. Dlaczego pisze to przez cudzysłów? Ponieważ bardziej można by to opisać jako ukrywanie i pokazywanie. Czyli korzystając z JS'a wykrywamy szerokość ekranu i na tej podstawie włączamy lub wyłączamy niektóre elementy. Jednak jest to podejście, które można wykorzystać w ostateczności. Dlaczego? Bo jest to mało wydajne, powoduje duplikowanie kodu no i może powodować problemy przy zmianie szerokości ekranu. Jak można to zrobić inaczej?

## Flex

Na początek wyświetlanie przy pomocy `flex`. Jest to chyba aktualnie najpopularniejszy sposób na pozycjonowanie elementów na stronie. No i dzięki temu mamy kilka możliwości zmiany kolejności elementów:

- flex-direction - przejście pomiędzy ułożeniem `column` a `row` będzie występowało zawsze przy RWD. Na mobilce układ pojedynczej kolumny jest idealny, ale widoku desktop mamy więcej miejsca. Trochę mniej oczywiste, ale przydatne czasami to odwrócenie kolejności elementów przy pomocy `row-reverse` i `column-reverse`
- order - chyba najpotężniejsza właściwość na frontendzie, jeśli chodzi o rozmieszczanie elementów. Manipulując tą właściwością, jesteśmy w stanie wykonać 99% pomysłów desingera (zostawiam sobie mały margines błędu jakby, któryś zaszalał za bardzo xD)


<iframe height="400" style="width: 100%;margin-top: 50px" scrolling="no" title="Flex" src="https://codepen.io/Feridum/embed/abpEbEQ?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Feridum/pen/abpEbEQ'>Flex</a> by Aleksander
  (<a href='https://codepen.io/Feridum'>@Feridum</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Grid

Rozwinięciem idei flex'a jest grid, który pozwala na tworzenie zaawansowanych układów strony. Dzięki temu, że mamy pełną władzę nad układem strony to możemy dowolnie go zmieniać. Najprościej jest użyć do tego `grid-area` i `grid-template-areas`.  Dzięki grid-area możemy przypisać danemu blokowi nazwę, a następnie przy pomocy `grid-template-areas` ustawić na stronie.

<iframe height="400" style="width: 100%; margin-bottom: 50px" scrolling="no" title="Grid" src="https://codepen.io/Feridum/embed/gOgobxx?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Feridum/pen/gOgobxx'>Grid</a> by Aleksander
  (<a href='https://codepen.io/Feridum'>@Feridum</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Zalety tego widać szczególnie przy zaawansowanych układach na rozmiarze desktop. Jeśli układ strony z jedno kolumnowej przekształca się w wiele kolumn, to grid może być najprostszym rozwiązaniem. Oczywiście nic nie stoi na przeszkodzie, by łączyć grid z flex. Wręcz powinno się to łączyć - grid do ogólnego układu strony i potem flex do ustawiania poszczególnych elementów.