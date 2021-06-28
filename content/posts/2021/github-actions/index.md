---
title: "Jak utrzymywać jakość projektu z Github Actions?"
slug: "ci-github-actions"
author: "Feridum"
image: "./logo.png"
tags: ["ci", "github actions"]
date: "2021-06-29T16:00:00.953Z"
---

CI/CD potrafi bardzo usprawnić naszą pracę, automatyzując część procesów. Dzięki temu nasz projekt jest "pilnowany" 24/7. A my mamy więcej czasu na ważniejsze sprawy. Jeśli korzystasz z Githuba, to koniecznie sprawdź Github Actions.

<!--more-->

## Github Actions

Github Actions jest wbudowanym narzędziem CI/CD w Githuba. Możesz go stosować dla wszystkich swoich repozytoriów. Do czego możesz to wykorzystywać? Najczęstsze przypadki użycia to: 

- puszczanie testów kodu
- statyczna analiza kodu
- budowanie obrazów dockera
- deploy nowej wersji kodu na środowisko

Wszystko to pomaga ci zautomatyzować prace w projekcie i znacząco podnieść jakość kodu. A to wszystko powoduje powstanie lepszej aplikacji końcowej.

## Pilnowanie jakości kodu 24/7

To jest najprostszy i według mnie najważniejszy sposób utrzymywania jakości w kodzie. Dzięki poniższym linijkom masz pewność, że to, co trafia do głównej gałęzi, utrzymuje standardy, jakie zostały przyjęte w kodzie. Czyli same zalety za 5 minut roboty. Wystarczy, że weźmiesz poniższy kod i wstawisz do swojego projektu.

```yaml
name: CI

on:
  pull_request:
    branches: 
      - main

jobs:
  run_all:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '14.x'
      - name: Installing dependencies
        run: npm i
      - name: Run linting
        run: npm run lint
      - name: Run test
        run: npm run test
      - name: Run build
        run: npm run build
```

Plik musisz umieścić w folderze **<twój projekt>/.github/workflows/<nazwa_konfiguracji>.yml**. Jako nazwa pliku możesz dać np.: **main.yml**

Co się dzieje w tej konfiguracji?

Po pierwsze mamy informacje, kiedy będzie się uruchamiała ta automatyzacja - w tym przypadku jest to za każdym razem, gdy zrobimy pull request do gałęzi main.

Dalej mamy konfigurację `jobów`. Powyższa konfiguracja składa się z jednego joba i kilku kroków. 

Kroki są następujące: 
1. Uzyskujemy dostęp do kodu przy pomocy `actions/checkout@v2`

2. Pobieramy aktualną wersję Node'a 

3. Instalujemy wszystkie potrzebne zależności

4. Uruchamiana jest statyczna analiza kodu

5. Uruchamianie są testy jednostkowe

6. Uruchomione jest budowanie projektu

Po co budować projekt? Są dwa powody. Po pierwsze sprawdzamy, czy nie występują jakieś błędy podczas budowania. Po drugie tak zbudowaną aplikację można gdzieś umieścić.

Co tu jeszcze można dodać? 

- testy e2e
- deploy na serwer testowy
- notyfikacje na kanałach np.: slack
- uruchamianie skryptów na serwerze
- itd.

I to tyle. Jak wiesz co robić, to napisanie całej konfiguracji zajmuje 5 minut. A po co robić to tutaj, a nie ręcznie? Bo jeśli robisz coś ręcznie, to istnieje duża szansa, że kiedyś zapomnisz, by coś sprawdzić. Na przykład z pośpiechu, w piątek po południu, zapomnisz puścić testy po "małej zmianie" i zepsujesz produkcję. Słaba perspektywa, co nie? Dlatego zachęcam do implementacji tego od razu w swoim projekcie.

## Chcesz wiedzieć więcej?

Jeśli temat cię zainteresował to mam dla ciebie super wiadomość. Napisałem, krótki ebook na temat Github Actions (i nie tylko). Jeśli chcesz przenieść swoje repozytorium na kolejny poziom, to potrzebujesz właśnie tego ebooka. 

Co znajdziesz w ebooku?

- jak zarządzać gałęziami w Github
- czym są Github Actions
- gotowe konfiguracje do implementacji u Ciebie w projekcie
- bardziej zaawansowane konfiguracje na przyszłość

**I to wszystko dostaniesz ZA DARMO. Wystarczy, że zapiszesz się do newslettera na [https://ci.fsgeek.pl/](https://ci.fsgeek.pl/)**

Oprócz tego zyskujesz:

- w poniedziałki o 7.00 - wybrane dla ciebie artykuły i narzędzia
- w środy o 16.00 - informacje o nowym poście wraz z bonusem do każdego