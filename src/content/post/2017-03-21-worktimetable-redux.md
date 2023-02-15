---
title: 'WorkTimetable#4 Redux, czyli stwórzmy aplikacje'
author: feridum
type: post
date: 2017-03-21T07:36:41+00:00
url: /2017/03/21/worktimetable-redux/
slug: 2017-03-21-worktimetable-redux
image: "/assets/images/default.jpg"
categories:
  - Daj się poznać 2017
  - frontend
  - react
  - redux
tags:
  - daj sie poznac
  - frontend
  - react
  - redux
  - worktimetable

---
<span lang="pl">Do tej pory </span><span lang="en-US">WorkTimetable</span> <span lang="pl">był tylko mniej lub bardziej ładnym widokiem. Jednak samym widokiem wiele nie zrobię nie ważne jak dopracowany byłby. Więc żeby mój projekt stał się prawdziwą aplikacją dodałem do nie</span><span lang="en-US">go</span> <span lang="pl">Redux&#8217;a.</span>

## Czym jest Redux?

Redux jest małą biblioteką służącą do zarządzania stanem aplikacji. Wyewoluowała z idei Flux&#8217;a, której głównym założeniem jest jednokierunkowy przepływ danych. Polega to na tym, że wszystkie dane przechodzą przez identyczny cykl życia dzięki czemu logika aplikacji jest przewidywalna i łatwa do zrozumienia. Reduxa można w skrócie opisać przy pomocy 3 zasad:

<ul type="disc">
  <li>
    Pojedyncze źródło prawdy &#8211; stan aplikacji jest przechowywany w pojedynczym obiekcie
  </li>
  <li>
    Stan aplikacji można tylko odczytać -jego zmiana może wystąpić tylko w wyniku wywołania akcji, nie możemy bezpośrednio zmienić stanu
  </li>
  <li>
    Zmiany stanu odbywają się przy pomocy czystych funkcji
  </li>
</ul>

##  Główne elementy Redux&#8217;a

W Reduxie istnieją 3 główne elementy za pomocą których zarządzamy stanem aplikacji:

<ul type="disc">
  <li>
    Store &#8211; przechowuje stan naszej aplikacji. W całej aplikacji istnieje tylko jeden taki obiekt.
  </li>
  <li>
    Actions &#8211; są to akcje wywoływane w aplikacji np.: CREATE_EVENT. Tylko za ich pomocą możemy aktualizować nasz Store.
  </li>
  <li>
    Reducers &#8211; są to czyste funkcje, które obsługują akcje. Na podstawie poprzedniego stanu aplikacji oraz wywołanej akcji zwraca nowy stan aplikacji
  </li>
</ul>

##  Konfiguracja Reduxa w aplikacji

Tyle z teorii czas na praktykę. Konfigurację zacząłem od dodania odpowiednich zależności do projektu :

<pre class="lang:default decode:true "> yarn add redux, react-redux, react-router-redux</pre>

<span lang="pl">Jednak samo pobranie bibliotek nie sprawi że wszystko zacznie działać więc trzeba dodać trochę kodu. Zacząłem od pliku index.js w którym dodałem następujący kod:</span>

<pre class="lang:default decode:true ">let store = createStore(

  reducers,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  );

 

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(

  &lt;Provider store={store}&gt;

   &lt;Router history={history} routes={routes}&gt;&lt;/Router&gt;

  &lt;/Provider&gt;,

  document.getElementById('root')

);</pre>

W funkcji createStore warta zauważenia jest linijka która jest odpowiedzialna za poprawne działanie Redux DevTool w przeglądarce. Jest to potężne narzędzie, które bardzo pomaga podczas tworzenia aplikacji i poświęcę niemu osobny wpis żeby go dogłębnie poznać i wyczerpująco opisać.

Oprócz dodania Redux DevTool w tym pliku  ustawiam synchronizację store&#8217;a aplikacji z historią przeglądania i przekazuję store do aplikacji przy pomocy Provider&#8217;a. W funkcji createStore zmienna **_reducers_** jest stałą, która przechowuje wszystkie dostępne w aplikacji Reducery i jest zdefiniowana w osobnym pliku w następujący sposób:

<pre class="lang:default decode:true">const reducers = combineReducers({

    calendar,

    routing: routerReducer

});</pre>

Dzięki combineReducers możemy w aplikacji tworzyć wiele różnych reducerów i wewnątrz tej funkcji połączyć w jedną zmienną. Pomaga to w lepszym rozłożeniu struktury plików.  Ostatnią rzeczą jaka została do zdefiniowania jest użyty przez nas calendar reducer, który wygląda następująco:

<pre class="lang:default decode:true">const calendar = (state=[], action)=&gt;{

    switch(action){

        default:

        return state;

    }

}

</pre>

Jest to prosta funkcja, która przyjmuje aktualny stan oraz wywołaną akcję i zwraca nowy stan. Opcja default jest po to żeby w przypadku wystąpienia nieznanej akcji zwrócić aktualny stan aplikacji.

## Jak połączyć Reduxa i komponenty z React&#8217;a?

Można powiedzieć, że tyle wystarczy żeby poprawnie skonfigurować Redux&#8217;a w aplikacji ale to nie znaczy, że moje komponenty będą mogły korzystać z jego możliwości.

Połączenie wszystkiego w całość jest proste co zaraz pokażę. Pierwsze co zrobiłem to stworzyłem nowy plik o nazwie calendar.container. Jego zadaniem jest połączenie reactowego komponentu z reduxem. Plik aktualnie wygląda następująco:

<pre class="lang:default decode:true ">const mapStateToProps = (state) =&gt; {

  return {

    calendar: state.calendar

  }

}

const mapDispatchToProps = (dispatch) =&gt; {

  return {}

}

const CalendarContainer = connect(

  mapStateToProps,

  mapDispatchToProps

)(Calendar)

</pre>

mapStateToProps &#8211; tutaj definiujemy jakie obiekty ze stora chcemy by były dostępne w komponencie

mapDispatchToProps &#8211; tutaj łączymy funkcje jakie będą wywoływane w naszym komponencie z akcjami reduxa np.: kliknięcie na przycisk save powinno wywołać akcję ADD_ELEMENT

Na samym końcu łączymy obie powyższe rzeczy z naszym kontenerem. Ostatnią rzeczą, jaką musimy zrobić, to na nowo zdefiniować w pliku app.routes.js co będzie naszym komponentem. Teraz nie będzie to nasz zwykły komponent tylko kontener

<pre class="lang:default decode:true ">indexRoute: { component: CalendarContainer }</pre>

Dość sporo roboty że złożyć wszystko w jedną całość. Jednak dzięki chwili wysiłku mamy teraz łatwo rozszerzalną strukturę, którą dzięki jednokierunkowemu przepływowi danych możemy w prostu sposób debbugować. Zalety takiej struktury widać dopiero przy dużych projektach, gdzie mamy dużą ilość plików i zależności.

Uff, znowu mi wyszedł dłuższy wpis niż chciałem ale nie miałem serca przerywać go w połowie. Następnym krokiem będzie stworzenie odpowiednich akcji dla kalendarza tak by wszystko zaczęło już powoli działać. Tak więc do usłyszenia wkrótce.