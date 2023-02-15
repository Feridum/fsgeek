---
title: Czym jest? – Markdown, czyli jak ulepszyć Readme
author: feridum
type: post
date: 2017-03-17T06:54:42+00:00
url: /2017/03/17/czym-jest-markdown-czyli-ulepszmy-readme/
slug: 2017-03-17-czym-jest-markdown-czyli-ulepszmy-readme
image: "/assets/images/default.jpg"
categories:
  - czym jest
  - Daj się poznać 2017
tags:
  - czym
  - daj sie poznac
  - jest
  - markdown

---
Podejrzewam, ze większość z was jak nie wszyscy spotkali się z Markdownem. Jeśli nawet osobiście nic w nim nie pisaliście to widzicie jego efekty w 90% repozytoriów na githubie w postaci plików Readme. Warto co nieco o nim wiedzieć, ponieważ w łatwy sposób można z jego pomocą upiększyć swoje repozytorium.



## Jak powstał Markdown?

Jest to stosunkowo młody język, który powstał w 2004 przy współpracy Johna Grubera i Aarona Swartza. Został stworzony aby umożliwić ludziom pisanie łatwego do czytania formatu tekstu, który będzie można w prosty sposób skonwertować do XHTML lub HTML. Oryginalnie narzędzie, które parsowało plik w formacie *.md do  HTML zostało napisane w Perlu a następnie było przepisywane również w innych językach. Markdown jest wykorzystywany na wielu stronach między innymi na Githubie, Bitbucket, reddit itd. Github jednak nie poprzestał na podstawowej składni Markdown&#8217;a tylko dodał do niej swoje własne rozwiązania(między innymi tabele oraz kolorowanie składni) tworząc Github Flavored Markdown. To co oryginalnie posiadał Markdown możecie zobaczyć [tutaj][1]

## Co potrafi  Github Flavored Markdown (GFM)?

Jako, że przy pomocy Markdown&#8217;a można zrobić naprawdę dużo to postaram się opisać te składnie, które będą najczęściej używane przy tworzeniu plików Readme. Zacznę od najbardziej podstawowego elementu czyli nagłówka. Mamy jego 6 poziomów, podobnie jak w HTML i definiujemy je następująco

<pre class="lang:default decode:true"># Odpowiednik h1
## Odpowiednik h2
### Odpowiednik h3
#### Odpowiednik h4
##### Odpowiednik h5
###### Odpowiednik h6</pre>

Kolejną przydatną rzeczą jest możliwość tworzenia linków które definiujemy następująco:

<pre class="lang:default decode:true">[Treść linka](https://adres_linku)</pre>

Podobne do wstawiania linków jest umieszczanie obrazków:

<pre class="lang:default decode:true ">![Tekst Alternatywny](/sciezka/do/zdjecie.jpg "Opcjonalny tytul")</pre>

Powyższe rzeczy występują w oryginalnym Markdownie. Oprócz nich na githubie możemy korzystać z GFM, który daje nam dodatkowe możliwości.  Zacznę od prostej rzeczy jaką jest tworzenie tabel. Nie jest to co prawda bardzo wygodne przy pisaniu większych struktur ale w prosty sposób pomaga nam porządkować nasze dane

<pre class="lang:default decode:true">Naglowek|
--------|
wiersz1|
wiersz2|</pre>

Ciekawą rzeczą jest także możliwość kolorowania składni fragmentów kodu, które możemy umieścić w pliku

<pre class="lang:default decode:true ">```javascript
console.log('Hello World')
```

```php
echo 'Hello World';
```</pre>

Jednak podczas tworzenia tego artykuły najciekawszym rozwiązaniem jakie znalazłem była możliwość tworzenia listy zadań. Jak dla mnie jest to idealny sposób by przedstawić postęp prac i przyszłe plany względem naszego kodu dla osoby odwiedzającej nasze repozytorium. A do tego definiuje się je bardzo prosto.

<pre class="lang:default decode:true">- [x] zadanie zrealizowane
- [ ] zadanie przeznaczone do realizacji</pre>

## Podsumowanie

Jak widzicie Markdown potrafi naprawdę wiele przy małym nakładzie nauki i pracy. Warto go stosować ponieważ sprawia, że nasze repozytoria stają się przyjemniejsze dla oka. Dobrze zrobiony plik Readme jest idealną dokumentacją, która może zachęcić osobę odwiedzającą nasze repozytorium do skorzystania z naszego rozwiązania. Dodatkowo powstało wiele narzędzi, które pomagają przy pisaniu tych plików. Ja podczas tworzenia tego artykułu korzystałem z wtyczki do Visual Studio Code o nazwie [Instatnt Markdown][2] oraz ze strony [dilinger.io][3]. Oprócz nich istnieje wiele innych rozwiązań i wtyczek więc każdy znajdzie coś dla siebie.

Przy okazji pisania artykułu udało mi się poprawić swój plik Readme z repozytorium konkursowego i teraz wygląda o niebo lepiej co możecie sprawdzić [tutaj][4]. Tak więc ulepszajmy nasze pliki Readme i do usłyszenia wkrótce.

 [1]: http://daringfireball.net/projects/markdown/syntax
 [2]: https://marketplace.visualstudio.com/items?itemName=dbankier.vscode-instant-markdown
 [3]: http://dillinger.io/
 [4]: https://github.com/Feridum/WorkTimetable-UI