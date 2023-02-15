---
title: Dam się poznać – WorkTimetable
author: feridum
type: post
date: 2017-03-01T06:16:51+00:00
url: /2017/03/01/dam-sie-poznac-worktimetable/
slug: 2017-03-01-dam-sie-poznac-worktimetable
image: "/assets/images/default.jpg"
categories:
  - Daj się poznać 2017
tags:
  - daj sie poznac
  - hello
  - worktimetable
  - world

---
No i stało się. Tak jak pisałem w postanowieniach noworocznych, chcę w tym roku spróbować swoich sił w konkursie Daj Się Poznać. Co z tego wyjdzie? Nie wiem. Mam nadzieję, że wytrzymam do końca, bo w końcu o to tutaj tak naprawdę chodzi.

## Daj Się Poznać

Idei konkursu nie będę opisywał bo jest świetnie opisana [tutaj][1]. Zamiast tego powiem co ja mam tak naprawdę zamiar zrobić. Od momentu kiedy napisałem post noworoczny w którym opisywałem swoje plany na ten rok myślałem co bym chciał zrobić podczas trwania konkursu. Chciałem zrobić coś czego bym przynajmniej od czasu do czasu używał. Nie chciałem jakiegoś wydumanego problemu o którym zapomnę za pół roku. I uznałem, że najlepszym pomysłem dla mnie będzie program w którym mógłbym ewidencjonować swój czas pracy. Jako student pracuję w nieregularnej siatce godzin i potrzebuję co miesiąc podać ilość przepracowanych godzin. Szukałem czegoś fajnego co by pozwoliło mi w prosty sposób to zapisywać ale nie znalazłem niczego spełniającego moje oczekiwania i zostałem z notatnikiem. Tak więc korzystając z nadarzającej się okazji mam zamiar stworzyć swój własny WorkTimetable.

## Czym będzie WorkTimetable?

Chciałbym aby był to bardziej zaawansowany excel ;), Mam pewne wyobrażenie tego jak to powinno wyglądać. Przede wszystkim chciałbym aby był to kalendarz w którym mógłbym zaznaczać godziny swojej pracy. Oprócz tego chciałbym aby można było ustawiać parę parametrów takich jak: minimalna ilość godzin do przepracowania, domyślna ilość godzin w każdym dniu itd. No i najważniejsze chciałbym móc generować pdf z tymi godzinami pod koniec miesiąca. Aplikację chciałbym podzielić na dwie części i dwa repozytoria. Część główna to będzie cały UI aplikacji. Natomiast część serwerową chciałbym przenieść do osobnego repozytorium.

## WorkTimetable od strony technicznej

Od strony frontendu będę opierał aplikację na na połączeniu React&#8217;a i Redux&#8217;a. Oprócz tego zrezygnuję z frameworków css takich jak Bootstrap na rzecz FlexGrida i własnych klas napisanych w metodologii BEM. Co do backendu mam zamiar wykorzystać do tego język Python używając frameworka Flask. Nie będzie łatwo na początku ale do odważnych świat należy. W obu technologiach nie miałem do tej pory za dużo do czynienia ale to będzie idealny projekt żeby się w nich podszkolić. Całość kodu będę trzymał zgodnie z wymaganiami konkursu w repozytorium Githuba. Jednak nie w jednym a w dwóch. Dlaczego? Ponieważ uważam że nie ma sensu mieszać części UI od części backendowej. Tak naprawdę w moim przypadku gdzie backend będzie REST&#8217;owe to obie części mogą się rozwijać samodzielnie od siebie. I dlatego uważam za naturalne to że rozdzielę te części w różnych repozytoriach.

&nbsp;

Na dzisiaj to wszystko. W najbliższych dniach pojawi się wpis w którym omówię początkową strukturę programu. Czuję, że z jednej strony to będzie pracowite 10 tygodni ale z drugiej wiem, że będzie warto. Do usłyszenia.

 [1]: http://dajsiepoznac.pl