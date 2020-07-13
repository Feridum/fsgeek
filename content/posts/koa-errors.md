---
title: "Koa.js - obsługa błędów"
slug: "koa-obsluga-bledow"
author: "Feridum"
image: "../images/koa-errors/logo.jpg"
tags: ["koa.js", "error" ,"node.js", "javascript"]
date: 2019-09-17T17:20:00+02:00
draft: false
---

Jednym z etapów pisania aplikacji powinno być poprawne obsługiwanie błędów - nie możemy zakładać, że użytkownik nie będzie wysyłał dziwnych requestów i nie wywoła błędów. Pisząc aplikację w Koa.js mamy kilka możliwości wyłapywania błędów, zapobieganiu zawieszeniu się aplikacji oraz informowania użytkownika, że coś poszło nie tak jak powinno.

<!--more-->

## Inne wpisy o Koa.js

- [Koa.js - pierwsze kroki](/post/koa-pierwsze-kroki)
- [Koa.js - middlewares](/post/koa-middlewares)


## Domyślne obsługiwanie błędów

Domyślna obsługa jest najprostszym rozwiązaniem i tak naprawdę obowiązkowym - nie wyobrażam sobie by aplikacja tego nie miała. Aby ją zaimplementować wystarczy wykorzystać mechanizmy dostarczone razem z biblioteką Koa.js. Aby zwrócić błąd możemy skorzystać z następującej funkcji `ctx.throw`, która przyjmuje 3 opcjonalne parametry: 

- status - kod błędu jaki będziemy chcieli zwrócić - najczęściej będzie to 400, 401 oraz kolejne. Jeśli pominiemy ten parametr to zostanie zwrócony kod 500 - nie jest to coś co powinniśmy robić, ponieważ oznacza, że nie przewidzieliśmy czegoś i aplikacja się wywaliła.
- msg - wiadomość jaka będzie zwórcona z błędem np. `Validation Error`
- properties - dodatkowy obiekt, którym możemy sterować błędem np.: dodawać dodatkowe nagłówki do odpowiedzi
	
Jak to wygląda w praktyce?

```js
    ctx.throw(); // Status Code: 500 Internal Server Error
    ctx.throw(400); //Status Code: 400 Bad Request
    ctx.throw(400, 'Validation Error') // 400 z Response: Validation Error

    ctx.throw(400, JSON.stringify({
        message: 'name required',
        errors: {
            firstName: 'Required'
        }
    }, {
        headers: {
            'custom-header': 'custom-header-value'
        }
    }));
```

To o czym warto jeszcze pamiętać to że treść w błędach musi być tekstem. Co zrobić w takim razie jak chcemy wysłać więcej informacji np.: opis błędów dla poszczególnych pól? Musimy skomponować to wszystko w pojedynczy obiekt i skorzystać z funkcji `JSON.stringify()` - zamieni nam to obiekt w tekst i wiadomość będzie poprawnie wysłana. 

Oprócz `ctx.throw` mamy też `ctx.assert`. Jest ona bardzo podobna do poprzednio opisanej ale posiada doadtkowy parametr na początku. Parametr ten steruje czy błąd zostanie rzucony - jeśli wartość parametru zrzutowana na wartość `boolean` daje `false` to zostanie rzucony błąd (czyli na przykład użytkownik nie podał jakiegoś parametru, nie ma uprawnień itd.).

```js
ctx.assert(true, 400, 'Validation Error') // błąd nie jest rzucony
ctx.assert(false, 400, 'Validation Error') // błąd jest rzucony
```

## Własna obsługa błędów

Jak już wspomniałem taka obsługa błędów jest podstawowym minimum, co nie znaczy że nie możemy tego rozbudować. Podczas przetwarzania danych dobrze jest rzucać wyjątki typowo domenowe - czyli związane z logiką biznesową ale niekoniecznie z aktualnie wykorzystywaną biblioteką. W przypadku Node'a najprościej jest to zrobić przy pomocy rozszerzenia klasy Error. 
 
```js
class ValidationError extends Error {}
```

Teraz możemy w dużo bardziej czytelny sposób rzucać błędy

```js
throw new ValidationError('foo');
```

Oczywiście to jest najprostszy przypadek ale budując w ten sposób wyjątki jesteśmy w stanie tworzyć bardziej skomplikowane błędy, które będą bardziej opisowe a więc i będzie prościej śledzić błędy. Teraz pozostało tylko obsłużyć te błędy z poziomu biblioteki Koa.js. Aby to zrobić należy jako pierwszy middleware dodać asynchroniczną funkcję, która będzie łapać błędy. Wystarczy że opakujemy funkcję next() w blok try-catch

```js
app.use(async (ctx, next)=>{
    try {
        await next();
    } catch (error) {
        if(error instanceof ValidationError){
            ctx.throw(400, 'error')
        }
    }
})
```

Teraz w bloku `catch` możemy zrobić wszystko co chcemy - mając konkretne błędy jesteśmy reagować unikalnie dla każdego.

## Error event

Na sam koniec coś co, może nie będzie wykorzystywane często ale warto wiedzieć o takiej funkcjonalności. Dzięki systemowi zdarzeń w Koa.js jest możliwość nasłuchiwania na każdy błąd w aplikacji. Dzięki takiemu mechanizmowi możemy na przykład wpiąć globalne logowanie błędów. Aby coś takiego uzyskać wystarczy, że wpiszemy taki kod

```js
app.on('error', (error)=>{

})
```

Teraz możemy robić co chcemy. 

To by było na wszystko jeśli o chodzi o obsługę błędów. Mechanizm jest prosty ale dzięki temu jesteśmy w stanie go szybko dostosować do naszych potrzeb. Najważniejsze by błędy w aplikacji były obsługiwane oraz zwracane w zrozumiały sposób tak aby dało się je obsłużyć na frontendzie lub naprawić te które się nie powinny pojawić.

