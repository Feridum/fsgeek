---
title: "Programisto bądź leniwy!"
slug: "programisto-badz-leniwy"
author: "Feridum"
image: "../images/leniwy-programista/logo.jpg"
tags: ["programista", "praca", "testowanie", "zarządzanie czasem", "lenistwo"]
date: 2018-04-10T08:15:19+02:00
draft: false
---

Najważniejszą cechą programisty obok logicznego myślenia, umiejętności rozwiązywania problemów i znajomości języków programowania powinno być lenistwo. I jeśli tego na razie nie potrafisz to naucz się tego jak najszybciej - możesz tylko na tym zyskać. 

<!--more-->

## Jak to lenistwo?
Jeśli zadaliście sobie to pytanie to ten akapit jest dla was. Tak, według mnie lenistwo powinno być jedną z podstawowych umiejętności programisty. I to zarówno juniora jak i starego wyjadacza, który przed śniadaniem przegryza się przez kod assemblera. Jednak nie chodzi mi o ten rodzaj lenistwa o którym może pomyśleliście czyli: `nic nie robię bo to nudne i mi się nie chce` tylko bardziej to kreatywne czyli `co mogę robić by uniknąć robienia nudnych rzeczy`.  W naszej branży wymaga się abyśmy rozwiązywali problemy, tworzyli nowe rozwiązania i ulepszali dzięki temu świat. Jednak tak jak w każdej innej pracy jest z tym związana masa innych nudnych i monotonnych czynności, które muszą być wykonane ale mało kto ma ochotę to robić. MOżna zadać sobie pytanie j ak je wyeliminować z naszego życia?

## Triki leniwego programisty

Każdy leniwy programista ma w zanadrzu parę sztuczek, które pomagają mu wykonywać dobrze jego zadania omijając jednocześnie te nudne kawałki, dzięki czemu ma więcej czasu na te przyjemniejsze. 

### Testy
Pierwszą z nich jest zrozumienie istoty testów i tego jak bywają pomocne. Z jednej strony może się wydawać, że jest to zaprzeczenie idei leniwego programisty bo trzeba pisać dodatkowy kod, nie wprowadza on żadnej nowej funkcjonalności a do tego często jest to uciążliwe. Jednak jak często powtarzam testowanie pozwala nam zaoszczędzić czas podczas szukania błędu oraz rozwijania aplikacji w późniejszym stadium. Dobrze napisane testy automatyczne pozwolą nam zapanować nad regresją bez konieczności ciągłego klikania po aplikacji by sprawdzić czy coś się nie zepsuło.

### Automatyzacja budowania
Czasy w których trzeba było stawiać aplikacje ręcznie na serwerze przy pomocy listy komend, ręczne instalowanie bibliotek już dawno odeszły. Teraz mamy Dockera oraz parę innych narzędzi, które ułatwiają nam pracę. Jednak nawet przy ich wykorzystaniu należy pamiętać o ciągłej aktualizacji dokumentacji tak by nowe osoby nie miały problemów z postawieniem środowiska oraz żeby wiedza nie zginęła. Również jeśli operowanie w tym środowisku wymaga użycia kilku komend to warto wrzucić je do osobnego pliku makefile by zgrupować je pod jedna komendą

### Wykorzystuj biblioteki

Dzięki platformie github mamy dostęp do wielu gotowych rozwiązań, które możemy za darmo wykorzystać. Warto z tego korzystać zamiast próbować wymyśleć koło na nowo. W 90% przypadkach taka biblioteka wystarczy, co zaoszczędzi nam sporo czasu jaki musielibyśmy spędzić na jej poprawnym zaimplementowaniu. Pozostałe 10% są to sytuacje gdzy potrzebujemy niecodziennego zastosowania lub nie znaleźliśmy nic co odpowiada wymaganiom biznesu. Oczywiście nie należy przesadzać i pobieranie takich bibliotek jak `is-odd`, `is-even`, `is-number` itd. może przynieść więcej szkody niż pożytku. W końcu wszyscy wiemy co się stało z biblioteką `left-pad`

### Wspomagaj się narzędziami
Aktualnie do większości frameworków mamy dostępne dedykowane CLI, które usprawnia proces tworzenia, rozbudowywania oraz ostatecznego budowania aplikacji. W podstawowych sytuacjach nie będziemy mieć potrzeby tworzenia swoich własnych narzędzi i w sumie nie powinniśmy. Oprócz wspomnianych CLI mamy również inne drobne narzędzia do usprawnienia naszej pracy. Aktualnym faworytem od pół roku jest u mnie Prettier, który formatuje nasz kod źródłowy do ustalonego formatu. Jest to zwykła paczka npm i możemy go skonfigurować jako package scripts, dzięki czemu wszyscy będą mieć jednakowo sformatowany kod. Dodatkowo możemy podpiąć sprawdzenie formatowania do naszego CI na githubie. Powoduje to, że nie musimy się zastanawiać nad formatowaniem bo mamy jedną komendę, która wszystko naprawi a nawet jeśli zapomnimy to podczas robienia PR do repozytorium zostanie to sprawdzone.

### Wyciągnij jak najwięcej z IDE
Nowoczesne IDE są prawdziwymi kombajnami, które oferują nam wachlarz różnych funkcjonalności. Początkowo ciężko jest się połapać w tych wszystkich skrótach klawiszowych, możliwych konfiguracji czy morzu wtyczek i rozszerzeń. Warto obserwować swoją pracę by zauważyć co najczęściej musimy zrobić i czy da się to w pewien sposób usprawnić. Może się to odbyć na wiele sposobów: poznanie odpowiednich skrótów klawiszowych, odpowiednia konfiguracji środowiska czy też dodanie własnych szablonów plików (pisałem o tym w dwóch wpisach - osobno dla [Intelij](https://fsgeek.pl/post/intellij-szablony/) oraz [Visual Studio Code](https://fsgeek.pl/post/vsc-snippets/)). Sprawne poruszanie się po środowisku w którym spędzamy większość dnia potrafi oszędzić sporo czasu. 


Może się wydawać, że trzeba strasznie dużo robić żeby być leniwym programistą. Jednak po opanowaniu wszystkich elementów okazuje się, że mamy dużo więcej czasu na inne czynności. Czy warto w takim razie na początku poświęcić czas na udoskonalenie ich? Według mnie warto inwestować we wszystko co w przysłości da widoczne rezultaty. A wy co o tym sądzicie? A może macie własne sposoby na oszczędzanie czasu i bycie leniwym?