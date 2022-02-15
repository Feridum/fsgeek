---
title: "Jak tworzyć mikrofrontendy z Module Federation"
slug: "microfronends-with-module-federation"
author: "Feridum"
image: "./logo.png"
tags: ["microfrontend", "Module Federation"]
date: "2022-02-02T16:19:47.884Z"
---

Znasz termin mikrofrontendy? Jest to zyskujący popularność koncept w architekturze aplikacji. Jednym ze sposobów tworzenia takiej architektury jest Module Federation. W poście pokazuję jak zacząć pracę z tym.

<!--more-->


## Co to są mikrofrontendy?

Mikrofrontendy są odpowiednikiem mikroserwisów w świecie frontendu. Czyli zamiast pisać jedną dużą aplikację, jesteśmy w stanie napisac wiele mniejszych i połączyć w całość. I każda z części może być niezależna od reszty - inna technologia, biblioteki itd. To jest ostatni kawałek, by móc budować aplikacje jako osobne serwisy czyli jeden zespół pisze mikroserwis + mikrofrontend, który komunikuje się z nim. I potem wszystko łączymy w jedną aplikację. Brzmi pięknie i może kiedyś się uda. 

## Co to jest ModuleFederation?

Module Federation nie jest 1:1 równe mikrofrontendom. Module Federation jest pluginem do webpacka, który umożliwia współdzielenie kodu między aplikacjami. Dzięki temu da się zbudować mikrofrontendy ale nie trzeba się ograniczać tylko do tego.

## Konfiguracja webpack’a

```jsx
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.jsx',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public/index.html'),
      exclude: ['map']
    })
  ],
};
```

Dlaczego tworzę własną konfigurację Webpacka, zamiast wykorzystać CRA? Powód jest prosty. Muszę mieć dostęp do konfiguracji Webpacka, by zmodyfikować konfigurację i dodać plugin do ModuleFederation. To co widzisz powyżej to podstawowa konfiguracja na potrzeby postu - uważaj jeśli chcesz ją wykorzystać produkcyjnie.

To na co warto zwrócić uwagę to skorzystanie z `swc` zamiast babela to transpilacji kodu. Działa to lepiej niż się spodziewałem - polecam spróbować.

Na ten moment jest to wspólna konfiguracja zarówno dla remote’a i hosta. Zmiany będą poniżej.

## Konfiguracja dla remote’a

```jsx
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
	// rest of config
	plugins: [
		new ModuleFederationPlugin({
		      name: 'map',
		      filename: 'remoteEntry.js',
		      exposes: {
		        './Map': './src/components/Map'
		      },
		      shared: {
		        ...deps,
		        react: { singleton: true, requiredVersion: deps.react },
		        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
		        'object-assign': {singleton: true},
		    },
		}),
		// rest of plugins
	]
}
```

Zacznijmy od aplikacji, która będzie wystawiała komponent. Pierwsza rzecz to zaimportowanie pluginu do ModuleFederation. Dalej mamy poszczególne opcje:

- name - nazwa aplikacji - pilnuj, by każda aplikacja miała inną nazwę
- filename - nazwa pliku skąd będzie pobierany kod przez inne aplikacje
- exposes - obiekt z konfiguracją udostępnianych komponentów (Uwaga! komponent, który chcesz wystawić musi mieć export domyślny np.: export default Map)
- shared - lista zależności, które będą współdzielone z innymi aplikacjami. Często będą to wszystkie biblioteki ale nie zawsze. W przypadku React dodajemy opcję singleton ponieważ chcemy by w aplikacji była obecna tylko jedna biblioteka React.

## Konfiguracja dla hosta

```jsx

const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
	// rest of config
	plugins: [
		new ModuleFederationPlugin({
        name: 'main',
        remotes: {
            map: 'map@http://localhost:3002/remoteEntry.js',
        },
        shared: {
          ...deps,
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
          'object-assign': {singleton: true},
        },
    }),
		// rest of plugins
	]
}
```

Konfiguracja dla hosta jest podobna. To co się nie zmienia to opcje name i shared. Nie ma opcji filename ponieważ host nic nie wystawia. Zamiast exposes mamy remotes, gdzie określamy skąd bierzemy komponenty. Musimy podać adres utl i nazwę pliku (z filename). Zauważ również, że przed utl jest nazwa aplikacji remote.

## Konfiguracja dla hosta w kodzie

```jsx
//index.jsx
import('./bootstrap')

//bootstrap.jsx
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

//App.jsx
import React from 'react'

const Map = React.lazy(() => import('map/Map'));

export const App = () => {

    return (
        <>
            <React.Suspense fallback={"Loading ..."}>
                <Map/>
            </React.Suspense>
        </>
    )
}

export default App
```

Zostało to co najważniejsze, czyli konfiguracja w kodzie. Po pierwsze standardowy plik index.js musisz zmienić na bootstrap.jsx (ten plik gdzie jest funkcja render z Reacta). Po drugie musisz dodać plik index.js z importem bliku boostrap. Po co te zmiany?

Jest to związane z koniecznością pobrania komponentów z remote’a. Przy takim imporcie Webpack jest w stanie wstrzymać ładowanie naszej aplikacji do momentu pobrania wszystkich komponentów.

Następnie możemy w naszym komponencie zaimportować komponent z remote’a. Korzystam do tego z React.lazy. Zwróć uwagę na nazwę - musi się zgadzać z kluczem w obiekcie remotes. No i wyświetlam komponent wewnątrz React.Suspense - uwaga, to nie jest jeszcze gotowe w wersji produkcyjnej więc należy uważać.
