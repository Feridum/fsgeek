---
title: "Co to jest Headless CMS?"
slug: "co-to-jest-headless-cms"
author: "Feridum"
image: "../images/headless-cms/logo.jpg"
tags: ["Co to jest Headless CMS", "CMS", "Headless CMS"]
date: 2019-01-17T17:30:00+01:00
draft: false
---

Systemy CMS są powszechnie znane i lubiane przez wielu ludzi, którzy chcą prowadzić własną stronę, blog czy też sklep ale nie mają wiedzy by wszystko zrobić sami od zera. Jednak istnieje wersja tego systemu, która nazywa się Headless CMS i jest bardziej skierowana do programistów. Dlaczego tak jest? Zapraszam do dalszego czytania.

<!--more-->

## Co to jest CMS?

Żeby zrozumieć czym jest Headless CMS należy wiedzieć czym jest CMS. CMS (Content Managment System) to system, który pozwala na zarządzanie treściami na stronie internetowej czyli dodawanie, edycja i usuwanie stron, wpisów, obrazków itd. Jest to aktualnie najprostszy sposób by stworzyć coś w internecie, wyrazić swoje opinie czy też rozpocząć sprzedaż. Popularność tego typu rozwiązania jest spowodowana przez łatwość w instalacji(wiele usług hostingowych pozwala na automatyczną instalację takich rozwiązań), możliwość personalizowania wyglądu strony oraz rozszerzania funkcjonalności przy pomocy wtyczek. Są tam też obecne najczęściej edytory WYSIWYG, dzięki czemu można tworzyć i formatować tekst jak w zwykłym programie tekstowym. Co składa się na takie rozwiązanie: 

- Baza danych - służy do zapisywania stworzonych przez nas treści ale również konfiguracji całego systemu - najczęściej znajdziemy tutaj bazę relacyjną (np.: MySQL) ale mogą być rozwiązania z bazami dokumentowymi
- Panel Admina - pozwala na edycję zarówno ustwień strony i CMS'a oraz zarządzanie treścią
- Prezentacja danych - strona internetowa na którą trafia zwykły użytkownik.
- API - łączy wszytskie powyższe elementy w całość

Najpopularniesze rozwiązanie tego typu to od lat Wordpress, do którego mamy szeroki wybór różnych rozszerzeń oraz szablonów. Zaczynając od tych darmowych, które pomagają dodać pojedyncze funkcjonalności do potężnych(i najczęściej płatnych) rozszerzeń, które pozwalają zmienić całkowicie sposób działania Wordpressa. To samo dotyczy szablonów gdzie znajdziemy proste oraz darmowe, ale za te ładniejsze i posiadające najwięcej opcji dopasowania wyglądu będziemy musieli zapłacić.

## Co to jest HeadlessCMS?
To skoro CMS jest taki dobry to po co taki twór jak Headless CMS? Według mnie tak jak normalny CMS jest skierowany głownie dla użytkownika nietechnicznego tak Headless CMS jest skierowany przede wszytskim dla programistów, a w szczególności dla programistów frontendu. Headless CMS składa się z 3 elementów:

- Baza danych
- API - tutaj dostajemy dostęp do zaptań HTTP, które pozwalają na dostęp do stworzonych treści
- Panel Admina

Pozostałe elementy składowe mają takie samo zadanie jak w przypadku zwykłego CMS'a ale widać tu brak jednego składnika - Prezentacji danych. Dzięki takiemu rozwiązaniu jesteśmy w stanie na szybko stworzyć API, załadować danymi oraz dać użytkownikowi końcowemu łatwy panel do wprowadzania kolejnych danych. Kolejna zaleta tego rozwiązania to brak przywiązania do jakiejkolwiek formy prezentacji danych, dzięki czemu nasze API możemy wykorzystać w wielu miejscach. To co jest zaletą jest również minusem czyli jeśli potrzebujemy w jakiś sposób reprezentować dane to musimy samodzielnie stworzyć widok i pobierać dane. Ale nie jesteśmy jednocześni przywiązaniu do jakichkolwiek zasad tworzenia szablonów jak w przypadku zwykłych CMS'ów więc możemy użyć dowolnego narzędzia i zrobić front tak jak tylko chcemy. 

Takie rozwiązanie może się idealnie sprawdzić w przypadku gdy tworzymy prostą aplikację i nie potrzebujemy osobnego zespołu backendowego np.: do stworzenia bloga czy prostej strony internetowej. Inny przykład użycia to sytuacja gdy klient chciałby w prosty sposób edytować treści znajdujące się na stronie, zmiana tłumaczeń i chciałby panel który mu to umożliwia.

W przypadku HeadlessCMS trudno jednoznacznie wytypować taki który jest najpopularniejszy(a przynajmniej ja takiego nie znam). Najczęściej spotykamy serwisy SaaS które oferują możliwość stworzenia swojego API po zapłacenie pewnej kwoty co miesiąc. Dużo rzadziej pojawiają się biblioteki open source, które możemy uruchomić sami na serwerze - ale tutaj na szczęście powoli się to zmienia i pojawia się ich coraz więcej. Oczywiście wiele zależy od języka w którym chcemy go stworzyć ale pewnie większosć tych popularnych posiada takie rozwiązanie (a jak nie to może jest nisza, która czeka by ją zapełnić? :) ) Natomiast część z tych, które istnieją możecie zobaczyć [tutaj](https://headlesscms.org/). A wy kiedyś korzystaliście z takiego rozwiązania? Co o tym sądzicie?