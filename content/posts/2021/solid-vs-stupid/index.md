---
title: "Twój jest SOLIDny czy jednak STUPID?"
slug: "zasady-solid-vs-zasady-stupid"
author: "Feridum"
image: "./logo.jpg"
tags: ["solid", "stupid", "programowanie"]
date: "2021-02-08T16:00:00.205Z"
---

O zasadach SOLID to słyszał pewnie każdy programista. A znasz zasady STUPID? I czy jesteś w stanie określić, do których należy twój aktualny projekt? Jaki jest twój kod - SOLID czy STUPID? A może po trochu każdego?

<!--more-->

## SOLID

Zanim przejdę do STUPID, to warto przypomnieć SOLID. Jeśli masz to w małym palcu, możesz śmiało przejść do następnego akapitu. Skąd skrót SOLID? Od 5 zasad

- S - SRP - **Single responsibility principle**
- O - OCP - **Open/closed principle**
- L - LSP - **Liskov substitution principle**
- I - ISP - **Interface segregation principle**
- D - DIP - **Dependency inversion principle**

### Single responsibility principle 

**Klasa/funkcja powinna mieć tylko jedną odpowiedzialność**. Inaczej powinien być tylko jeden powód do modyfikacji klasy. Najlepiej zobaczyć na przykładzie

```jsx
function formatTags(){
	const tags = fetchTags();

	return tags.map(tags=>tags.name)
}
```

Ta funkcja, mimo że mała już łamie zasadę SRP. W funkcji robimy dwie rzeczy.

- pobieramy listę tagów,
- formatujemy do oczekiwanego przez nas formatu.

I teraz mamy dwa powody do zmiany tej funkcji:

- zmieni się sposób pobierania tagów,
- zmieni się sposób, w jaki chcemy je formatować.

Dużo lepiej jest to podzielić na dwie funkcje i do funkcji `formatTags` przekazywać tablicę tagów

```jsx
function formatTags(tags){
	return tags.map(tags=>tags.name)
}
```

### Open/closed principle

Zasada otwarte/zamknięte, czyli **kod powinien być otwarty na rozbudowę, ale zamknięty na modyfikacje**. Brzmi tajemniczo, ale już tłumaczę, o co chodzi. Załóżmy, że mamy osobny serwis, który jest odpowiedzialny za tworzenie PDF'a. I wykorzystujemy ten serwis do tego, by konwertować maile, strony, raporty do PDF'a. Nie będziemy tego implementować bezpośrednio w tym serwisie, ponieważ ilość if'ów byłaby przerażająca. No i z każdym nowym wymaganiem będzie konieczna zmiana. 

Dużo lepiej będzie wykorzystać jakiś wspólny interfejs. Każdy, kto będzie potrzebować tworzenia PDF'a wykorzysta serwis i rozbuduje go do swoich potrzeb. Czyli nasz kod będzie zamknięty na modyfikacje (nie modyfikujemy kodu naszego serwisu), ale możemy go rozbudować o nowe opcje.

### Liskov substitution principle

Zasada podstawiania Liskov - **każdą klasę bazową powinniśmy być w stanie zastąpić klasą pochodną**. Szybki przykład

```jsx
interface Fetch {}
interface FetchFromGraphQL {}

function fetchTags(fetch: Fetch){}
```

Mamy funkcję, która odpowiada za pobranie tagów. I przyjmuje ona obiekt klasy `Fetch`. Mamy też klasę `FetchFromGraphQL`, która dziedziczy po `Fetch`. Zgodnie z zasadą Liskov powinniśmy być w stanie w dowolnym momencie wykorzystać obiekt klasy `FetchFromGraphQL`, żeby pobrać tagi. W zasadzie Liskov chodzi o to, by w obiektach potomnych nie zmieniać sposobu działania klasy bazowej. Jeśli w klasie pochodnej nie musisz implementować dowolnej metody z klasy bazowej - to znaczy, że abstrakcja została źle stworzona.

### Interface segregation principle

Zasada segregowania interfejsów mówi o tym, że **interfejsy powinny być odpowiednio zdefiniowane**. Interfejsy powinny być małe, tak aby obiekt nie musiał nadmiarowo implementować niepotrzebnych elementów. Przy trzymaniu się tej zasady interfejsy będą małe i będziemy częściej przypisywać do klasy ich większą ilość. To też się łączy z zasadą Liskov. Jeśli nasze interfejsy będą odpowiednio małe, to implementując klasy pochodne, nie złamiemy zasady Liskov. Im większy interfejs tym szansa na to, że złamiemy zasadę Liskov jest większy. 

### Dependency inversion principle

Zasada odwrócenia zależności, czyli **klasy/funkcje wysokopoziomowe nie powinny zależeć od niskopoziomowych**. Brzmi skomplikowanie, ale szybki przykład pokaże zasadę działania. Najpierw przykład złamania zasady

```jsx
function fetchTags(){
	return fetch(...)
}
```

W tym przypadku funkcja `fetchTags` zależy od implementacji wbudowanej w przeglądarkę funkcji `fetch`. Zamiast tego lepiej stworzyć ogólny interfejs, który musi być spełniony, by móc pobrać tagi.

```jsx
function fetchTags(fetch: Fetch){
	return fetch(...)
}
```

Od razu mamy też kod, który da się przetestować, ponieważ nie wykorzystujemy mechanizmu wbudowanego w przeglądarkę i jesteśmy w stanie ją podmienić w testach.

## STUPID

Na tej samej zasadzie co zasady SOLID powstał skrót STUPID. Składają się na niego następujące zasady:

- S - **Singleton**
- T - **Tight Coupling**
- U - **Untestability**
- P - **Premature Optimization**
- I - **Indescriptive Naming**
- D - **Duplication**

Warto omówić każdą z tych zasad.

### Singleton

Pewnie słyszałeś o wzorcach projektowych. **Singleton jest natomiast określany jako anty-wzorzec**. Ograniczamy w nim możliwość tworzenia obiektów danej klasy do dokładnie jednej instancji. No i mamy zawsze globalny dostęp do tego obiektu. Problemem tego wzorca jest łatwość w jego nadużywaniu. W wielu przypadkach będziemy mieć dostępne dużo lepsze rozwiązanie.

### Tight Coupling (Szczelne połączenie)

Coupling jest miarą powiązania poszczególnych elementów. **Gdy dwa elementy są szczelnie (ściśle) ze sobą połączone, to zmiana w jednym z tych elementów wymaga zmiany w drugim**. Singleton jest idealnym przykładem takiej sytuacji. Kiedy korzystamy z tego wzorca, to dowolna zmiana w kodzie Singletonu powoduje konieczność zmiany w każdym komponencie, który korzysta z tego elementu. Innym przykładem może być integracja z konkretną biblioteką zamiast z jakąś abstrakcją, która umożliwi zmianę biblioteki w przyszłości.

### Untestability (Nietestowalność)

**Najgorszy kod to ten, którego nie potrafimy przetestować**. Dlaczego? Ponieważ do takiego kodu nie napiszemy testów, więc kod z każdą kolejną zmianą będzie coraz bardziej zapuszczony. Nawet w przyszłości próba zmiany tego będzie trudna. Bez testów każdy będzie się bał wprowadzania zmian i w końcu kod będzie można określić tylko w jeden sposób - tu mieszkają smoki. Dlatego też powstały takie techniki jak TDD, które zwracają uwagę na istotę testów.

### Premature Optimization (Przedwczesna optymalizacja)

> premature optimization is the root of all evil (or at least most of it) in programming
>
>*Donald Knuth*

Przedwczesna optymalizacja powoduje tylko problemy w kodzie: 

✅ przestajemy rozwijać produkt i tkwimy w jednym miejscu,  
✅ próbujemy rozwiązać problem, który w danym momencie może nie być najważniejszy,  
✅ w większości przypadków użytkownik systemu wolałby nową funkcjonalność niż przyspieszenie o 0.5 sek,     
✅ zwiększamy stopień skomplikowania kodu i narażamy się na błędy.


### Indescriptive Naming (Mało znaczące nazwy)

Chyba każdy pisał w pętli for zmienne typu `let i=0`. I tak jak jeszcze w takich miejscach możemy na to przymknąć oko, to nie chcemy tego widzieć w reszcie kodu. Wyobraź sobie taką funkcję

```js
function changeEmail(u,n){}
```

W momencie pisania tego kodu pewnie byś pamiętał, co znaczą te zmienne. A co będzie za dzień/tydzień/miesiąc? Czy będziesz w stanie powiedzieć, co znaczą te zmienne bez patrzenia na wywołanie? A popatrz na taką funkcję.

```js
function changeEmail(user, newEmail){}
```

Tak samo nie ma co pisać skrótów, jakiś mało ogólnych nazw. Dużo lepiej mieć dłuższą nazwę zmiennej. Idealny kod powinien się czytać jak książkę bez zastanawiania się co autor (nawet jeśli to ty) miał na myśli. Twoja praca będzie dzięki temu efektywniejsza.

### Duplication (Powtórzenia w kodzie)

Powtórzony kod jest pierwszym krokiem do powstania bałaganu. Nagle musimy pamiętać o kilku miejscach do aktualizacji danych i uważać przy modyfikowaniu kodu. Dlatego warto wyciągnąć wspólny kod do osobnego miejsca. Ale nie można też przesadzać. Czasami powtórzenie kodu ma sens i nie można na siłę szukać wspólnej abstrakcji. Jeśli wspólna funkcja ma mieć milion argumentów i tonę if-ów to lepiej powtórzyć kod.