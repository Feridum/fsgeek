---
title: 'WorkTimetable#2 Konfiguracja react-router'
author: feridum
type: post
date: 2017-03-08T06:33:17+00:00
url: /2017/03/08/worktimetable-konfiguracja-react-router/
slug: 2017-03-08-worktimetable-konfiguracja-react-router
image: "/assets/images/default.jpg"
categories:
  - Daj się poznać 2017
  - frontend
  - react
tags:
  - daj sie poznac
  - frontend
  - react
  - worktimetable

---
Mało jest aplikacji, które składają się tylko z jednego widoku. Zdecydowana większość ma ich więcej i pojawia się potrzeba sprawnego zarządzania nimi z poziomu kodu. W przypadku aplikacji opartych na React&#8217;cie z pomocą przychodzi react-router.



## Instalacja react-router

Aby dodać do projektu tą bibliotekę przy pomocy yarna należy skorzystać z tego polecenia:

<pre class="theme:cisco-router lang:default decode:true ">yarn add react-router</pre>

Doda ono nowy wpis do pliku package.json oraz pobierze react-router do naszego projektu.

## Konfiguracja react-router

Jednak, żeby z niego skorzystać trzeba skonfigurować aplikację w odpowiedni sposób. Zacząłem od stworzenia pliku app.routes.js w którym będą skonfigurowane ścieżki po jakich może się poruszać użytkownik. Korzystałem z poradnika, który znajduje się na repozytorium githuba pod [tym][1] adresem.  W mojej aplikacji skorzystałem z Plain Routes które wydaje mi się rozwiązaniem czystym i najmniej skomplikowanym. Dlaczego? Po samej budowie widać jakie mamy dostępne ścieżki i jak one zależą od siebie. U mnie ten plik wygląda następująco:

<pre class="lang:default decode:true ">const routes = {

    path: '/',

    component: App,

    indexRoute: { component: Calendar },

    childRoutes:[

        {path:'/settings', component: Settings}

    ]

}

export default () =&gt; (

    &lt;Router history={browserHistory} routes={routes}&gt;&lt;/Router&gt;

);

</pre>

Łatwo zauważyć, że występuje jedna główna ścieżka pod którą będę podpinał ścieżki potomne. Na razie jest tylko jedna ze stroną ustawień ale w przyszłości może to się zmienić. Warto też wspomnieć ze możemy definiować ścieżki potomne w ścieżkach potomnych co daje nam dość sporą swobodę w działaniu i pozwala w łatwy sposób rozbudowywać aplikację

Oprócz tego aby wszystko działało musiałem troszkę zmodyfikować zawartość pliku src/app.js . Nie było to trudne bo wystarczyło, że zamieniłem ten fragment kodu

<pre class="lang:default decode:true ">ReactDOM.render(
 	&lt;App /&gt;,
 	document.getElementById('root')
 );</pre>

na następujący

<pre class="lang:default decode:true">ReactDOM.render(
  appRoutes(),
  document.getElementById('root')
);</pre>

gdzie appRoutes jest zaimportowanym plikiem app.routes.js

<pre class="lang:default decode:true">import appRoutes from './app/app.routes'</pre>

Ostatnią rzeczą jaka została mi do wyedytowania była zawartość komponentu App która wygląda teraz tak:

<pre class="lang:default decode:true ">class App extends Component {
  render() {
    return (
      &lt;div&gt; Menu & Layout
        Menu
        &lt;div&gt;
          &lt;Link to="/"&gt;Kalendarz&lt;/Link&gt;
          &lt;Link to="/settings"&gt;Ustawienia&lt;/Link&gt;
        &lt;/div&gt;
        {this.props.children}
      &lt;/div&gt;
    );
  }
}</pre>

Najważniejsze w tym pliku jest linijka 10. Definiuje ona w którym miejscu naszego głównego komponentu chcemy tworzyć widoki z komponentów pochodnych. Bez tego nasz widok nie będzie się zmieniał pomimo dobrze skonfigurowanego routingu.

## Github Pages

Żeby ułatwić sobie sprawę z github pages dodałem do devDependencies [gh-pages][2]. Korzystanie z tego sprowadza się do dodania dwóch wpisów do package.json

<pre class="lang:default decode:true ">"predeploy": "npm run build",
 "deploy": "gh-pages -d build"</pre>

i wywołaniu następującego polecenia w konsoli gdy chcemy zaktualizować kod na github pages

<pre class="theme:cisco-router lang:default decode:true ">yarn run deploy</pre>

Komenda ta wysyła zbudowane pliki na branch gh-pages.
  
Jednak nie było tak fajnie jak myślałem bo początkowo projekt nie chciał działać. Po trwającym chwilę przeszukiwaniu Google&#8217;a okazało się że używane przez mnie browserHistory nie jest obsługiwane przez Github Pages więc na potrzeby dema zmieniłem to na hashHistory. I teraz na szczęście działa więc możecie [tutaj][3] sprawdzić jak działa react-router.
  
Na razie to tyle. Moim następnym krokiem będzie poprawienie wyglądu komponentów tak by jakoś to wyglądało. Niedługo też pojawi się post dotyczący SCSS i BEM&#8217;a. Zapraszam do śledzenia bloga i do usłyszenia.

&nbsp;

<img class="wp-image-198 aligncenter" src="/assets/wp-content/uploads/2017/03/dsp2017-1@2x-1.png" alt="" width="825" height="193" srcset="/assets/wp-content/uploads/2017/03/dsp2017-1@2x-1.png 1167w, /assets/wp-content/uploads/2017/03/dsp2017-1@2x-1-300x70.png 300w, /assets/wp-content/uploads/2017/03/dsp2017-1@2x-1-768x180.png 768w, /assets/wp-content/uploads/2017/03/dsp2017-1@2x-1-1024x240.png 1024w" sizes="(max-width: 825px) 100vw, 825px" />

 [1]: https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md
 [2]: https://github.com/tschaub/gh-pages
 [3]: https://feridum.github.io/WorkTimetable-UI/#/