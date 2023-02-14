---
title: Docker – czy warto używać?
author: feridum
type: post
date: 2016-12-14T08:00:59+00:00
url: /2016/12/14/docker-cudowne-narzedzie/
slug: 2016-12-14-docker-cudowne-narzedzie
image: "/assets/images/default.jpg"
categories:
  - devops
tags:
  - docker
  - kontenery

---
## Docker &#8211; cudowne narzędzie?

<p dir="auto">
  Docker jest to platforma służąca do konteneryzacji naszych aplikacji. Z jego pomocą możemy w prosty sposób uruchamiać konkretne procesy w izolowanych jednostkach zwanych kontenerami. Dzięki temu możemy stwarzać kontenery które będą używane na kilku wirtualnych maszynach nie musząc za każdym razem osobno instalować zależności.
</p>

<p dir="auto">
  Jest to szczególnie widoczne podczas tworzenia środowisk programistycznych gdzie czasami z przechodzenia z projektu na projekt trzeba za każdym razem tworzyć nową wirtulaną maszynę gdzie właściwie cały czas się instaluje to samo. I takie coś zabiera czas no i zasoby dyskowe jeśli nie usunęliśmy starej maszyny z różnych powodów. W przypadku Dockera jeśli tylko korzystamy z takich samych konfiguracji to system będzie wykorzystywał już dostępne obrazy do budowania aplikacji.
</p>

### Czy warto używać?

<p dir="auto">
  Początki pracy z Dockerem nie da się ukryć, że są niewygodne. Zamiast jednego miejsca do którego się można zalogować nagle jest kilka kontenerów, który każdy robi coś innego. Chcesz zmienić konfigurację nginx to musisz się zalogować na jego kontener. Chesz odpalić komendy w Symofny to musisz zmienić kontener na php’owy. To samo z bazą danych, redis’em itd.<br /> Pamiętam, że strasznie wtedy przeklinałem Dockera bo byłem przyzwyczajony do Vagranta gdzie wszystko było dostępne w jednym miejscu i gdzie w jednej linii mogłem uruchomić polecenie Symofny a w następnej zalogować się do bazy danych.  Do stworzenia prostej aplikacji potrzebujemy nagle kilku kontenerów, żeby strona mogła działać. Chyba w każdej prostej aplikacji mamy na start 3 kontenery: php, nginx/apache i mysql. A potem ta liczba może już tylko rosnąć.
</p>

![Docker i jego kontenery](/assets/wp-content/uploads/2016/12/containers_everywhere.jpg)

<p dir="auto">
  Teraz jednak jak już miałem okazję parę miesięcy pracować z Dockerem to nie zamieniłbym tego na nic innego. Dlaczego? Bo jak się pozna już Dockera i zrozumie zasadę jego działania to potem już jest tylko lepiej. Co nam daje Docker:<br /> 1. elastyczność w zarządzaniu serwerem &#8211; możliwość szybkiej zmiany danego kontenera na inny<br /> 2. oszczędność czasu &#8211; dodanie nowego kontenera trwa chwilę<br /> 3. władzę nad tym co robimy- możesz sobie złożyć serwer sam z gotowych klocków lub napisać własne<br /> 4. poczucie bezpieczeństwa &#8211; jeśli posypie ci się jeden kontener to reszta jest nietknięta
</p>

<p dir="auto">
  A jak wygląda wasz stosunek do Dockera? Lubicie, nie znosicie, czy może jeszcze nie znacie? Tych ostatnich zapraszam do wpisu dotyczącego początków zabawy z dockerem -><a href="http://fsgeek.pl/2016/12/20/docker-machine/"> TUTAJ</a>
</p>