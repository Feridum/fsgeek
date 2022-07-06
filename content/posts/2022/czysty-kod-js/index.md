---
title: "Czysty Javascript w 5 krokach"
slug: "czysty-kod-javascript"
author: "Feridum"
image: "./logo.png"
tags: ["javascript"]
date: "2022-07-07T09:00:00.593Z"
---


Utrzymanie czystego kodu wydaje się zadaniem ciężkim - szczególnie gdy dopiero zaczynasz przygodę z programowaniem. Jednak w przypadku JS'a (a sporo tych rad da się wykorzystać w innych językach) można znacząco poprawić jakość kodu, stosując 5 prostych rad. Zobacz jakich.

<!--more-->


## Early return

<font size="18">❌</font>
```js
const someCalculations = () => {
	let result = null;

	if(someCondition){
		result = 1;
	}else if(someCondition2){
		result = 2;
	}else{
		result = 0;
	}
	
	return result;
}
```

Co jest nie tak w tym kodzie?  Teraz wydaje się to proste i nie widać żadnych problemów. Jednak gdyby warunki albo kod wewnątrz warunków były dużo bardziej skomplikowane, to cała funkcja byłaby trudna do utrzymywania.  Dużo lepszym pomysłem jest skorzystanie z mechanizmu `early return`.

<font size="18">✅</font>

```js
const someCalculations = () => {
	if(someCondition){
		return 1;
	}
	
	if(someCondition2){
		return 2;
	}
	
	return 0;
}

```

Jakie widać zalety w stosunku do pierwszej wersji:
- krótszy kod (mniej szans na popełnienie błędów)
- brak let (zmniejszamy szanse nadpisania danych lub zapisania złych rzeczy)
- zwiększa się czytelność (pomyśl, co by się działo, kiedy zamiast jednego let'a byłoby ich 5 i każdy modyfikowany inaczej - w każdym if'ie)
- przygotowujemy kod do refactoru (każdy taki if można wydzielić do zewnętrznej metody, bo nie ma punktów wspólnych z innymi if'ami)

## Ternary operator
<font size="18">❌</font>

```js
const result = someCondtion ? someCondition2 ? result1 : result2 : result3
```

Jedna z rzeczy, na którą reaguję alergicznie. Zagnieżdżanie operatorów trójargumentowych to zło. W połączeniu z odwrotnymi warunkami (znajdziesz je niżej) to najprostszy sposób na stworzenie nieczytelnego i podatnego na błędy kawałka kodu. Analiza takiego kodu wymaga dużo skupienia i pamiętania o kolejności zagnieżdżeń, co prowadzi do powstania błędów. Jak to zrobić lepiej?

<font size="18">✅</font>
```js
const subResult = someCondition2 ? result1 : result2;
const result = someCondtion ? subResult : result3

//Or 


const calculateResult = () => {

	if(someCondtion){
		//return someCondition ? result1 : result2;
		// or 
		
		if(someCondition2) {
			return result1
		}

		return result2
	}


	return result3

}


const result = calculateResult()
```

Najprostsze rozwiązanie to rozbicie tego na dwa osobne warunki. Zmiana niewielka, ale bardzo wzrasta czytelność takiego kodu i łatwość modyfikacji. W przypadku bardzo zaawansowanych warunków lubię wydzielić taką logikę do zewnętrznej metody, która wyliczy wszystko i zwróci pojedynczą wartość.


## Function arguments
<font size="18">❌</font>

```js
const someMethod = (arg1, arg2, arg3, arg4, arg5) => {
	//rest of method
}
```

Jeśli twoja funkcja przyjmuje więcej niż 2-3 argumenty to wiedz, że dzieje się coś niedobrego. Takie funkcje zaczynają być niewygodne w użyciu i trudne do modyfikacji. Po pierwsze, jeśli masz tyle argumentów w funkcji, to istnieje ryzyko, że funkcja robi za dużo. Po drugie przy korzystaniu musisz pamiętać o kolejności argumentów. Jak to poprawić?

<font size="18">✅</font>
```js
const someMethod = ({arg1, arg2, arg3, arg4, arg5}) => {
	//rest of method
}

// OR

const someMethod1 = ({arg1, arg2}) => {
	//rest of method
}


const someMethod2 = ({arg3, arg4, arg5}) => {
	//rest of method
}
```


Po pierwsze zastanów się, czy potrzebujesz wszystko pakować do jednej funkcji. Może da się rozbić jedną dużą funkcję na dwie mniejsze? Jeśli nie to wykorzystaj obiekt. Dzięki temu masz jeden argument. Możesz przesłać argumenty w losowej kolejności i przesyłanie pustych wartości jest prostsze np. `function1(1,null, null, null, 2)` vs `function1({value1: 1, value5: 2})`

## Negative Conditions
<font size="18">❌</font>

```js
if(!isEnabled || isEnabled2) {

} else {

}
```

Zanegowane warunki nie wyglądają na tragiczne, dopóki nie trzeba ich poprawiać albo naprawić błąd. Wtedy okazuje się, że wysiłek, jaki trzeba włożyć w zapamiętanie i rozwiązanie warunku, jest ogromny. Szczególnie że warunek może być dużo bardziej skomplikowany.

<font size="18">✅</font>
```js

if(isDisabled || isEnabled2) {

} else {

}
```

Jeśli korzystasz z warunków, to wykorzystuj odpowiednie nazwy, które pomogą ci łatwiej wyliczyć ten warunek w głowie. Już prosta zmiana z `!isEnabled`  na `isDisabled` pomaga w czytaniu i zmniejsza ryzyko popełnienia błędu podczas modyfikacji (kto by zwrócił uwagę na brakujący `!` przy tylu zmianach).

## Magic numbers
<font size="18">❌</font>

```js
if(user.age >= 18) {

}
```

Czy patrząc na ten kawałek kodu, jesteś w stanie powiedzieć, co oznacza ten warunek? Dlaczego akurat sprawdzamy 18, a nie 19? Co byś zrobiła/zrobił, jakbyś zobaczył taką linijkę kodu podczas Code Review? Jak to poprawić?

<font size="18">✅</font>
```js

const MINIMUM_AGE_TO_BUY_BEER = 18


if(user.age >= MINIMUM_AGE_TO_BUY_BEER) {

}
```

Zmiana jest dosłownie minimalna, ale znacząco podnosi jakość kodu. Po pierwsze 18 już nie jest jakąś tam cyfrą, tylko dostała konkretne znaczenie. Kiedy przeglądasz taki kod, to od razu wiesz, co powinno być wewnątrz if'a i możesz sprawdzić, czy logika się zgadza.  No i możesz wykryć luki w aplikacji na etapie Code Review np.: w USA musisz mieć 21 lat, by kupić alkohol.


## Podsumowanie

5 prostych rzeczy, które możesz zrobić, by poprawić jakość kodu:
- korzystaj z early return w funkcjach, 
- nie zagnieżdżaj operatorów trójargumentowych,
- ogranicz liczbę argumentów w funkcji do 2-3,
- dawaj dobre nazwy i wartości dla warunków logicznych,
- nie zostawiaj magic numbers w kodzie. 

To, co opisałem, zajmuje dosłownie minutę, by wprowadzić a skutkuje sporym skokiem w jakości kodu. Daj znać, co o tym sądzisz. A może sam masz swoje ulubione techniki na poprawę jakości kodu.