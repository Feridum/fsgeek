---
title: "Jak nie zrobić sobie krzywdy w React?"
slug: "architektura-projektu-react"
author: "Feridum"
image: "./logo.png"
tags: ["react", "architektura"]
date: "2022-02-24T09:00:00.860Z"
---

React jest świetną biblioteką, która daje nam sporo wolności. Ale ta wolność powoduje, że możemy podjąć złe decyzje architektoniczne.  W tym wpisie podzielę się radami jak nie zrobić sobie krzywdy w React.

<!--more-->

## Dlaczego można sobie zrobić krzywdę w React?

React daje bardzo dużo swobody. Nie ma tutaj struktury, której trzeba się trzymać tak jak w przypadku Angulara. Z jednej strony jest to super, ponieważ można dostosować strukturę pod własne doświadczenie, pod specyfikę projektu lub preferencje zespołu. Ale z drugiej strony powoduje to, że początkujący mogą sobie zrobić krzywdę podczas nauki React'a. Problemy nie dotyczą tylko samej struktury plików, ale wszystkich tematów: jak tworzyć nowe komponenty, jak układać pliki i co zrobić, gdy plik jest za duży.

## Jak podejść do tworzenia nowych komponentów


> Rule of thumb. Każdy komponent dawać do osobnego pliku

W React moglibyśmy stworzyć wszystkie komponenty w jednym pliku, ale nie jest to wygodne. To, do czego zachęcam to wstawienie każdego nowego komponentu do oddzielnego pliku. Dzięki temu komponenty powinny być małe i łatwe do modyfikacji. Oczywiście od każdej zasady jest wyjątek. Tutaj będzie to np.: komponent Select. W przypadku Selecta bardzo często tworzę osobny komponent dla SelectItem. I najczęściej nie wydzielam do osobnego pliku. Dlaczego?

Ponieważ SelectItem nie jest wykorzystywany przez inne komponenty, a służy wyłącznie oczyszczeniu kodu. 

W przypadku gdy mamy folder z zestawem komponentów, to warto skorzystać z pliku index.ts do wyeksportowania wszystkich komponentów.

```
-> components
---> Select
---> Input
---> Button
--->...
---> index.ts
```


```
//index.ts

export * from './Button';

export * from './Input';

export * from './Select';

```

Taki zapis bardzo skraca naszą listę importowanych komponentów w pliku.


```
//Nie
import { Button } from '../components/Button'
import { Input } from '../components/Input'

//Tak
import { Button, Input } from '../components'

```

### Jak układać pliki?

> Rule of thumb - Staraj się trzymać blisko siebie pliki, które są często edytowane razem.

Jak tworzę nowe komponenty? Najczęściej zaczynam od stworzenia katalogu, który będzie trzymał wszystkie pliki związane z tym komponentem.

```
->nowyKomponent
--->NowyKomponent.tsx
--->NowyKomponent.test.tsx
--->NowyKomponent.styles.ts
--->helpers
---> itd
```

Przy takim podejściu mam wszystkie pliki pod ręką, gdy pracuję nad daną rzeczą. Najczęściej też muszę odwiedzić każdy, gdy wprowadzam zmiany albo naprawiam błędy. Taki podział idealnie się sprawdza do komponentów współdzielonych, gdy jeden folder powinien zawierać wszystko, co potrzebuje komponent.

W przypadku bardziej skomplikowanych funkcjonalności można to jeszcze bardziej rozdzielić.

```
->nowaFunkcjonalność
--->components
--->helpers
--->pages
--->helpers
--->itd

```


Taki podział plików przyda się, gdy mamy do czynienia z całą funkcjonalnością np.: proces rejestracji. Dla każdego etapu mamy osobną stronę, współdzielone komponenty, walidacje itd. Dzięki takiemu układowi, gdy będziesz edytować funkcjonalność, masz wszystko obok siebie.

## Jak się bronić przed długimi plikami

Największa zmora przy programowaniu to bardzo długie pliki. I mówię tutaj o plikach o długości 500 i więcej. Taki plik zmniejsza naszą efektywność i zwiększa szanse na błędy. 

Jakie są główne przyczyny za długich plików: 
- za dużo odpowiedzialności
- warunkowe widoki
- powtórzenia w kodzie


### Za dużo odpowiedzialności

Po czym poznać, że plik ma za dużo odpowiedzialności? Po tym, że znajdziesz tam komponent, funkcje pomocnicze, style, mocki, typy itd. Wchodzisz do pliku i musisz skrolować kilometry, by znaleźć odpowiedni kawałek kodu. Oczywiście w przypadku małych komponentów trzymanie wszystkiego obok siebie jest wygodne i przyspiesza pracę. Natomiast jeśli przekroczy się pewien próg (częściej skrolujesz niż coś dopisujesz) to warto rozdzielić jeden plik na osobne. Ja najczęściej dzielę na: komponent, typy, style i funkcje pomocnicze, jeśli są.

Co można zrobić?
- pilnuj, by nie wrzucać za dużo rzeczy do jednego pliku
- przy dużych komponentach warto rozbijać elementy na mniejsze pliki

### Warunkowe widoki

To jest przypadek, który powoduje u mnie ciarki (i złe wspomnienia, gdy sam tak robiłem 😬). Wyobraź sobie, że masz 3 etapowy formularz, ładowanie danych pomiędzy etapami i wszystko w jednym pliku. Plik jest strasznie długi i zawiera sporo różnych if'ów. Taki plik przestaje być czytelny 5 minut po zakończeniu prac. 

Co można zrobić?
- każdy taki warunkowy widok wydziel do osobnej funkcji lub komponentu
- w głównym komponencie zostaw tylko logikę odpowiedzialną za wyświetlenie danego widoku


### Powtórzenia w kodzie  

> Rule of thumb - jeśli coś się powtarza więcej niż dwa razy, to warto wydzielić do osobnej funkcji/komponentu

Coś takiego najczęściej widzę przy okazji tworzenia menu, rozwijanych list itd. Zaczyna się najczęściej od pojedynczej pozycji, potem jest tworzona druga przez skopiowanie pierwszej itd. I nagle budzisz się z długim komponentem, który zawiera powtórzenia tych samych linijek kodu. I musisz zmienić drobnostkę w każdym.

Co można zrobić?
- gdy widzisz powtarzający się kawałek kodu, wydziel go do osobnej funkcji i korzystaj z niej
- przy powtarzalnych widokach np.:menu, stwórz sobie tablicę z konfiguracją i wykorzystaj .map(), by wyświetlić elementy



## Czy muszę się stosować do tych rad?

Oczywiście, że nie. Są przypadki, gdy moje podejście będzie na wyrost. Wszystko zależy od twojego doświadczenia. Z czasem będziesz w stanie wybierać, z jakiej zasady skorzystać w zależności od sytuacji. Jeśli zaczynasz pracę, to polecam ci wypróbować moje rady. I na ich bazie wypracować własne praktyki.
