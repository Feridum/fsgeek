---
title: "Czy znasz różnicę pomiędzy Continuous Integration, Continuous Delivery i Continuous Deployment"
slug: "co-to-jest-continuous-integration-continuous-delivery-continuous-deployment"
author: "Feridum"
image: "./logo.png"
tags: ["ci", "cd", "devops"]
date: "2021-06-05T11:14:36.248Z"
---

Jeśli programujesz od jakiegoś czasu, to pewnie spotkałeś się ze skrótami CI/CD. Są to skróty dobrych praktyk tworzenia oprogramowania - Continuous Integration, Continuous Delivery oraz Continuous Deployment. Jakie są różnice pomiędzy nimi i dlaczego warto wprowadzać te praktyki?

<!--more-->

## Dołącz do grupy na FB

Jako że temat CI/CD jest bardzo bliski mojemu sercu, to postanowiłem stworzyć grupę na FB. Chcę stworzyć miejsce, gdzie można dzielić się wiedzą, pomóc wszystkim, co stawiają pierwsze kroki w takiej automatyzacji oraz uczyć się od innych. [Kliknij, aby dołączyć do grupy.](https://www.facebook.com/groups/307254980945555)

## Continuous Integration

Wszystkie 3 praktyki są skonstruowane tak, że polegają na sobie. Na samym dole drabinki jest właśnie Continuous Integration.  Polega na **ciągłym integrowaniu kodu** z główną gałęzią. Polega to na tym, że integrujemy kod z główną gałęzią tak często, jak to możliwe. Nawet kilka razy dziennie. Dzięki temu nie mamy żadnych zmian, które długo czekają na możliwość zmergowania. Usprawnia to też proces tworzenia nowych funkcjonalności, ponieważ zmniejsza ryzyko wystąpienia konfliktów w kodzie i konieczności ich rozwiązywania (co zajmuje czas).

Aby móc wprowadzić taki proces należy mieć zautomatyzowane sprawdzanie kodu. I to zarówno od strony statycznej, jak i testów. Kolejnym etapem jest również budowanie kodu i np.: umieszczanie artefaktów jako gotowe do wykorzystania obrazy dockerowe.

> Uwaga! Na etapie CI tylko integrujemy zmiany z główną gałęzią i przygotowujemy kod do deployu. Proces deployu jest ciągle ręczny.

## Continuous Delivery

Continuous Delivery jest rozwinięciem idei CI. Tylko teraz nie zatrzymujemy się na przygotowaniu kodu do deployu, ale automatyzujemy cały proces deployu. Czyli mając Continuous Delivery, programista nie musi pamiętać jak wypuścić zmiany, ale może jednym kliknięciem rozpocząć proces i iść na kawę. 

> Uwaga! Deployment nie wykonuje się automatycznie - trzeba ręcznie go wywołać.

## Continuous Deployment

Tutaj już automatyzujemy wszystko - jeśli wszystkie testy przeszły, to deploy jest automatycznie uruchamiany. Na tym etapie użytkownicy dostają wszystkie poprawki, jak tylko zostaną zmergowane. Dzięki temu nie muszą czekać 2 tygodni na funkcjonalność. Ale ma to też minus. Jeśli mamy słabe testy to możemy zepsuć aplikację w piątek o 15 jedną zmianą. 

## Od czego zacząć?

Najlepiej zacząć od Continuous Integration. Czyli automatyzujemy testy i sprawdzanie jakości kodu. Dzięki temu będziemy stopniowo zwiększali pokrycie testami i będziemy czuli się bezpieczniej na kolejnych etapach. 

Równolegle z tym możemy wprowadzać Continuous Delivery. Czyli automatyzujemy cały proces wypuszczenia nowego kodu na serwer. Wynikiem tej operacji powinno być zastąpienie całej instrukcji deploy'u jednym zdaniem - `Kliknij przycisk Deploy to ....`

Dopiero jak mamy obie części układanki możemy myśleć o uruchomieniu Continuous Deployment. Jest to najwyższy poziom zaufania do kodu i procesu. Ale uwaga - jeśli niedokładnie zaimplementujemy CI, to Continuous Deployment zapewni nam stresujące życie. Dlatego najpierw należy się skupić na CI i potem wprowadzać kolejne elementy.