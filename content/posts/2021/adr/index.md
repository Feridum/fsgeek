---
title: "Skąd się to wzięło, czyli potrzebujesz ADR"
slug: "adr-architecture-decision-record"
author: "Feridum"
image: "./logo.png"
tags: ["architektura"]
date: "2021-07-16T13:31:39.407Z"
---

Mówi ci coś skrót ADR? Jest to sposób dokumentacji projektu, który uwzględnia decyzje architektoniczne, jakie zachodzą w projekcie. Brzmi poważnie, ale da się to prosto wprowadzić i czerpać zyski.

<!--more-->

## Po co nam dokumentacja

Zastanawiasz się pewnie, po co ci taka dokumentacja. W końcu trzeba to opisać na początku i potem aktualizować. Brzmi jak strata czasu. A jeszcze pewnie takie dokumenty będzie mało kto czytał. Taką dokumentację docenia się tylko w jednym momencie. Kiedy jest koniecznie potrzebna i jej nie ma. 

Zrób sobie rachunek sumienia. Czy pamiętasz w projekcie sytuację, gdzie zastanawialiście się, dlaczego dana funkcjonalność została zrobiona tak, a nie inaczej? Albo, kiedy wchodziłeś do projektu i zastanawiałaś/zastanawiałeś się, dlaczego to jest napisane aż tak źle. I nikt zespołu nie potrafi ci odpowiedzieć dlaczego, bo osoba, która to wprowadzała, już dawno się zwolniła z pracy. Wtedy pewnie dużo byś dał za taką dokumentację, która by ci powiedziała, dlaczego zmiana została wprowadzona, dlaczego tak, a nie inaczej i dała kontekst zmiany.

Na przykład wchodzisz do projektu i zastanawiasz się, dlaczego jednoczenie w projekcie jest Moment.js i dateFns. A odpowiedź może być prosta - przy starcie Moment.js był najlepszy, teraz jest deprecated i trzeba przenieść się na coś nowego. I trafiłeś do projektu w środku przenosin z Moment.js na dateFns.

I tym właśnie pomaga ADR czyli architecture decision record. Opisuje jakie zmiany (i dlaczego) zostały wprowadzone.

## Jak wygląda ADR?

Wiadomo już, co przemawia za tym, żeby pisać ADR. Jak tylko wygląda taki plik? I tutaj dobra wiadomość. Nie ma tak naprawdę odgórnie narzuconego schematu. Możemy ten plik kształtować dowolnie, jak go potrzebujemy i umieszczać w nim takie informacje, jakie uznamy za przydatne. Tutaj mogę zaproponować parę przydatnych pól, które możemy wykorzystać.

- Kontekst zmiany - dlaczego została przeprowadzona
- Data - kiedy została wprowadzona
- Inne opcje - czy były inne opcje rozpatrywane i dlaczego zostały odrzucone
- Decyzja - ostateczna decyzja np.: korzystamy z Reduxa i opis jak będziemy z niego korzystać (struktura plików, nazewnictwa itd)
- Status - czy zmiana została przeprowadzona, czy jest w trakcie

Przykładowy plik może wyglądać następująco.

```yaml
Date: 
Context: 
Options: 
Decision:
```

## Gdzie to trzymać?

Kolejna sprawa to gdzie trzymać takie pliki, by o nich nie zapomnieć. Tutaj też mamy dowolność. Możemy trzymać na firmowym Wiki np. Confluence, możemy mieć jakiś dokument tekstowy w Googlu lub dowolne inne miejsce. Jednak ja proponuję, aby trzymać takie decyzje w repozytorium naszego projektu w postaci krótkich plików Markdown. Dzięki temu będzie zawsze pod ręką, kiedy będzie potrzebne no i też nie będzie wymagało dużego nakładu pracy.

## Co dokumentować na froncie?

No i na koniec najważniejsze, czyli co tak naprawdę można dokumentować na frontendzie. Wbrew pozorom jest dużo możliwości. Najwięcej takich decyzji będzie na pewno na starcie projektu, czyli np. wybór biblioteki komponentów, wybór reduxa, strukturę katalogów, cały stack technologiczny itd. Również w czasie trwania projektu może powstać wiele ważnych decyzji np. tak jak było z Momement.js - jest deprecated i trzeba ją zamienić na coś innego. Dzięki temu, gdy nowa osoba przyjdzie do projektu, to też będzie wiedziała, co się działo w projekcie.

## Czy na programowaniu się kończy?

Do niedawna myślałem, że tak. Ale ostatnio spotkałem się z Design Decision Record. I sprawuje się bardzo dobrze. Dzięki temu, jak szukałem informacji, to wiedziałem na co patrzeć i jaka była historia zmian. Myślę, że taki dokument może być pomocny wszędzie tam, gdzie trzeba podejmować decyzje.