---
title: Poukładajmy kod – moduły, fukcje i klasy w Pythonie
author: feridum
type: post
date: 2017-04-18T07:15:14+00:00
image: /assets/wp-content/uploads/2017/04/moduly.jpg
url: /2017/04/18/moduly-klasy-funkcje-w-pythonie/
slug: 2017-04-18-moduly-klasy-funkcje-w-pythonie
categories:
  - Backend
  - Daj się poznać 2017
  - Python
tags:
  - backend
  - daj sie poznac
  - nauka
  - programowania
  - python

---
Bardzo często podczas pisania dłuższych aplikacji powtarzamy swój kod. Jest to nieuniknione ponieważ wykorzystujemy podobne algorytmy do różnych celów. Warto temu przeciwdziałać już na samym początku i wydzielać samodzielne kawałki kodu w specjalnie konstrukcje o których powiem dziś parę słów.

## Funkcje

Jest to najprostszy sposób by wydzielić fragment kodu. Skąd wiedzieć kiedy ich użyć? Na pewno zawsze wtedy kiedy widzimy powtórzenia tego samego kodu które różnią się tylko argumentem na którym wykonujemy operacje. Również wtedy kiedy mamy bardzo długie warunki w pętli if warto się zastanowić czy nie wydzielić tego do osobnej funkcji aby kod stał się czytelniejszy. W Pythonie funkcje tworzy się przy pomocy słówka kluczowego def po której następuje nazwa funkcji, jej parametry wywołania i ciało. W parametrach możemy podać wartości domyślne po znaku ‚=’. Funkcja może zwrócić wartość przy pomocy słowa return ale nie musi.

<pre class="lang:python decode:true ">def nazwa_funkcji(parametr1, parametr2=1):

#ciało funkcji

return wynik #opcjonalne, nie musi być</pre>

Wywołanie funkcji odbywa się poprzez podanie jej nazwy oraz potrzebnych parametrów w nawiasie okrągłym. Możemy również przypisać naszą funkcję do zmiennej i przy jej pomocy wywoływać funkcję:

<pre class="lang:python decode:true">nazwa_funkcji(1) #korzystamy że drugi parametr ma wartość domyślną
nazwa_funkcji(1,2)

n = nazwa_funkcji
n(1)
n(1,2) #zachowanie jak wyżej</pre>

## Klasy

Jest to kolejny etap wydzielania naszego kodu do osobnych struktur. Dodają one do wyżej opisanych funkcji własne pola i zamykają to w jednej strukturze. Pomagają w prosty sposób zarządzać całym obiektem który reprezentują np.: przeciwnik w grze. Definiujemy go przy pomocy słówka kluczowego class po którym podajemy nazwę naszej klasy.

<pre class="lang:python decode:true">class NazwaKlasy:

#ciało klasy</pre>

Pola w klasie w Pythonie są domyślnie typu publicznego. Tak jak w innych językach możemy tu definiować konstruktor, który będzie inicjalizować zmienne w naszej klasie. Jednak w odróżnieniu do innych języków nie korzystamy tu z słówka kluczowego constructor (jak w PHP) lub funkcji o nazwie identycznej z nazwą klasy ( C++) tylko ze słówka kluczowego \_\_init\_\_. Po tej nazwie podajemy parametry z jakimi chcemy wywołać obiekt naszej klasy. W przeciwieństwie do innych języków nie możemy definiować wielu konstruktorów. Podobnie jak w przypadku funkcji tutaj też możemy definiować wartosci domyślne dla parametrów konstruktora.

<pre class="lang:python decode:true">def __init__(self):
    #konstruktor bezargumentowy

def __init__(self, argument1, argument2=1):
    #konstruktor argumentowy</pre>

Teraz możemy stworzyć obiekt naszej klasy w pliku *.py i korzystać z jego metod i zmiennych przy pomocy operatora ‚.’

<pre class="lang:default decode:true ">x = NazwaKlasy() #dla konstruktora bezargumentowego lub argumentowego gdzie są domyślne wartosci
x = NazwaKlasy(argument1, argument2) #dla konstruktora argumentowego

x.zmienna1
x.funkcja1()</pre>

## Moduły

Na sam koniec zostawiłem moduły w Pythonie. Według oficjalnej dokumentacji jest to plik, który zawiera definicje i wyrażenia z tego języka.  Moduły możemy wykorzystywać by porządkować nasz kod. Możemy na przykład mieć grupę funkcji, których zadaniem jest obliczanie różnych rzeczy w matematyce. Wygodnie jest umieścić je w jednym module dzięki czemu będziemy mogli łatwo wykorzystać gdziekolwiek będziemy go potrzebować. Również dobrym pomysłem jest wrzucanie klas do osobnych modułów dzięki czemu jak będziemy potrzebować daną klasę to nie będziemy duplikować kodu. Korzystanie z istniejących modułów wygląda następująco:

<pre class="lang:default decode:true">#import całej zawartości pliku
import nazwaPliku  #wpisujemy nazwę pliku bez rozszerzenia

#import konkretnych funkcji i/lub klas
from nazwaPliku import funkcja1,funkcja2, klasa3</pre>

&nbsp;

Jak widać w Pythonie mamy sporo możliwości by podzielić nasz kod na mniejsze części i zapobiec powtórzeniom. Warto z nich korzystać ponieważ są pierwszym i jednym z łatwiejszych sposobów na stworzenie i utrzymanie czystego kodu.