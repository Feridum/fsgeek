---
title: 'WorkTimetable#10 – Połączmy ścieżki z bazą danych'
author: feridum
type: post
date: 2017-04-29T14:30:50+00:00
image: ../wp-content/uploads/2017/04/azure.jpg
url: /2017/04/29/worktimetable10-sciezki-z-baza-danych/
ampforwp-amp-on-off:
  - default
categories:
  - Backend
  - Daj się poznać 2017
  - Python
tags:
  - api
  - backend
  - daj sie poznac
  - python
  - worktimetable

---
W ostatnim wpisie udało mi się skutecznie połączyć z bazą danych. Jeszcze wcześniej stworzyłem działające ścieżki. Teraz przyszła pora by to wszystko połączyć w jedną całość.

## Zmiany w klasie Events

Tak naprawdę najwięcej się zmieniło w pliku routes\events.py. Pierwsze co zrobiłem to rozdzieliłem dotychczasową klasę Events na dwie: Event i Events. Na pierwszy rzut oka może się to wydawać dziwne i niepotrzebne ale ma to swoje uzasadnienie. W klasie Events mamy do czynienia z więcej niż jednym obiektem wydarzenia, tutaj umieściłem endpointy dotyczące pobrania wszystkich rekordów oraz dodania nowego do istniejących. Natomiast w klasie Event będziemy operować na pojedynczym obiekcie tak więc w każdym przypadku będziemy potrzebowali jego numer id. Oprócz tego postanowiłem wykorzystać reqparse wbudowany w flask_restul aby pobierać dane przekazane w zapytaniu. Korzystanie z niego jest proste i sprowadza się do paru kroków:

<ol type="1">
  <li value="1">
    Zainicjowanie zmiennych oraz określenie co będzie nas interesowało w zapytaniu
  </li>
</ol>

<pre class="lang:default decode:true ">parser=reqparse.RequestParser()

parser.add_argument('start')

parser.add_argument('end')

parser.add_argument('title')</pre>

<ol type="1">
  <li value="2">
    W konkretnej metodzie pobranie zmiennych
  </li>
</ol>

<pre class="lang:default decode:true ">args=parser.parse_args()</pre>

W ten sposób w zmiennej args mamy zdefiniowane przez nas pola.

## Pobieranie danych

Operacje na danych wykonuje się przy pomocy metod udostępnianych przez SQLAlchemy. Aby pobrać dane z bazy danych korzystam z następujących konstrukcji:

<pre class="lang:default decode:true ">nazwa_klasy.query.all() #pobranie wszytskich rekordów

nazwa_klasy.query.get(id) #pobranie rekordu o danym id</pre>

Należy pamiętać że klasa, której tutaj używamy to jest nasza klasa reprezentująca wiersz w bazie danych(u mnie nazywana encją) a nie te których używamy w ścieżkach. Jednak samo pobranie danych się na tym nie kończy. Musimy jakoś je zwrócić i ja wykorzystam do tego JSONa który jest najpopularniejszy w ostatnich latach. Aby sparsować wyniki do pożądanego formatu napisałem w klasie encji prostą metodą do serializacji

<p lang="pl">
  <pre class="lang:default decode:true "> def serialize(self):
        return{
            'id': self.id,
            'start':self.start,
            'end': self.end,
            'title':self.title
        }</pre>
  
  <p>
    którą potem wykorzystałem przy zwracaniu danych
  </p>
  
  <pre class="lang:default decode:true"> return jsonify([i.serialize()for i in events]) #podczas pobrania wszystkich rekordów

 return jsonify([event.serialize()]) #podczas pobrania jednego rekordu</pre>
  
  <h2 lang="pl">
     Komunikacja z bazą danych
  </h2>
  
  <p>
    Na sam koniec zostawiłem jeszcze sam proces komunikacji z bazą danych. Ponieważ samo pobieranie danych nie jest wystarczające musimy mieć możliwość dodawania nowych oraz edycji i usuwania istniejących danych. Dokonujemy tego przy pomocy instancji SQLAlchemy(u mnie db) oraz kilku metod, które w paru słowach opiszę.
  </p>
  
  <pre class="lang:default decode:true">db.session.add(row) #dodanie nowego wiersza

db.session.delete(row) #usunięcie wiersza

db.session.query(EventsEntity).filter_by(id=id).update(value) #aktualizacja wiersza nową wartością

db.session.commit() #zapisanie zmian w bazie danych</pre>
  
  <p>
    Bardzo ważna jest ta ostatnia linia ponieważ dopiero ona zapisuje nasze zmiany w bazie danych.
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    Teraz to się nie wydaje trudne ale w trakcie pisania miałem parę problemów. Najwięcej kłopotów sprawiło mi odpowiednia serializacja danych w obie strony tak aby poprawnie odczytać przekazane dane oraz odpowiednio zwrócić te dane do użytkownika. Teraz wrócę do reduxa aby połączyć działąjący serwrs REST z częścią frontową przy pomocy redux-saga.
  </p>