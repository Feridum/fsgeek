---
title: 'WorkTimetable#5 Dodajmy trochę akcji'
author: feridum
type: post
date: 2017-03-28T06:15:38+00:00
url: /2017/03/28/dodajmy-troche-akcji/
slug: 2017-03-28-dodajmy-troche-akcji
image: "/assets/images/default.jpg"
categories:
  - Daj się poznać 2017
  - frontend
  - redux
tags:
  - daj sie poznac
  - react-big-calendar
  - redux
  - worktimetable

---
W ostatnim wpisie związanym z projektem dodałem do aplikacji Reduxa. Jednak samo dodanie go nie spowoduje, że w aplikacji zacznie się coś dziać. Czas na trochę akcji.

## Światła, kamera, akcja

Na początek krótkie przypomnienie z ostatniego wpisu. Akcja jest to jedyny sposób by zmienić stan naszej aplikacji. Są więc jej koniecznym elementem. Póki co zdefiniowałem jedną akcję, która będzie najczęściej wykonywana czyli zaznaczanie godzin pracy w kalendarzu. Zacząłem od stworzenia następującej funkcji:

<pre class="lang:default decode:true ">export const addEvent = (newEvent) =&gt; {

  return {

    type: 'ADD_EVENT',

    description: Math.abs(newEvent.end -newEvent.start) / 36e5,

    start_date: newEvent.start.toUTCString(),

    end_date: newEvent.end.toUTCString()

  }

}</pre>

Jej zadaniem jest przygotowanie odpowiednich danych dla reducera. Zwraca ona tylko to co jest potrzebne do obsłużenia wywołanej akcji. Obiekt przygotowany przez tę funkcje ląduje w reducerze gdzie jest obsługiwany. Plik reducera wygląda następująco:

<pre class="lang:default decode:true ">const calendar = (state =[], action) =&gt; {

    switch (action.type) {

        case 'ADD_EVENT': {

            return [

                ...state,

                {

                    'title': action.description,

                    'start': new Date(action.start_date),

                    'end':new Date(action.end_date)

                }

            ]

        }

        default:

            return state;

    }

}</pre>

Nasz obiekt jest dostępny pod zmienną action skąd mamy dostęp do wszystkich pól zdefiniowanych w akcji. Sama funkcja reducera jest bardzo prosta i jej głównym elementem jest switch, którym decydujemy co zrobić w zależności od typu akcji. Elementem, który zasługuje na chwilę uwagi jest sposób zwracania nowego stanu. Jako, że głównym założeniem reduxa jest brak mutowania jakichkolwiek elementów to nie możemy bezpośrednio zmienić naszego stanu tylko musimy zwrócić zupełnie nowy obiekt, który zawiera elementy poprzednie oraz ten nowo dodany.

## Akcja w widoku

Teraz wystarczy połączyć to wszystko z kalendarzem. Zacząłem od pliku calendar.container. Musiałem w nim zdefiniować funkcję za pomocą której będę wywoływał moją akcje:

<pre class="lang:default decode:true ">const mapDispatchToProps = (dispatch) =&gt; {

  return {

    onAddEvent: (newEvent) =&gt; { dispatch(addEvent(newEvent)) },

  }

}</pre>

Zapis, którego użyłem znaczy, że w momencie wywołania funkcji **_onAddEvent_** zostanie wywołana akcja addEvent z parametrem, który przekazaliśmy. Pierwsze co musiałem zrobić w pliku calendar.component to dodać następującą linijkę:

<pre class="lang:default decode:true ">const { calendar, onAddEvent } = this.props;</pre>

Dzięki temu mogę korzystać ze zmiennej calendar, która jest obiektem stanu dla mojego komponentu oraz onAddEvent, która jest wyżej zdefiniowaną funkcją.Teraz wystarczy wykorzystać to co daje nam react-big-calendar. Aktualnie wygląda on tak:

<pre class="lang:default decode:true ">return (

            &lt;div className="calendar"&gt;

                &lt;BigCalendar

                    ref='calendar'

                    selectable={this.state.selectable}

                    defaultView='week'

                    onView={this.onViewChange}

                    events={calendar}

                    onSelectSlot={(event) =&gt; onAddEvent(event)}

                /&gt;

            &lt;/div&gt;

        )</pre>

Pierwszym krokiem było dodanie opcji selectable do komponentu. Pozwala to na zaznaczanie pól na kalendarzu. Jako, że chciałem zaznaczać pola tylko w widoku tygodniowym to wykorzystałem opcję onView która wywołuje przekazaną funkcję za każdym razem gdy zmieni się typ widoku.

<pre class="lang:default decode:true ">onViewChange = (event) =&gt; {

        if (event === 'week') {

           this.setState({selectable:true})

        } else {

            this.setState({selectable:false})

        }

    

    };

</pre>

No i najważniejsza opcja onSelectSlot, która powoduje wywołanie przekazanej funkcji za każdym razem gdy coś się zaznaczy na kalendarzu.

Jak widać tworzenie akcji nie jest takie ciężkie. Teraz za każdym razem gdy będę chciał dodać nową akcję to będę postępował w identyczny sposób. Najwięcej problemów tutaj sprawiło mi nie tworzenie akcji a połączenie tego z kalendarzem i dostosowanie widoku do swoich wyobrażeń. Efekt moich prac jest dostępny [tutaj][1]. Teraz  chciałbym się trochę pobawić pythonem i stworzyć na jego podstawie serwer api. Tak więc do zobaczenia wkrótce we wpisie dotyczącym podstaw pythona.

 [1]: https://feridum.github.io/WorkTimetable-UI/#/