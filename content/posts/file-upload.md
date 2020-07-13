---
title: "Upload plików w aplikacji"
slug: "upload-plikow-w-aplikacji"
author: "Feridum"
image: "../images/file-upload/logo.jpg"
tags: ["Upload plikow", "React", "javascript", "HTML"]
date: 2019-07-24T07:00:00+02:00
draft: false
---

Upload plików w aplikacji jest dość często pojawiającą się funkcjonalnością. Pozwala na wysyłanie plików do innych osób, serwisów, dostarczaniu danych do aplikacji żeby nie musieć wypełniać ich ręcznie lub zwykłym umieszczaniu zdjęć na stronie. Podczas tworzenia aplikacji możemy wykorzystać jedną z wielu bibliotek, która dodaje w naszej aplikacji frontendowej taką funkcjonalność ale może da się to zrobić samemu?

<!--more-->

## input type="file"

Tak naprawdę stworzenie takiej funkcjonalności bez żadnej bibliotek nie jest niczym trudnym. Musimy się tylko oprzeć o znany element HTML - input z odpowiednim typem `file`

```html
<input type="file"/>
```

Już samo takie polecenie powoduje, że wyświetla nam się przycisk wraz z informacją dotyczącą jaki plik wybraliśmy.

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="html,result" data-user="Feridum" data-slug-hash="zVQEVW" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Input file">
  <span>See the Pen <a href="https://codepen.io/Feridum/pen/zVQEVW/">
  Input file</a> by Aleksander (<a href="https://codepen.io/Feridum">@Feridum</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Oczywiście na tym nie kończą się możliwości tego elementu ponieważ razem z tym typem dostajemy kilka atrybutów, którymi możemy sterować pracą inputa. Znajdziemy tam: 

- `accept` - określamy jakie typy plików lub rozszerzeń użytkownik może wybrać
- `capture`- jeśli dopiszemy ten atrybut to podczas wyboru pliku do uploadu automatycznie będzie wykorzystana kamera lub mikrofon (w zależności od atrybutu accept) o ile są dostępne
- `multiple` - atrybut typu boolean, który określa czy można wybrać kilka plików
- `files` - pod tym atrybutem znajdują się nasze pliki

Warto jeszcze na chwilę zatrzymać się przy atrybucie `accept`. Dopuszcza on kilka możliwości ustawiania wartości: 

- Rozszerzenie pliku, który chcemy dopuścić np.: `.png`
- Poprawny typ MIME np.: `image/png`
- Tekst `audio/*`, który oznacza dowolny plik dźwiękowy
- Tekst `video/*`, który oznacza dowolny plik wideo
- Tekst `image/*`, który oznacza dowolny obrazek

Dodatkowo możemy podać wiele wartości oddzielając je przecinkiem np.: `accept=".png,.jpg"`. 

## Upload pliku w React 

Jednak rzadko kiedy widzimy takie pole, ponieważ nie pasuje ono zazwyczaj do wyglądu strony i taki element psułby wizualnie całość aplikacji. Zamiast tego widzimy zwykłe przyciski lub inne mechanizmy, które ukrywają input a wystawiają ładnie wyglądający element. Jak to zrobić w React.js? Przykładowy komponent może wyglądać następująco:

```jsx
<div>
    <input
      type="file"
      className="inputFile"
      ref={file}
      onChange={handleChange}
      data-testid="inputFile"
    />
    <div className="container">
    <div className="fileName" data-testid="fileName">
        {fileState && fileState.name}
    </div>
    <div className="button" onClick={handleClick}>
        Wybierz plik
    </div>
    </div>
</div>
```

Przy tworzeniu takich komponentów pierwszy krok to będzie umieszczenie oraz ukrycie natywnego `<input type="file"/>`. Dalej wykorzystujemy mechanizm `ref'a` w React'cie aby dostać się do tego elementu i go kliknąć oraz potem by pobrać odpowiedni plik z atrybutu `files`. Cała reszta to tak naprawdę odpowiednie ostylowanie naszego komponentu. Prawda, że proste?

## Testy w React

Została ostatnia rzecz do zrobienia. Skoro mamy komponent w React'cie to warto go przetestować. Ostatnio testuję komponenty React'a z wykorzystaniem [react-testing-library](https://github.com/testing-library/react-testing-library) (jeśli korzystacie z Enzyma to polecam spróbować tej biblioteki - osobiście znacznie lepiej pisze mi się teraz testy). Oczywiście to co tutaj pokażę to jest najprostszy przypadek i pokazuje tylko jak można podejść do tego problemu. Każdy formularz jest unikalny i będziemy w nim testować coś innego. 

```react
const file = new File(["filec content"], "file.png", {
  type: "image/png"
});

describe("shows the children when the checkbox is checked", () => {
  it("display filename in box after upload", () => {
    const { getByTestId } = render(<UploadFile />);

    const input = getByTestId("inputFile");

    Object.defineProperty(input, "files", {
      value: [file]
    });

    fireEvent.change(input);

    expect(getByTestId("fileName").textContent).toEqual("file.png");
  });
});

```

Tak może wyglądać test do komponentu, który stworzyliśmy przed chwilą. Najważniejsza jest ta część, która odpowiada za stworzenie pliku w JS oraz zasymulowanie wybrania go przez użytkownika.

Tworzenie pliku: 
```ts
const file = new File(["filec content"], "file.png", {
  type: "image/png"
});
```

Symulacja wybrania pliku przez użytkownika:
```ts
Object.defineProperty(input, "files", {
  value: [file]
});

fireEvent.change(input);
```


Całość kodu możecie zobaczyć na [CodeSandbox](https://codesandbox.io/s/fileupload-txx8f). A jak u was wygląda upload plików? Rozwiązujecie to podobnie czy zupełnie inaczej? A może wolicie biblioteki - jeśli tak to z czego korzystacie i dlaczego?
