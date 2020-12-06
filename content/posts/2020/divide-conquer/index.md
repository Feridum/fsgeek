---
title: "Metoda dziel i zwyciężaj"
slug: "divide-and-conquer-czyli-dziel-i-zwyciezaj"
author: "Feridum"
image: "./logo.jpg"
tags: ["programowanie", "dobre praktyki"]
date: 2020-11-25T16:00:00+01:00
---

Ile czasu zajmie ci stworzenie kopii Facebooka? A ile stworzenie przycisku lubię to? Wiesz jak stworzyć zaawansowany autocomplete? A jak zrobić prosty select? Im prostsze zadanie, tym lepiej potrafimy ocenić ilość pracy. Dlatego tak istotna jest metoda `dziel i zwyciężaj`.

<!--more-->

## Trochę teorii

Podejście polegające na rozbiciu problemu na mniejsze składowe jest znane od dawna i naturalnie wykorzystywane przez ludzi. Cokolwiek robimy, to zaczynamy od małych rzeczy i potem budujemy coraz większe struktury. Tak samo postanowiono zrobić z algorytmami. Idealnym przykładem jest algorytm sortowania. Jeśli mamy duży zbiór do posortowania do pracowanie na całym zbiorze jest kosztowne. Dużo lepiej jest podzielić zbiór na mniejsze składowe i posortować te mniejsze zbiory a dopiero potem połączyć to w całość. **Metoda `dziel i zwyciężaj` jest podejściem rekursywnym, czyli rozbijamy problem na mniejsze grupy, tak długo aż uznamy, że są wystarczająco małe i możemy na nich pracować. Potem aplikujemy algorytm i bierzemy większą grupę. Robimy to tak długo, aż dojdziemy do oryginalnej (tej największej) grupy**. 

Przykłady algorytmów, które korzystają z tej metody to: 

- sortowanie szybkie
- sortowanie przez scalanie
- wyszukiwanie binarne
- szybka transformata Fouriera

## Zalety metody dziel i zwyciężaj

- Pomagają rozwiązać skomplikowanie problemy
- Wydajne
- Bardzo fajnie się zrównoleglają - dzięki temu, że rozbijamy problem na mniejsze składowe, to są one rozdzielne i rozwiązaniem ich, mogą się zajmować osobne wątki/maszyny
- Optymalne wykorzystanie pamięci cache - jak rozbijemy problem na dostatecznie mały zbiór danych, to wszystkie dane zmieszczą się w szybkiej pamięci cache i nie będziemy tracić czasu na dostęp do zwykłej pamięci.

## Jak to przenieść na zarządzanie projektem i estymacje?

Ale jak to ma się do tworzenia aplikacji czy też zarządzania projektem? W końcu większość z nas na co dzień nie wymyśla nowych algorytmów. Wróćmy do pytania zadanego na początku. Ile zajmie ci stworzenie klona Facebooka (lub dowolnego innego portalu)? Poziom całej aplikacji jest za duży, by odpowiedzieć na to pytanie a każda odpowiedź będzie mało precyzyjna. Ale już taki przycisk `lubię to` jest łatwiej wyestymować. **To samo robimy z całą aplikacją - rozbijamy na mniejsze funkcjonalności, które jesteśmy w stanie wyestymować i z tych kawałków budujemy nasz system**. 

To samo odnosi się do pracy programisty. Stworzenie zaawansowanego autocomplete'a nie jest łatwym zadaniem. Ale jak podzielimy to sobie na poszczególne elementy (stworzenie komponentu, dodanie delay'a, zapytanie o dane itd) to już jesteśmy w stanie sobie zaplanować pracę, by dostarczyć funkcjonalność. **Nie ma co się rzucać, by od razu robić całość, tylko podzielić na mniejsze jednostki, które po połączeniu dadzą nam pożądaną funkcjonalność**. 

Tak samo można to odnieść do refaktoryzacji. Poprawa całego projektu to zadanie karkołomne i najczęściej skazane na porażkę. **Ale poprawić jakąś klasę, dopisać testy, wydzielić jakąś logikę - tutaj jest to łatwiejsze. A z czasem jak tak krok po kroku będziemy poprawiać, to w końcu poprawimy cały projekt**.

Jak widać, metoda `dziel i zwyciężaj` jest mocno zakorzeniona w programowaniu. Wykorzystujemy ją, nawet o tym nie wiedząc. Znałeś ten termin czy wykorzystywałeś go podświadomie? No i gdzie jeszcze wykorzystujesz tę metodę?