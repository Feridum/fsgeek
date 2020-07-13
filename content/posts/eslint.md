---
title: "ESLint - statyczna analiza kodu w JavaScript"
slug: "eslint-statyczna-analiza-kodu-javascript"
author: "Feridum"
image: "../images/eslint/logo.jpg"
tags: ["eslint", "javascript", "typescript", "badz produktywny"]
date: 2020-03-01T19:05:00+01:00
draft: false
---

Narzędzia do statycznej analizy kodu występują w każdym języku programowania. W JavaScript jednym z takich narzędzi jest ESLint. Pomaga nam nie tylko utrzymać czysty kod ale niejednokrotnie zapobiega powstawaniu błędów. I tyle wystarczy by być obowiązkowym elementem każdego projektu.

<!--more-->

## ESLint

ESLint jest biblioteką, która powstała 7 lat temu i pozwala definiować reguły dotyczące kodu. Bilbioteka sama w sobie nie narzuca żadnych konkretnych reguł tylko daje użytkownikom narzędzia do ich samodzielnego zdefiniowania. Oczywiście oprócz możliwości korzystania z od razu wbudowanych reguł mamy możliwość tworzenia własnych pluginów i modułów, które dostarczają nowe funkcjonalności. Sam ESLint może pracować w dwóch trybach: 

- Sprawdzanie czy nasz kod spełnia reguły, które sobie zdefiniowaliśmy - idealne do CI/CD
- Automatyczna naprawa naszego kodu tak aby spełniał reguły

Automatyczna naprawa jest naprawdę fajną funkcjonalnością ale trzeba pamiętać, że nie zawsze naprawi błąd no i czasami są sytuacje gdzie chcemy napisać coś niezgodnego z regułami. Aby naprawić kod wystarczy, że dodamy przełącznik `--fix` do komendy. Kolejną zaletą ESLinta jest mocna integracja ze wszystkimi wiodącymi edytorami - potrafią one znaleźc naszą konfigurację i formatować kod według naszych reguł.

## Co z TypeScriptem?

Do niedawna jeśli chcieliśmy skorzystać z lintera w projekcie z TypeScriptem mogliśmy skorzystać z biblioteki TSLint. Jednak w 2019 roku zdecydowano o zawieszeniu prac nad rozwojem tej biblioteki i rozwojem wsparcia dla Typescripta w samym ESLint. W tym roku przestaną być już akceptowane wszystkie PR'ki więc dla nowych projektów zdecydowanie polecam ESLinta a w przypadku starych zastanowił się czy nie warto się na niego przenieść. 

## Konfiguracja ESLinta

Zanim przjedziemy do konfiguracji samego ESLinta musimy go zainstalować 

```console
npm install eslint --save-dev
```

Teraz mamy do wyboru dwie drogi: możemy albo sami wszystko skonfigurować od zera albo skorzystać z odpowiedniego polecenia

```console
npx eslint --init
```

Po udzieleniu odpowiedzi na kilka pytań dostaniemy wstępnie skonfigurowany plik .eslintrc, który możemy następnie dowolnie konfigurować i zmieniać. Najważniejsze ustawienia znajdziemy w opcjach `plugins`, `extends`, `rules` - i też z nich będziemy najczęściej korzystać.

Podczas konfigurowania naszego pliku będziemy zaczynać od sekcji `plugins` - tutaj będziemy umieszczać pakiety, któee dodatkowo instalujemy i chcemy z nich skorzystać. Biblioteki te najczęściej mają nazwę w postaci `eslint-plugin-nazwaPluginu` .

Sekcja `extends` sluży do rozszerzania naszej konfiguracji o pewien zestaw reguł. Może to być pojedyncza nazwa zestawu, którym określimy podstawy zbiór reguł np.: 
`"extends": "eslint:recommended"`, lub też tablica kolejnych zestawów gdzie każda z pozycji będzie coś dodawała od siebie.

No i na koniec zostawiłem sekcję `rules`  - tutaj możemy dodawać reguły, które nie znalazły się w konfiguracji powstałej przy użyciu sekcji `extends` lub zmieniać sposób ich zachowania. Jest to obiekt w którym klucze są nazwami reguł, które chcemy skonfigurować, natomiast wartościami są ustawienia dla konkretnych reguł. To co możemy ustawić zależy od konkretnej reguły i zawsze musimy zajrzeć do dokumentacji. Elementem powtarzającym się w każdej regule jest definiowanie jak powinien reagować eslint na kod, który łamie regułę - mamy tutaj trzy opcje: 

- `off` - reguła jest wyłączona
- `warning` - reguła będzie się wyświetlała tylko jako ostrzeżenie
- `error` - reguła będzie wyrzucała błąd

No to teraz jak uruchomić ESLint'a i sprawdzić nasz kod? Wykorzystujemy oczywiście polecenie `eslint` z odpowiednimi przełącznikami. To jakie są wszystkie możliwe opcje to można sprawdzić w dokumentacji ale na samym początku wystarczy dwa: 

- `--ext` - określamy rozszerzenie plików jakie mają być sprawdzane
- `--fix` - jeśli chcemy naprawić kod
	
Całościowo komenda może wyglądać następująco:

```console
eslint src --ext .ts,.tsx
eslint src --ext .ts,.tsx --fix
```


## Ciekawe reguły

Oczywiście jak to w świecie JS'a mamy dostępnych wiele pluginów i ustawień, z których możemy skorzystać podczas budowania naszego pliku `.eslintrc`. Ja chciałbym pokazać wam moje ulubione reguły bez których nie wyobrażam sobie pisania czystego kodu. Oczywiście to są tylko moje propozycje i warto samemu zbudować swój zbiór reguł: 

- "no-console": "error"
- "import/no-default-export": "error",
- "import/order": [
        "error",
        {
        "groups": ["external", "builtin","parent","internal","index", "sibling"],
        "newlines-between": "always"
        }
    ],
- "@typescript-eslint/no-explicit-any": "error",
- "@typescript-eslint/no-empty-function": "error"


A wy macie korzystacie na codzień z ESLinta? Macie jakieś ulubione reguły bez których nie wyobrażacie sobie pisania kodu?



