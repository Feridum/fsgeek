---
title: "Wszystko, co potrzebuje twój kod frontend, by wejść na wyższy poziom"
slug: "jakosc-kodu-prettier-eslint-ci-cd-testowanie"
author: "Feridum"
image: "./logo.png"
tags: ["eslint", "prettier", "ci", "cd", "testowanie"]
date: "2021-04-27T16:00:00.488Z"
---

Aplikacje legacy powstają każdego dnia - nawet twoja ukochana aplikacja kiedyś się taka stanie. Ale można sprawić, by nawet taka aplikacja legacy była przyjemna w modyfikacji. Samo pisanie kodu nie wystarczy - trzeba go przenieść na wyższy poziom.

<!--more-->


## Co warto mieć zaimplementowane w aplikacji frontend?

Jest parę rzeczy, które warto dodać do swojej aplikacji frontendowej, by podnieść ją na wyższy poziom. Najprościej jest, gdy się to zrobi na początku - koszt jest właściwie 0. Co polecam na start projektu?

- Statyczna analiza kodu - ESLint
- Formatowanie kodu - Prettier
- CI/CD
- testy jednostkowe

Wszystkie te elementy mają dwa główne cele: 

1. podnieść jakość DX (developer experience) - dużo łatwiej się tworzy kod, gdy nie musimy się przejmować tak zbędnymi elementami jak formatowanie kodu,
2. podnosi jakoś samej aplikacji - testy, przewidywalny deploy - wszystko to sprawia, że aplikacja działa lepiej.

## Formatowanie kodu z Prettier

Kojarzysz kłótnie o tab vs spacje w kodzie? Mam nadzieję, że u Ciebie w projekcie takie dyskusje nie mają już miejsca. Ja kiedyś przeżyłem komentarze w PR o poprawę formatowania kodu. **Narzędzia do formatowania kodu pozwalają pozbyć się tego dylematu**. Na początku projektu wystarczy ustalić z zespołem zasady dla tego narzędzia i potem już będzie wszystko robił sam. A dlaczego warto coś takiego wprowadzić? Jest kilka zalet.

- nasz kod w każdym pliku wygląda identycznie,
- przyspiesza to pracę, ponieważ mózg przyzwyczaja się do określonej struktury,
- zapobiegamy niepotrzebnemu bałaganowi w kodzie,
- dużo lepiej się pracuje w schludnym kodzie.

W przypadku JS'a najpopularniejszym narzędziem aktualnie jest Prettier. Jeśli go nie znasz, to koniecznie sprawdź. Ale najpierw przeczytaj kolejny paragraf dalej, bo rozwinięciem Prettiera będzie ESLint.

## Statyczna analiza kodu - ESLint

**Tak jak formatowanie kodu dba tylko o cześć wizualną, tak statyczna analiza kodu dba już o jakość kodu**. To narzędzie sprawdza nasz kod pod względem ustalonych przez nas reguł. I my te reguły możemy dowolnie konfigurować, by dopasować do naszego stylu pisania. Jakie korzyści otrzymujemy ze statycznej analizy kodu?

- sprawdza, czy nasz kod spełnia określone wymogi jakości,
- pomaga przeciwdziałać błędom np.: == vs === lub typowanie w TS,
- utrzymuje jakość kodu, gdy dołączają nowe osoby,
- ściąga odpowiedzialność z procesu code review.

W przypadku JS'a najpopularniejszy jest ESLint. Kiedyś dla TS'a istniała alternatywa (TSLint), ale jest już deprecated i dla nowych projektów nie warto w to iść. Co więcej, ESLint bardzo dobrze się integruje z Prettier i możemy jednym plikiem konfiguracyjnym (i jedną komendą) obsłużyć oba narzędzia. W przypadku ESLint możemy instalować wiele zależności, które dbają o różne aspekty kodu, np.:

- security
- sortowanie importów
- dobre praktyki w testowaniu
- a11y

Jest bardzo dużo, wtyczek do ESLinta, które dbają o różne aspekty kodu - znajdziesz na pewno coś dla siebie.

## CI/CD

Jaki jest problem z powyższymi narzędziami? **Muszą być uruchamiane, by mogły poprawić błędy lub sprawdzić, czy istnieją jakieś**. Najlepszym miejscem do tego są wszystkie systemy CI/CD. Aktualnie wszystkie główne serwery git'a (github, gitlab, bibucket) dają narzędzia od testowania kodu, który umieszczamy na serwerze. Dodatkowo w przypadku pull-request'ów mamy możliwość blokowania takiej zmiany, która nie przechodzi testów. Co możemy sprawdzać?

- statyczna analiza kodu i formatowanie
- testy
- czy aplikacja buduje się poprawnie
- wszystkie inne sprawdzenia, które są dla nas istotne np.: czy instalowane biblioteki mają odpowiednie licencje

Kolejnym krokiem jest automatyzacja procesu deploy'u. Czyli nie chcemy ręcznie za każdym razem czytać instrukcji jak poprawnie wypuścić nową wersję na serwer. Będzie to powodowało problemy, które łatwo uniknąć tworząc skrypt CD. **Czyli za każdym razem, gdy będzie aktualizacja kodu na głównej gałęzi kodu, to jest uruchamiany deploy na serwer produkcyjny**. Tak samo można zrobić dla stagingu czy innych serwerów testowych. Mamy pewność, że na serwerach jest zawsze aktualna wersja kodu.

## Testy

Na koniec (ale równie ważny) został temat testów. **Testy w aplikacji muszą być - koniec kropka**. Mamy wiele rodzajów testów i najważniejsze jest dopasować je do naszych potrzeb. Najpopularniejszy podział wygląda następująco:

- jednostkowe
- integracyjne
- e2e

W zależności od tego, co aktualnie robimy, to proporcje pomiędzy poszczególnymi rodzajami będą się zmieniać. Ważna jest również kwestia procentowego pokrycia kodu testami. Ile powinno wynosić? 0% jest złe, to wiadomo. A czy powinniśmy zawsze mieć 100%? No niekoniecznie. Powinniśmy dążyć do takiej wartości, ale czasami nie warto testować naszego kodu tak, aby przejść po każdej linijce. To, że mamy 100% nie oznacza, że kod jest bezpieczny. Dużo lepiej testować faktyczne przypadki biznesowe, które mają nas zabezpieczyć przed błędami w przyszłości. 

No i kwestia uruchamiania testów. Dobrze, żeby każdy deweloper uruchamiał te testy przed wypuszczeniem zmian. Ale obowiązkowo trzeba ustawić uruchamianie testów w narzędziach CI/CD.

A ty korzystasz z czegoś jeszcze? Co dodajesz do aplikacji, by podnieść jej jakość? Daj znać w komentarzu lub wyślij mi prywatną wiadomość.