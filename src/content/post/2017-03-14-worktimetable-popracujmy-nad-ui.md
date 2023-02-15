---
title: 'WorkTimetable#3 – Popracujmy nad UI'
author: feridum
type: post
date: 2017-03-14T07:30:53+00:00
url: /2017/03/14/worktimetable-popracujmy-nad-ui/
slug: 2017-03-14-worktimetable-popracujmy-nad-ui
image: "/assets/images/default.jpg"
categories:
  - css
  - Daj się poznać 2017
  - frontend
  - react
tags:
  - daj sie poznac
  - flexboxgrid
  - frontend
  - react
  - react-big-calendar

---
<span lang="en-US">Ten weekend był wyjątkowo pi</span><span lang="pl">ękny pod względem pogody i atmosfery więc postanowiłem wykorzystać ten czas by popracować nad UI mojej aplikacji. </span><span style="font-size: 16px;"> Projektowanie UI nigdy nie jest łatwą sprawą, ponieważ trudno dogodzić wszystkim. Przy tworzeniu aplikacji jest to dla mnie szczególnie trudna część, ponieważ dopiero sobie wyrabiam pewien zmysł artystyczny i estetyczny. Jednak nie poddaję się i ostro z tym walczę.  </span>

## UI WorkTimetable

<span lang="pl">Jak już wspominałem o tym wcześniej w mojej aplikacji chciałbym sam popracować nad UI i dlatego zrezygnowałem z framework&#8217;a takiego jak Bootstrap na rzecz własnych klas napisanych w SCSS i flexboxgrida. Dzięki temu czuję wiekszą władzę nad tym co tworzę. Korzystanie z flexboxgrida zacząłem od zainstalowania go przy pomocy yarna używając tego polecenia<br /> </span>

<pre class="theme:cisco-router lang:default decode:true">yarn add flexboxgrid</pre>

Następnie musiałem tylko dodać w głównym komponencie linijkę która importuje plik flexboxgrida do aplikacji

<pre>import 'flexboxgrid/dist/flexboxgrid.min.css'</pre>

Od tego momentu mogłem używać klas z tego pliku w mojej aplikacji.

<span lang="pl">Jednak nie samym gridem żyje człowiek więc napisałem swoje pierwsze klasy. I tu się pojawił pierwszy problem. Okazało się, że aplikacja nie widziała plików scss pomimo tego że były poprawnie napisane oraz dołączone we właściwy sposób. Po dłuższym szukaniu błędu winnym okazał się brakujący plik .env, który nie dodał się do repozytorium githuba i brakowało go po pobraniu kodu na innej maszynie. Jeśli więc korzystacie z </span>[<span lang="pl">kitze</span><span lang="pl">/</span><span lang="pl">custom-react-scripts</span>][1] <span lang="pl">sprawcie czy macie plik .env z wartością REACT_APP_SASS ustawioną na true.</span>

## React Big Calendar

Oprócz ulepszenia UI aplikacji uznałem, że dobrym pomysłem będzie także przejrzenie gotowych komponentów do tworzenia kalendarzy. Dlaczego go nie robię sam? Ponieważ pomimo tego, że wydaje się to dosyć proste to jest to materiał na osobny projekt więc postanowiłem poszukać gotowych rozwiązań. Wśród kilku obecnych na githubie kalendarzy znalazłem w końcu [react-big-calendar][2]. Zdecydowałem się na niego ponieważ opiera się na znanym mi Full Calendar oraz wygląda na to że będzie miał wszystkie potrzebne mi opcje.

Dodanie kalendarza do projektu było proste i polegało na użyciu komendy

<pre class="theme:cisco-router lang:default decode:true ">yarn add react-big-calendar</pre>

Oprócz tego w komponencie w którym będę korzystał z kalendarza zaiportowałem plik css tak jak radzi to dokumentacja na githubie przy pomocy poniższej linijki

<pre>import 'react-big-calendar/lib/css/react-big-calendar.css'</pre>

Minimalny kod jaki jest potrzebny by dodać kalendarz do komponentu jest pokazany poniżej

<pre class="lang:js decode:true ">&lt;BigCalendar events={[]} /&gt;</pre>

Nie da się opuścić opcji events ponieważ jest ona obowiązkowa. Należy również pamiętać by element w którym znajduje się kalendarz miał dokładnie określoną wysokość ponieważ w innym przypadku widok dla całego miesiąca się nie wyrenderuje.

<p lang="en-US">
  To jak aktualnie wygląda aplikacja możecie sprawdzić <a href="https://feridum.github.io/WorkTimetable-UI/#/">tutaj</a>. Nie czuję się póki co bardzo uzdolnionym designerem więc chętnie przyjmę porady i wskazówki co do wyglądu. Dążyłem do minimalistycznego układu i mam nadzieję, że taki udało mi się osiągnąć.
</p>

<p lang="en-US">
  Następnym krokiem będzie dodanie Redux&#8217;a do aplikacji tak aby stała się czymś więcej niż tylko zbiorem widoków. Dzięki temu będziemy mogli tworzyć akcje i wypełniać widok danymi. Będzie z tym pewnie trochę problemów na początku ale na pewno będzie to warte wysiłku. Do następnego razu 🙂
</p>

 [1]: https://github.com/kitze/custom-react-scripts
 [2]: https://github.com/intljusticemission/react-big-calendar