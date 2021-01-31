---
title: "Jak dodać AI do aplikacji w 5 minut?"
slug: "ai-tensorflow-js-w-praktyce"
author: "Feridum"
image: "./logo.png"
tags: ["ai", "sztuczna inteligencja", "react", "tensorflow"]
date: "2021-02-01T16:00:00.488Z"
---

Tensorflow jest jedną z głównych bibliotek wykorzystywanych w uczeniu maszynowym. Zazwyczaj kojarzymy ją z Pythonem, ale ma też wersję dla JS'a. Wykorzystując gotowe modele, jesteśmy w stanie dodać do naszej aplikacji trochę inteligencji. I to nie jest tak trudne, jak się wydaje.

<!--more-->

## Wykrywanie toksycznej mowy

Toksyczna mowa, jaką widać w internecie, jest coraz większym problemem. Widzimy ją najczęściej w komentarzach pod artykułami, postami, wpisami itd. I jako twórcy aplikacji powinniśmy jakoś się przed tym bronić. Jednym z rozwiązań może być wykorzystanie uczenia maszynowego i modelu, który potrafi wykrywać taką mowę. **Tensorflow posiada model `@tensorflow-models/toxicity`, który można wykorzystać**. Jak wygląda jego implementacja?

```jsx
import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
```

Po pierwsze import potrzebnych bibliotek. Zawsze potrzebujemy zaimportować główną bibliotekę z tfjs, a potem wykorzystywany model. Teraz najważniejsze - wykorzystanie modelu.

```jsx
 toxicity.load(threshold).then((model) => {
      model.classify(textarea.current.value).then((predictions) => {
        setResult(JSON.stringify(predictions));
      });
    });
```

Ważny jest parametr **`threshold`, który informuje od jakiego poziomu prawdopodobieństwa bierzemy wartość**. Np.: jeśli parametr wynosi 0.9, a dostaniemy wartość 0.7 na przekleństwo, to nie uznajemy tego za przekleństwo. Dalej już prosto podajemy tekst do sprawdzenia i czekamy na wynik - tutaj może to chwilę zająć więc warto poczekać. Co dostajemy?

```json
[
   {
      "label":"identity_attack",
      "results":[
         {
            "probabilities":{
               "0":0.9921522736549377,
               "1":0.007847674190998077
            },
            "match":false
         }
      ]
   },
   {
      "label":"insult",
      "results":[
         {
            "probabilities":{
               "0":0.011824174784123898,
               "1":0.9881758689880371
            },
            "match":true
         }
      ]
   },
   {
      "label":"toxicity",
      "results":[
         {
            "probabilities":{
               "0":0.009817453101277351,
               "1":0.9901825785636902
            },
            "match":true
         }
      ]
   }
]
```

**Dostajemy wynik dla każdej z 6 kategorii (identity attack, insult, obscene, severe toxicity, sexual explicit, threat) i ostateczny wynik w postaci klucza toxicity**. Model ten jest nauczony wykrywania przekleństw w języku angielskim. W akcji możesz zobaczyć to na poniższym codesandbox.

<iframe src="https://codesandbox.io/embed/tf-toxicity-xolqe?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="tf-toxicity"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Wykrywanie obiektów na zdjęciu

Kolejna ciekawa funkcjonalność to wykrywanie obiektów na zdjęciach. Możemy to wykorzystać na przykład by walidować zawartość zdjęcia. Szybki przykład - mamy portal społeczny i chcemy, by użytkownik na zdjęciu profilowym dodawał swoją twarz, a nie kota. Do tego celu wykorzystam **model coco-ssd, który potrafi wykryć 80 obiektów**. Więc jak to po kolei zaimplementować?

```jsx
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
```

Na początku importujemy wszystkie skrypty. Istotne są te backendy, ponieważ z ich pomocą będzie przetwarzane zdjęcie. Dalej już mamy kod, który można wykorzystać w naszej aplikacji.

```jsx
const handleAdd = async () => {
    const file = fileInput.current.files[0];

    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = async () => {
      const img = new Image();
      img.src = fr.result;
      img.onload = async () => {
        const model = await cocoSsd.load();
        const predictions = await model.detect(img);
        setResult(JSON.stringify(predictions));
      };
    };
  };
```

Wykorzystuję tutaj pole `<input type='file'/>` by uzyskać zdjęcie. Zanim je zacznę przetwarzać, muszę przekształcić je do obiektu klasy Image. Na samym końcu odpalamy detekcję na obrazku. Co możemy dostać?

```json
	[
   {
      "bbox":[
         232.63840913772583,
         244.34025764465332,
         2700.7557463645935,
         3832.3988246917725
      ],
      "class":"person",
      "score":0.9437448978424072
   }
]
```

Dostajemy tablicę możliwości, gdzie dla każdej mamy: 

- bbox w formacie [x,y,width, height] - miejsce na zdjęciu, gdzie zostało wykryte
- klasa obiektu
- prawdopodobieństwo, z jakim klasa została znaleziona na zdjęciu

Sprawdź to sam na codesandbox.

<iframe src="https://codesandbox.io/embed/tf-detect-z41h8?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="tf-detect"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Znajdowanie odpowiedzi w tekście

Na sam koniec coś w ramach ciekawostki, czyli możliwość znajdowania odpowiedzi w podanym tekście. **Model qna pozwala generować odpowiedzi do pytania na podstawie danego tekstu**. Standardowo najpierw musimy zaimportować potrzebne biblioteki.

```jsx
import "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
```

Teraz już zostaje tylko pobrać model i go wywołać.

```jsx
const model = await qna.load();
const answers = await model.findAnswers(
    input.current.value,
    textarea.current.value
);
```

Co dostajemy jako rezultat?

```json
[
   {
      "text":"June 28, 197",
      "score":22.3937349319458,
      "startIndex":26,
      "endIndex":38
   }
]
```

Jako rezultat dostajemy tablicę możliwych odpowiedzi. Każda odpowiedź zawiera znaleziony tekst, jego pozycję w oryginalnym tekście i poziom ufności. Niestety nie jest to zbyt dokładne i nie na każde pytanie znajdzie odpowiedź. 

Mam też gotowy przykład na codesanbox, gdzie możesz sprawdzić to w praktyce. 

<iframe src="https://codesandbox.io/embed/tf-qna-8j3b0?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="tf-qna"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Zadanie domowe

Spróbuj sam to zaimplementować i zastanów się, gdzie można by to wykorzystać. A może w twoim aktualnym projekcie widzisz idealne miejsce na trochę AI?