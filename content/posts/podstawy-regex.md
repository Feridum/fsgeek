---
title: "W świecie wyrażeń regularnych"
slug: "w-swiecie-wyrazen-regularnych"
author: "Feridum"
image: "../images/podstawy-regex/logo.jpg"
tags: ["wstęp", "nauka", "wyrażenia", "regularne", "regex"]
date: 2018-03-02T07:15:00+01:00
draft: false
---

Wyrażenia regularne pojawiają się najczęściej znienacka i biją od razu po twarzy. Dla kogoś kto widzi je pierwszy raz prawdopodobnie mówią tyle samo co chińskie znaczki - po prostu są. A nie jest to ciężki temat i poświęcając chwilę na jego zgłębienie może się okazać, że te znaczki są proste. Dziś chciałbym pokazać podstawy tego tematu i pokazać, że da się tego nauczyć i potem wykorzystywać.


<!--more-->

## Podstawowy tworzenia wyrażeń regularnych

Tak jak wspomniałem we wstępie tworzenie wyrażeń nie jest proste. Najlepiej się tego nauczyć przez praktykę - jak dla mnie nie da się inaczej, sucha teoria wyleci z głowy. Jeśli jeszcze nie znacie to polecam tą stronę do ćwiczenia a w przyszłości sprawdzania poprawności waszych wyrażeń - [regex101](https://regex101.com/).


Wyrażenie regularne jest to grupa znaków umieszczona pomiędzy  znakami `/`. Jest ono wykorzystywane aby odnaleźć w tekście ciąg znaków, które odpowiadają zdefiniowanemu przez nas wzorcowi lub by sprawdzić czy dany tekst spełnia reguły zdefiniowane przez wzorzec. W teorii jest proste ale problem tkwi w szczegółach - wzorce możemy określać na wiele różnych sposobów, co za chwilę pokażę.  Wszystkie przykłady są sprawdzone przy pomocy strony do której link umieściłem. Warte zauważenia jest, że tam już są zapisane znaczki `/` i możemy się zająć bebechami w środku. Również po ostatnim `/` występuj literka `g` (g od global), która oznacza, że tekst pasujący do wzorca będzie wyszukiwany w całym tekście i nie zatrzyma się na pierwszym wystąpieniu.

## Tworzenie wzorców

Najbardziej podstawowym wzorcem jest sytuacja gdzie szukamy konkretnego tekstu. Możemy wtedy umieścić ten tekst bezpośrednio jako wzorzec np.: `/ala/`. Jednak takie zdefiniowanie nie pozwoli znaleźć już na przykład słowa `Ala`. Aby być bardziej elastycznym istnieje zbiór znaków specjalnych, które pozwalają tworzyć bardziej zaawansowane wzorce: 

- `^`   znak ten oznacza, że tekst pasujący do wzorca będzie znaleziony tylko jeśli znajduje się na początku tekstu np.: wzorzec `/^ala/` zostanie odnaleziony w tekście `ala ma kota` ale już nie w `kota ma ala`.
- `$`  znak jest odwrotnością poprzedniego. Nasz wzorzec zostanie znaleziony w tekście jeśli znajduje się na jego końcu np.: `/ala$/` zostanie znalezione w tekście `kota ma ala` ale już nie w `ala ma kota`
- `*` znak który bezpośrednio poprzedza może wystąpić 0 lub więcej razy np.: do`/al.*a/` pasują `aa`, `ala`, `alla` itd..
- `+` podobnie jak poprzednio tylko znak poprzedzający musi wystąpić przynajmniej raz ale może więcej np. `/al+a/` pasuje `ala`, `alla` itd. Ale już nie pasuje `aa`
- `?` opcjonalność - znak przed tym występujący może występować ale nie musi dla wzorca, przy czym jak występuje to nie może więcej niż raz `al?a` pasują `ala` oraz `aa`
- `.` zastępuje dowolny pojedynczy znak w naszym wzorcu np.: dla `a.a` pasuje `ala`, `ada`, `ara` itd.
- `a|b` - tak możemy zdefiniować alternatywę czyli tekst będzie odpowiadał naszemu wzorowi jeśli będzie zawierał a lub b np.: `/ada|ala/` pasuje `ada` lub `ala`
- `{n}` - znak który poprzedza tą konstrukcję musi wystąpić dokładnie n razy np. dla `/a{3}/` będzie odpowiadał tekst `aaa` ale `aa` lub `a` już nie
- `{n,m}` - podobnie jak poprzednio tylko jesteśmy w stanie określić zakres jaki nam odpowiada: dla `/a{1,3}/` będzie odpowiadało `a`, `aa` i `aaa`
- `{n,}` - w tym przypadku określamy minimalną ilość razy ale nie definiujemy górnej - znak przed tym nie może wystąpić mniej niż n ale może dużo więcej np.: `/a{2,}/` będzie pasowało : `aa`, `aaa` itd. ale `a` już nie
- ``[abc]`` - zbiór znaków - definiuje zbiór znaków jakie mogą wystąpić na pozycji w naszym wzorcu, dla wzorca `/a[ld]a/` pasuje tekst `ala` i `ada` ale `aga` już nie
- `[^abc]` - anty zbiór znaków - definiuje jakie znaki nie mogą się pojawić na danym miejscu, dla wzorca `/a[^ld]a/` pasuje tym razem `aga` ale `ala` i `ada` już nie
- `(a)` - grupowanie części wzorca - mamy możliwość grupowania pewnych części znaków podczas tworzenia wzorca, dzięki czemu możemy określić, że dana część ma się np.: powtórzyć pewną ilość razy (ala) np.: dla `/(ala){3}/` poprawne będzie `alaalaala`. Dodatkowo podczas przetwarzania tekstu, jeśli zostanie znaleziony kawałek tekstu który odpowiada naszemu wzorcowi to będziemy mieli dostęp również do kawałka tesktu który odpowiada naszej grupie. Można to użyć gdy chcemy np.: zweryfikować czy adres url jest poprawny i użyć grup by wyciągnąć dodatkowe informacje np.: domena, czy to jest http czy https itd.
- `(?:a)` - sytuacja identyczna jak u góry z tym że nie zwraca nam wartości wyłapanych w grupach 
- `a(?=b)` - ciekawa konstrukcja która znajdzie nam wzorzec `a` tylko i wyłącznie wtedy gdy zaraz po `a` jest `b` tak więc dla `/ala(?=kota)` pasuje `alakota` ale już `alamakota` - trzeba pamiętać, że naszym wzorcem jest `ala` nie `alakota`
- `a(?!b)` - jest to odwrotność do poprzedniego czyli `a` zostanie znalezione tylko jeśli zaraz po nim nie ma `b` czyli dla `/ala(?!kota)` pasuje `ala` ale już nie `alakota`

Jeśli byśmy chcieli wpisać jako wzór jeden ze znakow specjalnych np.: ^ musimy go poprzedzić znakiem `\`

## Gotowe definicje zbiorów znaków 

Oprócz znaków specjalnych w wyrażeniach regularnych możemy korzystać ze specjalnych wyrażeń które określają dane grupy znaków co może uprościć nasz zapis:

- `\d` - określa znak będący cyfrą - odpowiada `[0-9]`	
- `\D` - znak niebędący cyfrą - odpowiada `[^0-9]`
- `\w` - znak alfanumeryczny oraz podkreślenie - odpowiada `[A-Za-z0-9_]`
- `\W` - znak nie będący znakiem alfanumerycznym lub podkreśleniem  - odpowiada  `[^A-Za-z0-9_]`
- `\s` - odpowiada pojedynczemu białemu znakowi (spacja, znak tabulacji itd) 
- `\S` - odpowiada każdemu znakowi który nie jest biały

## Flagi

No i na sam koniec flagi czyli to co możemy jeszcze dopisać po naszym wzorcu (po znaku `/`). W zależności od użytych flag może się zmienić co znajdziemy w tekście, ile znajdziemy pasujących wzorców i czy w ogóle coś znajdziemy. Nie omówię tutaj ich wszystkich tylko parę według mnie ciekawszych

- `g` - jak wspomniałem na początku oznacza to, że w tekście zostaną odnalezione wszytskie pasujące do wzorca kawałki - bez tej flagi przeszukiwanie skończy się po pierwszym odnalezionym kawałku pasującym do zdefiniowanego wzorca
- `i` - wielkość znaków nie jest brana pod uwagę - wzorzec `/ala/i` zostanie znaleziony zarówno w tekście `ala` jak i `Ala`
- `x` ignoruje spacje w naszym wzorcu - do wzorca `/a l a/x` pasuje tekst `ala` ale już nie `/ala/`

## Przykłady do samodzielnego wykonania

Tak jak wspomniałem na początku najlepiej się nauczyć przez praktykę. Więc jeśli macie chwilę czasu i chcielibyście trochę pogłówkować a nie wiecie co moglibyście zrobić to podsuwam wam parę pomysłów. Jedne są prostsze, drugie trudniejsze ale na pewno do wykonania ;) 

Przykłady zadań do wykonania:

- Sprawdź czy zdanie jest poprawne (zaczyna się od dużej litery, kończy kropką, wykrzyknikiem lub pytajnikiem, czy nie ma niepotrzebnych spacji - zasady możecie dopisać jeszcze sami)
- wyciągnij numer telefonu z tekstu (może być polski czyli `+48(spacja)9 cyfr`)
- wyciągnij kod pocztowy z tekstu
- Zwaliduj czy podany adres email jest poprawny(w zależności od stopnia złożoności jest to zadanie zarówno łatwe jak i trudne - do was należy wybór ;))


