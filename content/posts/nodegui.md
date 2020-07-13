---
title: "Czy NodeGUI jest następcą Electrona?"
slug: "czy-nodegui-jest-nastepca-electrona"
author: "Feridum"
image: "../images/nodegui/logo.jpg"
tags: ["nodegui", "nodegui-react" ,"electron"]
date: 2019-10-01T17:30:00+02:00
draft: false
---

Do tej pory jeśli chcieliśmy stworzyć aplikację desktopową z wykorzystywaniem JavaScriptu to nie mieliśmy prawie żadnego wyboru. Istniała tak naprawdę tylko jedna biblioteka, która pozwalała na to czyli Electron. Ale ostatnio pojawił się nowy gracz, który może nie tylko dogonić rywala ale go przegonić.

<!--more-->

## Problemy z Electronem

Główny problem Elektrona jest jednocześnie jego największa zaletą więc nie ma możliwości by zmieniło się to w przyszłości. Mam tu na myśli oparcie całej biblioteki na platformie Chromium. Z jednej strony jest to ułatwienie w pisaniu aplikacji ponieważ możemy korzystać z takich samych bibliotek i frameworków jak podczas pisania zwykłej aplikacji frontendowej. Z drugiej strony potrzebujemy tej platformy by uruchomić aplikację przez co zwiększamy zapotrzebowanie na pamięć. Powoduje to, że pisanie wydajnych aplikacji nie jest trywialne a nawet te dobrze napisane mogą potrzebować dużych ilości pamięci.

## Dlaczego NodeGUI robi to lepiej?

Jak to w świecie JavaScript zawsze znajdzie się osoba, której nie podobają się aktualne rozwiązania i spróbuje zrobić coś inaczej. I na szczęście znalazły się osoby, którym nie podobało się jak działa Electron. Po co opierać całą aplikację na Chromium skoro istnieją biblioteki w innych językach, które budują natywne aplikacje. Z racji tego, że Node.js opiera się na C wybrano bibliotekę QT, dzięki czemu cały nasz kod w jest budowany do natywnych komponentów. Ciągle jednak możemy korzystać z bibliotek z npm'a - jedyne ograniczenie dotyczy UI, tutaj musimy korzystać z rozwiązania NodeGUI. Wiedząc o tym autorzy postanowili przystosować React'a do pracy z komponentami QT tak aby tworzenie aplikacji było przyjemniejsze.

## Jak zacząć z NodeGUI?

Projekt jest stosunkowo nowy to więc nie powstało jeszcze żadne narzędzie, które stworzy nam gotowy do korzystania projekt. Na szczęście nie musimy tworzyć projektu od zera ponieważ istnieje projekt startowy z którego warto na początku skorzystać. Aby to zrobić wystarczy że skorzystamy z polecenia 

```console
git clone git@github.com:nodegui/react-nodegui-starter.git nazwa_katalogu
```

Teraz musimy tylko pamiętać by wejść do stworzonego projektu i usunąć istniejący katalog `.git`. Mając gotowy projekt możemy zainstalować wszystkie potrzebne zależności przy pomocy `npm i` oraz uruchomić naszą aplikację za pomocą komendy `npm start`. Kod jaki dostajemy na początku wygląda następująco

```jsx
const App = () => {
  return (
    <Window minSize={minSize} styleSheet={styleSheet}>
      <View id="container">
        <Text style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">Hello World</Text>
        <Image
          style={imageStyle}
          src={distImgUrl}
          aspectRatioMode={AspectRatioMode.KeepAspectRatio}
        />
      </View>
    </Window>
  );
};

const imageStyle = `
  height: "100px";
  width: "100px";
  property-alignment: 'AlignHCenter';
`;

const styleSheet = `
  #container {
    flex: 1;
    flex-direction: column;
    min-height: '100%';
    align-items: 'center';
    justify-content: 'center';
  }
`;

Renderer.render(<App />);
```

Mamy tutaj proste Hello World z obrazkiem. Sam kod jak się na niego patrzy wygląda jak standardowa aplikacja React, dzięki czemu możemy się tutaj czuć dosyć swobodnie. Jedynym problemem jest brak dokumentacji do tych komponentów i czasami trzeba szukać samemu informacji jak wykorzystać dany komponent. Jest to spowodowane tym, że projekt jest stosunkowo świeży - myślę, że z czasem pojawi się więcej dokumentacji oraz przykładów wykorzystania. Jednak do czasu kiedy pojawi się pełna dokumentacja wstrzymałbym się od korzystania z tego na produkcji, ponieważ może się okazać, że podczas implementacji natrafimy na ścianę. Warto jednak obserwować ten projekt bo może sporo zmienić w sposobie jaki tworzymy aplikacje desktopowe.

A wam jak się podoba ten pomysł? Uważacie, że z czasem przegoni Electrona czy umrze w zapomnieniu? No i czy bawiliście się tym już?

