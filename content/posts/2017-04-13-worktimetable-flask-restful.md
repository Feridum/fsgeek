---
title: 'WorkTimetable#8 – Flask-RESTful'
author: feridum
type: post
date: 2017-04-13T07:20:02+00:00
image: ../wp-content/uploads/2017/04/restful.jpg
url: /2017/04/13/worktimetable-flask-restful/
categories:
  - Backend
  - Daj się poznać 2017
  - Python
tags:
  - api
  - backend
  - daj sie poznac
  - flask
  - flask-restfull
  - python
  - worktimetable

---
W ostatnim wpisie pokazałem(znajdziecie go [tutaj][1]), że stworzenie prostego serwera Api nie jest ciężkie. Jednak w większości projektów takie coś może być uciążliwe i dlatego postanowiłem przepisać swoją aplikację z wykorzystaniem biblioteki, która pomaga w tworzeniu serwerów API w architekturze REST.

## Flask-RESTful &#8211; refactor istniejącego kodu

Korzystanie z Flask-RESTful zacząłem od zainstalowania odpowiedniej biblioteki przy pomocy menadżera pip

<pre class="theme:cisco-router lang:default decode:true ">pip install flask-restful</pre>

Teraz można przekształcać istniejący kod by korzystał z zalet Flask-RESTful. Zacznę od głównego pliku api.py. Pierwsza rzecz to zaimportowanie odpowiednich bibliotek

<pre class="lang:default decode:true ">from flask_restful import Resource,Api</pre>

Teraz tak naprawdę czeka mnie w większości usuwanie kodu ponieważ wykorzystanie biblioteki bardzo upraszcza nasz kod. Oprócz tego muszę trochę przerobić istniejące ścieżki. Jako, że Flask-RESTful operuje na klasach to muszę ich użyć zamiast istniejących funkcji. W ten sposób to:

<pre class="lang:default decode:true ">@api.route('/')

    def hello_world():

        return 'Hello world!'

</pre>

Zamieni się w to:

<pre class="lang:default decode:true">class Index(Resource):
    def get(self):
        return {self.representations}
</pre>

Od teraz klasa Index może być używana jako źródło ścieżek w naszym systemie. Konkretne ścieżki definiujemy w klasie jako funkcje, które będą obsługiwane nasze zapytania. Nazwa funkcji to będzie metoda REST której chcemy użyć, natomiast parametrami będzie słówko kluczowe self i parametry, które będziemy chcieli przekazywać. To teraz wystarczy zarejestrować nasze źródło żebyśmy mogli korzystać z nowych ścieżek a zrobimy to następująco:

<pre class="lang:default decode:true ">api=Api(app)

api.add_resource(Index,'/api')</pre>

Od tego momentu możemy już używać i testować nasz nowy endpoint

## Refactor reszty ścieżek

Skoro znamy zasadę działania Flask-RESTful to możemy przerobić resztę utworzonych ścieżek. Nasz plik events.py będzie teraz wyglądał następująco:

<pre class="lang:default decode:true ">class Events(Resource):
    def get(self):
        return 'get'

    def post(self, name):
        return name

    def put(self, id: int):
        return 'put %d ' % id

    def delete(self, id: int):
        return 'delete %d ' % id

    def patch(self, id: int, name):
        return 'put %d %s' % (id, name)</pre>

Nie wiem jak dla was ale dla mnie wygląda to dużo lepiej. Kod wygląda czyściej i jest bardziej uporządkowany. Dzięki temu nie ma tu wielu dodatkowych rzeczy do wyjaśnienia oprócz tego co już do tej pory powiedziałem.  Ostania rzecz jaka została do zrobienia to zarejestrowanie naszej klasy

<pre class="lang:default decode:true ">api.add_resource(Events,'/api/events', '/api/events/&lt;name&gt;', '/api/events/&lt;int:id&gt;', '/api/events/&lt;int:id&gt;/&lt;name&gt;')
</pre>

W porównaniu z poprzednią wersją kodu jest tu trochę więcej rzeczy ale zaraz wyjaśnię dlaczego. Wcześniej definiowaliśmy nasze dostępne ścieżki w pliku events.py. Jednak teraz nie ma tam takich informacji. Tak naprawdę mamy tam tylko informację o tym jak chcemy zareagować na daną metodę w której przekazujemy konkretne dane. Tak więc jedynym miejscem gdzie możemy zdefniować wygląd naszych ścieżek to moment rejestracji klasy. Jak widać kolejne unikalne ścieżki podajemy po przecinku. Mówię unikalne ponieważ ścieżka dla metody put i delete wygląda identycznie więc nie definiujemy jej dwa razy a Flask-RESTful rozróżni po typie zapytania do której się odnosimy.

Teraz już zostało przetestować czy wszystko działa i można pisać dalej kod. Następnym krokiem który zrobię to połączę się z bazą danych na Azure tak aby można było pobierać i zapisywać dane. Całość kodu możecie zobaczyć [tutaj][2]. Tak więc do usłyszenia po świętach. No i Wesołych Świąt 😉

 [1]: https://fsgeek.pl/2017/04/11/worktimetable7-stworzmy-sciezki/
 [2]: https://github.com/Feridum/WorkTimetable-Backend