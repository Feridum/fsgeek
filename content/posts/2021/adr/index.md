---
title: "ADR powie ci prawdę o projekcie"
slug: "adr-architecture-decision-record"
author: "Feridum"
image: "./logo.png"
tags: ["architektura"]
date: "2021-07-20T16:00:00.407Z"
---

Mówi ci coś skrót ADR? Jest to sposób dokumentacji projektu, który uwzględnia decyzje architektoniczne, jakie zachodzą w danym projekcie. Brzmi poważnie, ale da się to prosto wprowadzić i czerpać (czasem duże) zyski.

<!--more-->

## Po co nam dokumentacja?

Zastanawiasz się pewnie, po co ci taka dokumentacja. W końcu trzeba to pisać i potem pamiętać, by aktualizować. Brzmi jak strata czasu. A jeszcze pewnie takie dokumenty mało kto czyta. Taką dokumentację docenia się tylko w jednym momencie. Kiedy jest potrzebna na już i jej nie ma. 

Zrób sobie rachunek sumienia. Czy pamiętasz w projekcie sytuację, gdzie zastanawialiście się, dlaczego dana funkcjonalność została zrobiona tak, a nie inaczej? Albo, kiedy wchodziłeś do projektu i zastanawiałaś/zastanawiałeś się, dlaczego to jest napisane aż tak źle. I nikt z zespołu nie potrafi ci odpowiedzieć dlaczego, bo osoba, która to wprowadzała, już dawno się zwolniła z pracy. Wtedy pewnie dużo byś dał za taką dokumentację, która by ci powiedziała, dlaczego zmiana została wprowadzona.

Na przykład wchodzisz do projektu i zastanawiasz się, dlaczego jednoczenie w projekcie jest Moment.js i date-fns. A odpowiedź może być prosta - przy starcie projektu Moment.js był najlepszy, teraz jest deprecated i trzeba przenieść się na coś nowego. I trafiłeś na środek przenosin z Moment.js na date-fns.

I tym właśnie pomaga ADR, czyli architecture decision record. Opisuje jakie zmiany (i dlaczego) zostały wprowadzone.

## Jak wygląda ADR?

Wiadomo już, co przemawia za tym, żeby pisać ADR. Jak tylko wygląda taki plik? I tutaj dobra wiadomość. Nie ma tak naprawdę odgórnie narzuconego schematu. Możemy ten plik kształtować dowolnie, jak go potrzebujemy i umieszczać w nim takie informacje, jakie uznamy za przydatne. Tutaj mogę zaproponować parę przydatnych pól, które możemy wykorzystać.

- Kontekst zmiany - dlaczego została przeprowadzona
- Data - kiedy została wprowadzona
- Inne opcje - czy były inne opcje rozpatrywane i dlaczego zostały odrzucone
- Decyzja - ostateczna decyzja np.: korzystamy z Reduxa i opis jak będziemy z niego korzystać (struktura plików, nazewnictwa itd)
- Status - czy zmiana została przeprowadzona, czy jest w trakcie

Przykładowy plik może wyglądać następująco.

```yaml
Date: 17-07-2021
Context: Moment.js jest deprecated
Options: date-fns, luxon, day.js
Decision: Idziemy w date-fns bo wygląda na najlepszy/najmniejszy etc.
```

## Gdzie to trzymać?

Kolejna sprawa to gdzie trzymać takie pliki, by o nich nie zapomnieć. Tutaj też mamy dowolność. Możemy trzymać na firmowym Wiki np. Confluence, możemy mieć jakiś dokument tekstowy w Googlu lub dowolne inne miejsce. Jednak ja proponuję, aby trzymać takie decyzje w repozytorium naszego projektu w postaci krótkich plików Markdown. Dzięki temu będzie zawsze pod ręką, kiedy będzie potrzebne no i też nie będzie wymagało dużego nakładu pracy.

## Co dokumentować na froncie?

No i na koniec najważniejsze, czyli co tak naprawdę można dokumentować na frontendzie. Wbrew pozorom jest dużo możliwości. Najwięcej takich decyzji będzie na pewno na starcie projektu, czyli np. wybór biblioteki komponentów, wybór reduxa, strukturę katalogów, cały stack technologiczny itd. Również w czasie trwania projektu może powstać wiele ważnych decyzji np. tak jak było z Momement.js - jest deprecated i trzeba ją zamienić na coś innego. Dzięki temu, gdy nowa osoba przyjdzie do projektu, to też będzie wiedziała, co się działo w projekcie.

## Czy na programowaniu się kończy?

Do niedawna myślałem, że tak. Ale ostatnio spotkałem się z Design Decision Record. I sprawuje się bardzo dobrze. Dzięki temu, jak szukałem informacji, to wiedziałem na co patrzeć i jaka była historia zmian. Myślę, że taki dokument może być pomocny wszędzie tam, gdzie trzeba podejmować decyzje. Zachęcam do spróbowania.