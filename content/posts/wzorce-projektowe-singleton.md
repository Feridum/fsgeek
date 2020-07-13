---
title: "Wzorce Projektowe Singleton"
slug: "wzorce-projektowe-singleton"
author: "Feridum"
image: "../images/singleton/logo.jpg"
tags: ["wzorce", "projektowe", "singleton", "pojedyncza", "instancja", "klasy", "antywzorzec"]
date: 2018-01-03T08:00:00+01:00
draft: false
---

Tym  wpisem chciałbym zacząć mini serię dotyczącą wzorców projektowych jakie występują w programowaniu i na jakie możecie się natknąć podczas pracy. Wzorzec jest stosunkowo prosty ale według niektórych należy go traktować jako antywzorzec. Jeśli jesteście ciekawi dlaczego antywzorzec to zapraszam do dalszego czytania.

<!--more-->

## Wzorzec projektowy

W związku z tym, że jest to pierwszy post z serii to warto powiedzieć parę słów na temat samych wzorców projektowych. Czym one w ogóle są? I po co w ogóle je stosować? 

Wzorce projektowe są to sprawdzone w praktyce sposoby postępowania w przypadku znanych problemów projektowych. Chodzi w nich o to, że bardzo często w programowaniu obiektowym spotykamy się z podobnymi problemami w kwestiach architektonicznym czyli jak coś zrobić by działało ale również by inni wiedzieli o co chodzi w naszym kodzie. Dzięki temu, że istnieją już sprawdzone metody postępowania w postaci wzorców to nie musimy wymyślać koła od nowa. 

Kolejny plus to wspomniana już uniwersalność i to że są powszechnie znane. Dużo łatwiej wejść do projektu gdzie ktoś korzystał z wzorca budowniczego lub fabryki. Jeśli je znamy to szybciej zrozumiemy co robi dany kawałek kodu niż jakieś własne rozwiązanie problemu. Jeśli wspomniane przed chwilą wzorce nic wam nie mówią to zachęcam do śledzenia bloga ponieważ będę je opisywał w kolejnych postach.


## Wzorzec Singleton

W większości wzorców projektowych nazwa jest już dla nas wskazówką co on robi. W przypadku dzisiaj opisywanego ważny jest początek - `single` czyli z angielskiego pojedynczy. Singleton jest wzorcem, który pokazuje nam jak możemy ograniczyć ilość instancji pewnej klasy do określonej liczby przy czym najczęściej chcemy ograniczyć do pojedynczej instancji. Możemy wtedy traktować naszą klasę jako klasę globalną, której instancja będzie jednakowa dla każdego wywołania. Taka klasa przechowuje w sobie prywatne pole które zawiera instancję siebie samej oraz publiczną metodę która pozwala pobrać instancję klasy. Domyślny konstruktor jest najczęściej prywatny by nie pozwalać tworzyć nowych instancji. Sposób działania takiej kasy jest następujący: Przy wywołaniu konstruktora klasy sprawdź czy istnieje już instancja klasy. Jeśli tak to ją zwróć w przeciwnym przypadku stwórz nową, zapisz do zmiennej i zwróć. Gdzie możemy takie coś wykorzystać? Na przykład przy tworzeniu gier chcemy by była tylko jedna instancja głównej klasy gry, która kontroluje przebieg gry, przejścia między poziomami itd.


## Czy może jednak antywzorzec?

Pomimo tego, że singleton jest wzorcem to wielu programistów uważa go za antywzorzec. Dlaczego? Ponieważ jest często nadużywany i stosowany bez przemyślenia sytuacji. Wrócę tutaj do porównania do zmiennej globalnej. Czasami takie zmienne mogą być użyteczne ale jeśli przesadzimy zaczynają być kłopotliwe i tylko przeszkadzają zamiast pomagać. Tutaj jest podobnie. Można powiedzieć, że im bardziej skomplikowany projekt tym problemy są większe. Nawet w przypadku tworzenia gier gdzie wykorzystywanie singletona było w pewien sposób usprawiedliwione słyszałem już opinie, że nadaje się do szybkiego prototypowania ale na dalszą metę lepiej użyć innych mechanizmów. Mój kolega kiedyś powiedział, że jeśli myślisz żeby użyć singletona to przemyśl to jeszcze raz a najlepiej dwa razy.


A wy co myślicie o tym wzorcu projektowym. Unikacie, korzystacie a jeśli tak to  w jakich sytuacjach. Zapraszam do komentarzy :) 

