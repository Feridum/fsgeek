---
title: Struktury danych w Pythonie – podstawy
author: feridum
type: post
date: 2017-04-07T07:20:54+00:00
image: /assets/wp-content/uploads/2017/04/dane.jpg
url: /2017/04/07/struktury-danych-pythonie-podstawy/
slug: 2017-04-07-struktury-danych-pythonie-podstawy
categories:
  - Backend
  - Daj się poznać 2017
  - Python
tags:
  - backend
  - daj sie poznac
  - danych
  - podstawy
  - python
  - struktury
---
W związku z tym, że w poprzednim wpisie(jeśli go ominęliście to znajdziecie go [tutaj][1]) zacząłem budować serwer api w Pythonie to również był to początek mojej nauki tego języka. Dziś będzie krótko na temat wbudowanych struktur danych, których będę mógł użyć przy dalszej rozbudowanie serwera. Wpis będzie realizowany dla wersji 3.6.1 Pythona. Warto o tym pamiętać szczególnie, że istnieją pewne różnice pomiędzy wersjami Pythona a szczególnie pomiędzy wersją 2 a 3.

## Dostępne struktury danych

W Pythonie możemy wyróżnić 4 główne struktury danych: listy, krotki, zbiory i słowniki . Każda z nich ma odmienną budowę i zastosowania jednak są wszystkie w pewien sposób połączone co pokażę podczas omawiania każdej struktury. Zacznę od listy, która jest najbardziej podstawowym elementem w tej całej gromadzie.

###  Listy

Listy najbardziej przypominają tablice znane z języka C/C++ z pewnym małym wyjątkiem. W listach możemy przechowywać dane różnego typu np.:

![listy](/assets/wp-content/uploads/2017/04/2017-04-03-e1491497001852.png)

Dzięki temu możemy tam wrzucać co tylko nam się podoba. Na bazie listy możemy zbudować stos czyli strukturę w której mamy dostęp tylko do elementy dostępnego na szczycie (ostatni element) a każdy nowy element jest dodawany na koniec listy.

![stos](/assets/wp-content/uploads/2017/04/2017-04-03-1-e1491497688591.png)


<span lang="pl">Oprócz tego na bazie listy można stworzyć kolejkę jednak nie jest to najszybsze rozwiązanie. Jest to spowodowane tym że w kolejce elementy są dodawane na początek listy i trzeba przesuwać resztę elementów. Dlatego jeśli chcemy korzystać z kolejki i wprowadzać i pobierać dane z początku listy lepiej użyć</span> <span lang="pl">collections.deque</span> <span lang="pl">która została do tego stworzona.</span>

![kolejka](/assets/wp-content/uploads/2017/04/2017-04-03-2-e1491497025986.png)
&nbsp;

### Krotki (tuples)

<span lang="pl">Krotka jest to specjalny rodzaj zmiennej, kt</span><span lang="en-US">ó</span><span lang="pl">ra pozwala na przechowywanie kilku wartości. Podobnie jak w listach wartości mogą być r</span><span lang="en-US">ó</span><span lang="pl">żnych typ</span><span lang="en-US">ó</span><span lang="pl">w. Jednak w przeciwieństwie do list wartości w krotce nie mogą być modyfikowane. Raz zdefiniowana krotka nie zmienia swojej wartości. Moża ich używac jako parametru funkcji lub jako zwracana wartość jeśli potrzebujemy zwr</span><span lang="en-US">ó</span><span lang="pl">cić więcej niż jedną zmienną. </span>

![krotka](/assets/wp-content/uploads/2017/04/2017-04-06-e1491496844259.png)

<span lang="pl">Warto wspomnieć r</span><span lang="en-US">ó</span><span lang="pl">wnież o tym że możemy w prosty spos</span><span lang="en-US">ó</span><span lang="pl">b rozłożyć krotkę na pojedyncze zmienne</span>

![rozklad_krotki](/assets/wp-content/uploads/2017/04/2017-04-06-2-e1491498125586.png)

### Zbiory

<span lang="pl">W Pythonie zbiory są nieposortowaną kolekcją bez powt</span><span lang="en-US">ó</span><span lang="pl">rzeń. Czyli są tak naprawdę dokładnie tym samym czym pojęcie zbioru w matematyce. Oznacza to, że można na nich wykonać dokładnie takie same operacje jak w matematyce czyli: suma, r</span><span lang="en-US">ó</span><span lang="pl">żnica, iloczyn i r</span><span lang="en-US">ó</span><span lang="pl">żnica symetryczna </span>

![zbior](/assets/wp-content/uploads/2017/04/2017-04-06-3-e1491496948454.png)

### Słowniki

<span lang="pl">Będzie to ostatnia z wbudowanych struktur o jakim chcę wspomnieć w tym wpisie. Słownik jest specjalnym rodzajem zbioru, kt</span><span lang="en-US">ó</span><span lang="pl">ry składa się z par klucz:wartość, przy czym klucze muszą mieć wartości unikalne w słowniku. Ten typ jest w innych językach znany pod pojęciem tablicy asocjacyjnej.</span>

![slownik](/assets/wp-content/uploads/2017/04/2017-04-06-5-e1491496874467.png)
&nbsp;

Krótko nie wyszło ale można by było jeszcze dłużej. Jak tylko pobawię się tym więcej i znajdę jakieś triki i ciekawe przykłady wykorzystania to wrócę do tego tematu i napiszę o tym więcej. Na dzisiaj to by było tyle. Zapraszam do komentowania, czytania innych wpisów i do usłyszenia w kolejnym poście.

 [1]: https://fsgeek.pl/2017/04/04/worktimetable-pora-na-api-w-pythonie/