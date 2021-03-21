---
title: "3 sposoby na dodanie Firebase do Twojej aplikacji React"
slug: "jak-dodac-firebase-do-aplikacji-react"
author: "Feridum"
image: "./logo.png"
tags: ["firebase", "react", "javascript", "hooks"]
date: "2021-03-23T16:00:00.927Z"
---

Żeby móc w pełni korzystać z firebase'a w naszej aplikacji trzeba go poprawnie dodać i skonfigurować. Konfiguracja dla React nie jest trudna, ale można łatwo wpaść w pułapkę. 

<!--more-->


## Jaki jest problem?

Do tej pory pokazałem, jak można szybko dodać do aplikacji Firebase. Jednak pokazana dotychczas konfiguracja wymagała istnienia pliku konfiguracyjnego bezpośrednio w pliku, gdzie był wykorzystywany. Do testów było to idealne, ale na dłuższą metę to będzie kłopot. W normalnej aplikacji będziemy mieli wiele komponentów, które będą potrzebować dostępu do Firebase'a. Jak w takim razie mieć dostęp do Firebase'a w dowolnym komponencie naszej aplikacji?

## Podejście naiwne - słabo

```jsx
// index.tsx
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//App.tsx

const App = ()=> {
	const firebaseApp = firebase.apps[0];
  const db = firebaseApp.firestore();

	//rest of app
}
```

Przy pomocy `firebase.apps` możemy uzyskać dostęp do instancji aplikacji. Dzięki temu możemy uzyskać dostęp do Firebase'a w dowolnym komponencie. Problem pojawi się przy testowaniu kodu oraz jego przyszłych zmianach. Uzyskując dostęp w ten sposób, będziemy mieć problem podczas testowania, ponieważ musimy zamockować zewnętrzną bibliotekę. Również jakakolwiek zmiana (np.: struktura tabeli lub całkowite pozbycie się Firebase'a) będzie utrudniona, bo musimy zmienić każdy plik w projekcie. Kolejnym problemem może być podbicie wersji biblioteki - jeśli nastąpią większe zmiany, może to powodować dużo zmian w naszym kodzie.

## React Context - lepiej

Do rozwiązania powyższego problemu z bezpośrednim dostępem do biblioteki najlepiej skorzystać z React Context. Będziemy mieli jeden taki obiekt w drzewie komponentów, który będzie inicjowany na stracie aplikacji. Instancja aplikacji też nie będzie się zmieniać, więc jest bezpieczna do wykorzystania w React Context. Jak może wyglądać Context dla Firebase'a?

```jsx
export const FirebaseContext = createContext(undefined);

const firebaseConfig = {...};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const FirebaseContextController = ({ children })=>{
    return(
        <FirebaseContext.Provider value={{firebase: firebaseApp}}>
            {children}
        </FirebaseContext.Provider>
    )
}
```

I teraz możemy napisać hook, którym uzyskamy dostęp do instancji Firebase'a.

```jsx
export const useFirebase = () =>{
    const firebaseApp = useContext(FirebaseContext);

    if(firebaseApp === undefined){
        throw new Error('Missing firebase')
    }

    return {
        firebase: firebaseApp.firebase,
    }
}
```

Teraz, w każdym miejscu aplikacji mamy dostęp do tej instancji i możemy wykonywać operacje. Testowanie będzie ułatwione, bo musimy zmockować tylko naszą wewnętrzną bibliotekę. Ale ciągle nie rozwiązaliśmy problemu z aktualizacją biblioteki. Czy da się to zrobić lepiej?

## React Context + Repozytorium - najlepiej

Rozwinięciem poprzedniego sposobu jest pójście o krok dalej. Zamiast dawać w hook'u dostęp do całej instancji dajemy dostęp do konkretnych metod. Dzięki temu mamy odseparowaną logikę od komponentów, możemy to dużo łatwiej odseparować oraz mamy jeden punkt dostępu do backendu. Co więcej, jeśli korzystasz z Typescripta, to możesz to bardzo dokładnie otypować. Jak może wyglądać takie repozytorium?

```jsx
 export const useFirebase = () =>{
    const firebaseApp = useContext(FirebaseContext);

    if(firebaseApp === undefined){
        throw new Error('Missing firebase')
    }

    return {
        getUser: ()=>{...},
		updateUser: ()=>{...}
    }
}
```

Jeśli hook będzie rósł za bardzo to możemy rozbić na osobne hooki np.: useFirebaseAuth, useFirebaseStore itd. Jak dla mnie takie rozwiązanie powoduje, że kod staje się logiczniejszy i łatwiejszy w utrzymaniu. Przyszłe zmiany również będą łatwiejsze (o ile będziemy mieć napisane testy). 

A może macie jakiś lepszy pomysł jak dodać Firebase do projektu. Jestem ciekawy waszych opinii i innych pomysłów.