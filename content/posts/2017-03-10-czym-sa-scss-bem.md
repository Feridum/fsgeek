---
title: Czym są? – SCSS i BEM
author: feridum
type: post
date: 2017-03-10T07:57:53+00:00
url: /2017/03/10/czym-sa-scss-bem/
image: "../images/default.jpg"
categories:
  - css
  - czym jest
  - Daj się poznać 2017
  - frontend
tags:
  - bem
  - css
  - czym
  - daj sie poznac
  - frontend
  - jest
  - sass

---
<span lang="pl-PL">SCSS jest tym dla CSS czym Typescript dla JavaScript&#8217;u. Pozwala nam w prosty spos</span><span lang="en-US">ó</span><span lang="pl-PL">b rozszerzyć możliwości zwykłego CSS . Natomiast BEM jest zbiorem zaleceń dotyczących tworzenia i nazewnictwa klas. I obie te rzeczy idealnie ze sobą wsp</span><span lang="en-US">ó</span><span lang="pl-PL">łpracują.</span>

<!--more-->

## Czym jest SCSS?

<span lang="pl-PL">SCSS jest inną nazwą dla Sass 3 kt</span><span lang="en-US">ó</span><span lang="pl-PL">ra posiada trochę odmienną składnię od swoich poprzednik</span><span lang="en-US">ó</span><span lang="pl-PL">w i dlatego otrzymała inną nazwę.</span> Składnia została tak dopasowana by była w pełni kompatybilna ze zwykłymi plikami CSS. Oznacza to że każdy poprawny plik CSS będzie poprawnym plikem SCSS. Jednocześnie posiadamy wszystkie możliwości jakie dawał nam Sass.

## Co nam daje SCSS?

<span lang="en-US">SCSS daje nam wiele możliwości</span> <span lang="pl-PL">z których warto korzystać ponieważ usprawniają naszą pracę ze stylami. Pierwsza rzecz jaka jest warta użycia to zmienne. Dzięki konsekwetnemu korzystaniu z tej funkcji możemy sobie ułatwić pracę w przypadku potrzeby zmiany np.: kolorystyki całej strony. Zmieniamy ją w jednym miejscu a zmiany widzimy wszędzie. Korzystanie ze zmiennych jest proste i wygląda następująco:</span>

<pre class="lang:sass decode:true">$button--backgroundColor: red;


button{

background-color: $button--background-color

}</pre>

Oprócz tego możemy zagnieżdżać w sobie selektory CSS dzięki czemu widać hierarchię styli w naszym pliku i wszystko jest dużo bardziej uporządkowane. Tak to może wyglądać w kodzie:

<pre class="lang:sass decode:true">footer{
width:100%;
   
    a{
        color: red;
     };
}</pre>

Oprócz tego możemy jeszcze importować do pliku SCSS inny plik .scss, rozszerzać napisane klasy, korzystać z mixinów i operatorów arytmetycznych. Jest to temat warty uwagi więc kiedyś pewnie wrócę do niego z bardziej konkretnymi rzeczami.

## Jak się ma do tego BEM?

Jednak jak się do tego ma metodologia BEM? I co to takiego jest? BEM jest metodologią, sposobem pisania naszych aplikacji webowych. Główną ideą tego jest dzielenie naszej aplikacji na samodzielne jednostki zwane też blokami. Ma to pomóc w tworzeniu komponentów, które w prosty sposób będziemy mogli wykorzystać w innych projektach. BEM jest skrótem składającym się z trzech pierwszych liter opisującą tą metodologie &#8211; Block, Element, Modifier.

Block &#8211; jest to nasz niezależny komponent, który będziemy mogli użyć w innej aplikacji np.: widget kalendarza, formularz logowania, widget zegara itp.

Element- jest to pojedynczy element który znajduje się w naszym komponencie np.: przycisk submit w formularzu, tytuł widget&#8217;a itd.

Modifier &#8211; opisuje stan, wygląd lub zachowanie elementu lub całego bloku np.: kolor, zachowanie po kliknięciu, czy jest zablokowany itd.

Nie wiem jak dla was ale jak dla mnie taka definicja BEM&#8217;a idealnie pasuje do React&#8217;a. Tworzymy sobie komponenty które potem możemy wykorzystać w innych miejscach.

## BEM & SCSS

Jednak BEM nie odnosi się tylko to projektowania samej struktury aplikacji ale ma swoje przełożenie w odpowiednim tworzeniu styli. Jest kilka oficjalnie dopuszczalnych konwencji ich nazewnictwa jednak dla mnie na najbardziej przejrzystą wygląda następująca

<pre class="lang:default decode:true">blockName__elemName--modifierName</pre>

Dzięki temu, że w SCSS możemy tworzyć zagnieżdżone struktury w których elementem nadrzędnym będzie block, który będzie zawierał w sobie kolejne elementy i modifiery stworzymy czystą i uporządkowaną hierarchię pliku. Zapowiada się, że dzięki połączeniu BEM&#8217;a i SCSS można naprawdę wiele zrobić. Jak to wygląda w praktyce to dopiero zobaczę i wtedy podzielę się moimi przemyśleniami. Póki co jeśli chcecie poczytać więcej na temat BEM&#8217;a to możecie zajrzeć [tutaj][1].

Uff. Wpis wyszedł troszkę dłuższy niż myślałem a i tak nie napisałem o wszystkim co chciałem. Mam nadzieję, że uda mi się wytrwać w metodologii BEM ponieważ wymaga sporo samodyscypliny. Pewnie wrócę do tego tematu jak napiszę trochę kodu w tym oraz w SCSS więc oczekujcie w przyszłości jeszcze wpisów na ten temat. A póki co trzymajcie się ciepło i do usłyszenia.

 [1]: https://en.bem.info/