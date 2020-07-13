---
title: "Grafika 3D w przeglądarce - WebGL"
slug: "grafika-3d-w-przegladarce-webgl"
author: "Feridum"
image: "../images/webgl/logo.jpg"
tags: ["opengl", "webgl", "javascript", "shadow vertex", "shadow fragment", "jednostka cieniujaca", "jednostka cieniujaca wierzolkow", "jednostka cieniujaca fragmentow"]
date: 2019-05-14T16:05:00+02:00
draft: false
---

Grafika najczęściej się kojarzy z wymogiem bycia artystą, Photoshopem i retuszowaniem zdjęć. To jednak dotyczy grafiki 2D czyli wszelakiego rodzaju plakaty, ilustracje, rysunki czy też witryny internetowe. Mamy też drugi rodzaj grafiki - grafika 3D, którą najczęściej spotykamy w grach komputerowych. Grafikę 3D możemy kojarzyć z Blenderem, ręcznym tworzeniem modeli i potem umieszczaniu na przykład w Unity i dalej w grach. A co jeśli możemy tworzyć trójwymiarowe sceny i umieszczać tam modele bezpośrednio w przeglądarce?

<!--more-->

## WebGL

Przy tworzeniu scen trójwymiarowych, umieszczaniu w nich modeli 3D oraz dalej poruszaniu korzystamy z API graficznych. Pod pojęciem API graficznych należy rozumieć API, które pośredniczy pomiędzy programistą a kartą graficzną tak aby ułatwić pisanie progamów. Dwa najpopularniejsze API z których aktualnie się korzysta to OpenGL oraz DirectX.  OpenGL ma z tej dwójki otwarte źródła i oprócz tego, że służy do tworzenia grafiki 3D jest wykorzystywany do badań naukowych. Dodatkowo istnieje wersja, która została zaimplementowana w przeglądarkach i to jest to co nas dzisiaj najbardziej interesuje. Wersja tą znajdziecie pod nazwą WebGL (i wersja druga oznaczana jako WebGL2)

## Shadery

Pomimo tego, że WebGL jest uruchamiany w przeglądarce to ciągle korzysta z naszego GPU do obliczania i rysowania obiektów. To co ma się dziać na karcie graficznej definiujemy przy pomocy małych programów zwanych jednostkami cieniującymi (shaders). Wyróżniamy dwa rodzaje jednostek cieniujących w WebGL (w OpenGL mamy ich dużo więcej): wierzchołków i fragmentów. Jednostki piszemy w specjalnym języku zwanym GLSL.

I tutaj mała dygresja związana z tworzeniem grafiki :). Tworząc grafikę, którą będziemy wyświetlać określamy tak naprawdę zbiór punktów zwanych wierzchołkami, które definiują kształt obiektu. Najprościej jest sobie to wyobrazić jak grę w łączenie kropek. Następnie te kropki są łączone z użyciem odpowiednich algorytmów w trójkąty, które składają się na gotowy obiekt na scenie. Takie trójkąty nie nadają się jednak to wyświetlanie na ekranie - muszą zostać poddane procesowi rasteryzacji. Proces rasteryzacji zamienia trójkąt opisany za pomocą trzech wierzchołków na zbiór tzw. fragmentów, które potem zamienią się w piksele na ekranie. Również widać od razu, że liczba fragmentów jest sporo większa od liczby wierzchołków co jest czasami istotne ze względu na wydajność.

Do czego nam w takim razie jednostki cieniujące? W jednostce cieniującej wierzchołków (shadow vertex) modyfikujemy parametry związane z pozycją wierzchołków, ustawiamy kolor wierzchołków, wyliczamy wpływ światła itd. Następnie mamy jednostkę cieniującą fragmentów (fragment shader) w której ustawiamy kolor dla fragmentów(pikseli), nakładamy teksturę itd. Po co w ogóle pisałem o ustawianiu koloru dwa razy - raz dla wierzchołka a potem drugi raz dla fragmentu? Kolor jaki ustawimy dla wierzchołków podczas procesu rasteryzacji jest interpolowany dzięki czemu jako parametr wejściowy w jednostce cieniującej fragmentów dostajemy wynikowy kolor który trzeba ustawić dla danego fragmentu jako obowiązujący (lub też go jakoś zmodyfikować). Jako, że na kolor wpływa też światło to moglibyśmy tutaj wyliczać parametry światła. Ale ze względu na dużą ilość obliczeń z tym związaną oraz dużą ilością fragmentów dużo wydajniejsze jest obliczenie tego dla wierzchołków i potem interpolowanie tego. 


## Hello World
Uwaga cały kod został przygotowany dla WebGL2. Aktualnie działa w pełni poprawnie w Chrome, Firefox i Operze. Przystosowanie do WebGL w wersji 1 wymaga kliku poprawek.

Skoro podstawy jednostek cieniujących mamy za sobą to możemy napisać pierwszy program. Program będzie prosty ale to nie znaczy, że kodu będzie mało. Zacznijmy więc od początku. Aby wyświetlić cokolwiek potrzebujemy obiektu canvas. 

```html
 <canvas id='webgl'></canvas>
```

Oraz pobrać odpowiedni context na którym będziemy pracować- to tutaj decyduję, że będę pracował dla API WebGL w wersji 2.

```js
    const canvas = document.getElementById('webgl');
    canvas.height = 400;
    canvas.width = 400;
    const gl = canvas.getContext("webgl2");
```

To teraz czas na resztę elementów. Po pierwsze musimy zdefiniować nasze jednostki cieniujące. Zrobimy to bezpośrednio w kodzie JavaScript.

```js
const vertexShaderSource = `#version 300 es
in vec4 position;

void main() {
  gl_Position = position;
}
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;

out vec4 outColor;

void main() {
  outColor = vec4(1.0,1.0,0.0,1.0);
}
`;
```

A teraz po kolei. Na początku każdej jednostki cieniującej musimy określić jaką wersję języka GLSL aktualnie wykorzystujemy - w tym wypadku korzystamy z GLSL ES 3.00. Dalej definujemy zmienne: 

- `in` zmienna wejściowa w przypadku shadow vertex pochodzi z programu a dla shadow fragment z shadow vertex
- `out` zmienna która wychodzi z naszej jednostki cieniującej

Oprócz określenia czy to jest zmienna wejściowa czy wyjściowa musimy określić jej typ oraz nazwę. Tak jak wspomniałem w poprzednim paragrafie jednostka cieniująca wierzchołków określa pozycję pojedynczych wierzchołków. Aby określić pozycję tego wierzchołka musimy wykorzystać zmienną `gl_Position` i zapisać do niej pozycję. Natomiast w jednostce cieniującej fragmentów musimy określić kolor i dać go jako zmienną wyjściową jednostki.

```js
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader);
```

Dalej są dwie funkcje pomocnicze - jedna do tworzenia jednostek cieniujących oraz drugi do stworzenia samego programu. Aby stworzyć program najpierw potrzebujemy jednostek cieniujących więc kolejność ma tutaj znaczenie ;)

```js
const positionAttributeLocation = gl.getAttribLocation(program, "position");

const vao = gl.createVertexArray();

gl.bindVertexArray(vao);
```

Teraz zdefiniować atrybuty wejściowe dla jednostki cieniującej wierzchołków. Tutaj zrobimy to przy pomocy `Vertex Array Object`. Istotne jest aby nazwy atrybutów w tym miejscu jak i w shadow vertex były IDENTYCZNE.

Drugie polecenie ustawia stworzony chwilę wcześniej obiekt, dzięki czemu wszystkie inne ustawienia będą aplikowane do tego obiektu. No to czas stworzyć nasze pierwsze wierzchołki

```js
const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [
    -0.5, 0,
    0.5, 0.5,
    0.7, -0.2,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
```

Najpierw musimy stworzyć bufor gdzie będziemy przechowywać wierzchołki oraz usatwić nasz bufor jako `gl.ARRAY_BUFFER`. Następnie ładujemy dane do wierzchołka - koordynaty dla wierzchołka przekazujemy jako tablica 32-bitowych floatów. Dodatkowo ustawiamy, że nasze punkty nie będą się często zmieniać więc wpisujemy `gl.STATIC_DRAW` - pozwoli to na dodatkowe optymalizacje. 

```js
gl.enableVertexAttribArray(positionAttributeLocation);

gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0,0);
```

Teraz już zostało tylko podpięcie aktualnie tworzonego bufora do atrybutu. Oprócz samego podpięcia musimy również zdefiniować sposób pobierania danych z tablicy. Wartość na początku - `2` - określa ile danych ma być pobrane z tablicy dla pojedynczego wierzchołka. Teraz już zostaje tylko ustawienie koloru tła i wyświetlenie całości. Całość kodu możecie zobaczyć na Codepen.

<p class="codepen" data-height="475" data-theme-id="0" data-default-tab="js,result" data-user="Feridum" data-slug-hash="rgLZaN" style="height: 475px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Basic WebGL">
  <span>See the Pen <a href="https://codepen.io/Feridum/pen/rgLZaN/">
  Basic WebGL</a> by Aleksander (<a href="https://codepen.io/Feridum">@Feridum</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Dodajmy trochę kolorów

Jak wspomniałem wyżej, możemy do wierzchołków przypisywać kolor i będzie on następnie interpolowany wewnątrz trójkąta. Jak więc dodać informacje o kolorach? Po pierwsze musimy zaktualizować nasze jednostki cieniujące. W jednostce cieniującej wierzchołków musimy dodać informacje o nowym atrybucie wejściowym jakim będzie kolor oraz ustawić parametr wyjściowy, który zostanie przekazany do jednostki cieniującej fragmentów.

```js
const vertexShaderSource = `#version 300 es
in vec4 position;
in vec3 color;

out vec4 fColor;

void main() {
  fColor = vec4(color,1);
  gl_Position = position;
}
`;
```

Natomiast w kodzie dla fragmentów wystarczy, że przypiszemy przekazany kolor. Zauważcie tylko, że nazwa i typ zmiennej się zgadza - tak musi być :D.

```js
const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec4 fColor;
out vec4 outColor;

void main() {
  outColor = fColor;
}
`;
```

Teraz musimy ustawić nowy atrybut w kodzie.

```js
const colorBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

const colors = [
    1,1, 0,
    0, 0.5, 1,
    0.7, 0, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


gl.enableVertexAttribArray(colorAttribute);

gl.vertexAttribPointer(colorAttribute, 3, gl.FLOAT, false, 0,0);
```

Jak widać jest to większości przekopiowanie istniejącego kodu i dostosowanie. Tutaj możecie zobaczyć efekt. Prawda, że jest ładny? 

<p class="codepen" data-height="475" data-theme-id="0" data-default-tab="js,result" data-user="Feridum" data-slug-hash="rgLZON" style="height: 475px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Basic WebGL - vertex colors">
  <span>See the Pen <a href="https://codepen.io/Feridum/pen/rgLZON/">
  Basic WebGL - vertex colors</a> by Aleksander (<a href="https://codepen.io/Feridum">@Feridum</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Oczywiście pisanie wszystkiego przy pomocy czystego WebGL może być uciążliwe. Już teraz do wyświetlenia prostego trójkąta potrzebowaliśmy wielu linijek kodu. Dlatego też w większości jak będziemy tworzyć grafikę 3D będziemy korzystać z dodatkowych bibliotek, które zminimalizują trochę kodu naokoło. Jedną z takich bibliotek jest `three.js` o której będzie więcej następnym razem. 

