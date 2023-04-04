declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"post": {
"2016-12-14-docker-cudowne-narzedzie.md": {
  id: "2016-12-14-docker-cudowne-narzedzie.md",
  slug: "2016-12-14-docker-cudowne-narzedzie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2016-12-20-docker-machine.md": {
  id: "2016-12-20-docker-machine.md",
  slug: "2016-12-20-docker-machine",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-01-03-konfiguracja_symfony_na_dockerze.md": {
  id: "2017-01-03-konfiguracja_symfony_na_dockerze.md",
  slug: "2017-01-03-konfiguracja_symfony_na_dockerze",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-01-09-symfony_rest.md": {
  id: "2017-01-09-symfony_rest.md",
  slug: "2017-01-09-symfony_rest",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-01-17-symfony3-operacje-na-bazie-danych.md": {
  id: "2017-01-17-symfony3-operacje-na-bazie-danych.md",
  slug: "2017-01-17-symfony3-operacje-na-bazie-danych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-01-dam-sie-poznac-worktimetable.md": {
  id: "2017-03-01-dam-sie-poznac-worktimetable.md",
  slug: "2017-03-01-dam-sie-poznac-worktimetable",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-04-worktimetable-czas-zaczac-projekt.md": {
  id: "2017-03-04-worktimetable-czas-zaczac-projekt.md",
  slug: "2017-03-04-worktimetable-czas-zaczac-projekt",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-08-worktimetable-konfiguracja-react-router.md": {
  id: "2017-03-08-worktimetable-konfiguracja-react-router.md",
  slug: "2017-03-08-worktimetable-konfiguracja-react-router",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-10-czym-sa-scss-bem.md": {
  id: "2017-03-10-czym-sa-scss-bem.md",
  slug: "2017-03-10-czym-sa-scss-bem",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-14-worktimetable-popracujmy-nad-ui.md": {
  id: "2017-03-14-worktimetable-popracujmy-nad-ui.md",
  slug: "2017-03-14-worktimetable-popracujmy-nad-ui",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-17-czym-jest-markdown-czyli-ulepszmy-readme.md": {
  id: "2017-03-17-czym-jest-markdown-czyli-ulepszmy-readme.md",
  slug: "2017-03-17-czym-jest-markdown-czyli-ulepszmy-readme",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-21-worktimetable-redux.md": {
  id: "2017-03-21-worktimetable-redux.md",
  slug: "2017-03-21-worktimetable-redux",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-23-ciezkie-zycie-programisty.md": {
  id: "2017-03-23-ciezkie-zycie-programisty.md",
  slug: "2017-03-23-ciezkie-zycie-programisty",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-03-28-dodajmy-troche-akcji.md": {
  id: "2017-03-28-dodajmy-troche-akcji.md",
  slug: "2017-03-28-dodajmy-troche-akcji",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-01-worktimetable-podsumowanie-na-polmetku-konkursu.md": {
  id: "2017-04-01-worktimetable-podsumowanie-na-polmetku-konkursu.md",
  slug: "2017-04-01-worktimetable-podsumowanie-na-polmetku-konkursu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-04-worktimetable-pora-na-api-w-pythonie.md": {
  id: "2017-04-04-worktimetable-pora-na-api-w-pythonie.md",
  slug: "2017-04-04-worktimetable-pora-na-api-w-pythonie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-07-struktury-danych-pythonie-podstawy.md": {
  id: "2017-04-07-struktury-danych-pythonie-podstawy.md",
  slug: "2017-04-07-struktury-danych-pythonie-podstawy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-11-worktimetable7-stworzmy-sciezki.md": {
  id: "2017-04-11-worktimetable7-stworzmy-sciezki.md",
  slug: "2017-04-11-worktimetable7-stworzmy-sciezki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-13-worktimetable-flask-restful.md": {
  id: "2017-04-13-worktimetable-flask-restful.md",
  slug: "2017-04-13-worktimetable-flask-restful",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-18-moduly-klasy-funkcje-w-pythonie.md": {
  id: "2017-04-18-moduly-klasy-funkcje-w-pythonie.md",
  slug: "2017-04-18-moduly-klasy-funkcje-w-pythonie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-20-worktimetable-polaczenie-serwera-z-baza-danych-sql-na-azure.md": {
  id: "2017-04-20-worktimetable-polaczenie-serwera-z-baza-danych-sql-na-azure.md",
  slug: "2017-04-20-worktimetable-polaczenie-serwera-z-baza-danych-sql-na-azure",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-25-robert-c-martin-czysty-kod-recenzja.md": {
  id: "2017-04-25-robert-c-martin-czysty-kod-recenzja.md",
  slug: "2017-04-25-robert-c-martin-czysty-kod-recenzja",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-04-29-worktimetable10-sciezki-z-baza-danych.md": {
  id: "2017-04-29-worktimetable10-sciezki-z-baza-danych.md",
  slug: "2017-04-29-worktimetable10-sciezki-z-baza-danych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-05-07-worktimetable-podsumowanie-konkursu.md": {
  id: "2017-05-07-worktimetable-podsumowanie-konkursu.md",
  slug: "2017-05-07-worktimetable-podsumowanie-konkursu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2017-05-30-przejscie-na-hugo.md": {
  id: "2017-05-30-przejscie-na-hugo.md",
  slug: "2017-05-30-przejscie-na-hugo",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/divide-conquer/index.mdx": {
  id: "2020/divide-conquer/index.mdx",
  slug: "divide-and-conquer-czyli-dziel-i-zwyciezaj",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/docker-podstawy/index.mdx": {
  id: "2020/docker-podstawy/index.mdx",
  slug: "docker-podstawowe-pojecia-komendy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/es2021/index.mdx": {
  id: "2020/es2021/index.mdx",
  slug: "javascript-es2021-standard",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/hacktoberfest/index.mdx": {
  id: "2020/hacktoberfest/index.mdx",
  slug: "hacktoberfest-vs-open-source",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/kmeans/index.mdx": {
  id: "2020/kmeans/index.mdx",
  slug: "jak-wlasnorecznie-zaimplementowac-algorytm-kmeans",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/no-code-narzedzia/index.mdx": {
  id: "2020/no-code-narzedzia/index.mdx",
  slug: "18-narzedzi-nocode-do-stworzenia-aplikacji",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/object-immutable/index.mdx": {
  id: "2020/object-immutable/index.mdx",
  slug: "javascript-object-const-seal-freeze",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/promise-methods/index.mdx": {
  id: "2020/promise-methods/index.mdx",
  slug: "javascript-promise-all-allsettled-race-any",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/struktura-projektu-js/index.mdx": {
  id: "2020/struktura-projektu-js/index.mdx",
  slug: "jak-stworzyc-strukture-projektu-javascript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/yt-bubble-airtable/index.mdx": {
  id: "2020/yt-bubble-airtable/index.mdx",
  slug: "trzymanie-danych-z-bubble-w-airtable",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/yt-bubble-filtrowanie/index.mdx": {
  id: "2020/yt-bubble-filtrowanie/index.mdx",
  slug: "bubble-sortowanie-filtrowanie-warunkowe-wyswietlanie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/yt-bubble-podstrony/index.mdx": {
  id: "2020/yt-bubble-podstrony/index.mdx",
  slug: "dodawanie-stron-w-bubble",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2020/yt-responsywność/index.mdx": {
  id: "2020/yt-responsywność/index.mdx",
  slug: "bubble-responsywnosc",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/adr/index.mdx": {
  id: "2021/adr/index.mdx",
  slug: "adr-architecture-decision-record",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/ai-w-praktyce/index.mdx": {
  id: "2021/ai-w-praktyce/index.mdx",
  slug: "ai-tensorflow-js-w-praktyce",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/ai-web-dev/index.mdx": {
  id: "2021/ai-web-dev/index.mdx",
  slug: "przyszlosc-ai-w-web-development",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/apollo-fastify/index.mdx": {
  id: "2021/apollo-fastify/index.mdx",
  slug: "apollo-graphql-sever-w-fastify",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/array-methods/index.mdx": {
  id: "2021/array-methods/index.mdx",
  slug: "podstawowe-operacje-na-tablicach-javascript-mutation-non-mutating",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/automatyzacje-v2/index.mdx": {
  id: "2021/automatyzacje-v2/index.mdx",
  slug: "automatyzacje-integromat-airtable",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/automatyzacje/index.mdx": {
  id: "2021/automatyzacje/index.mdx",
  slug: "automatyzacje-dla-bloga-integromat-airtable",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/ci-cd/index.mdx": {
  id: "2021/ci-cd/index.mdx",
  slug: "co-to-jest-continuous-integration-continuous-delivery-continuous-deployment",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/css-2021/index.mdx": {
  id: "2021/css-2021/index.mdx",
  slug: "mozliwosci-css-w-2021",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/css-przesuwanie-elementow/index.mdx": {
  id: "2021/css-przesuwanie-elementow/index.mdx",
  slug: "css-rozmieszczanie-elementow-flexbox-grid",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/docker-pierwszy-obraz/index.mdx": {
  id: "2021/docker-pierwszy-obraz/index.mdx",
  slug: "jak-zbudowac-swoj-pierwszy-obraz-w-docker",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/fastify-handlebars/index.mdx": {
  id: "2021/fastify-handlebars/index.mdx",
  slug: "fastify-handlebars-tailwind",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/fastify-hotwire/index.mdx": {
  id: "2021/fastify-hotwire/index.mdx",
  slug: "hotwire-w-fastify",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/fastify-mongo/index.mdx": {
  id: "2021/fastify-mongo/index.mdx",
  slug: "fastify-plugin-mongodb",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/fastify-pierwsze-endpointy/index.mdx": {
  id: "2021/fastify-pierwsze-endpointy/index.mdx",
  slug: "fastify-pierwsze-endpointy-walidacja",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/firebase-auth/index.mdx": {
  id: "2021/firebase-auth/index.mdx",
  slug: "uwierzytelnianie-firebase-authentication",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/firebase-bezkosztowo/index.mdx": {
  id: "2021/firebase-bezkosztowo/index.mdx",
  slug: "firebase-emulator-jak-korzystac",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/firebase-hosting/index.mdx": {
  id: "2021/firebase-hosting/index.mdx",
  slug: "deploy-aplikacji-react-do-firebase-hosting",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/firebase-react/index.mdx": {
  id: "2021/firebase-react/index.mdx",
  slug: "jak-dodac-firebase-do-aplikacji-react",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/firestore-add-update/index.mdx": {
  id: "2021/firestore-add-update/index.mdx",
  slug: "firebase-firestore-set-add-update-delete",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/firestore-pobranie-danych/index.mdx": {
  id: "2021/firestore-pobranie-danych/index.mdx",
  slug: "firebase-firestore-pobieranie-danych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/jakosc-kodu/index.mdx": {
  id: "2021/jakosc-kodu/index.mdx",
  slug: "jakosc-kodu-prettier-eslint-ci-cd-testowanie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/js-biblioteki/index.mdx": {
  id: "2021/js-biblioteki/index.mdx",
  slug: "5-bibliotek-javascript-ktore-warto-znac-w-2021",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/lnktree-case-study/index.mdx": {
  id: "2021/lnktree-case-study/index.mdx",
  slug: "case-study-projektu-do-trzymania-linkow",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/nazwa-ftp/index.mdx": {
  id: "2021/nazwa-ftp/index.mdx",
  slug: "github-action-deploy-ftp-nazwa-pl-cloudhosting",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/neo4j/index.mdx": {
  id: "2021/neo4j/index.mdx",
  slug: "grafowa-baza-danych-neo4j",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/react-graphql/index.mdx": {
  id: "2021/react-graphql/index.mdx",
  slug: "react-graphql-apollo-client",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/sentry/index.mdx": {
  id: "2021/sentry/index.mdx",
  slug: "sentry-logowanie-zdarzen-w-aplikacji",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/solid-vs-stupid/index.mdx": {
  id: "2021/solid-vs-stupid/index.mdx",
  slug: "zasady-solid-vs-zasady-stupid",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/ts-safe-guards/index.mdx": {
  id: "2021/ts-safe-guards/index.mdx",
  slug: "typescript-type-guard-type-predicate",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2021/ts-utility-types/index.mdx": {
  id: "2021/ts-utility-types/index.mdx",
  slug: "typescript-utility-types",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/architektura-react/index.mdx": {
  id: "2022/architektura-react/index.mdx",
  slug: "architektura-projektu-react",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/cloudhosting-node/index.mdx": {
  id: "2022/cloudhosting-node/index.mdx",
  slug: "deploy-node-cloudhosting",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/czysty-kod-js/index.mdx": {
  id: "2022/czysty-kod-js/index.mdx",
  slug: "czysty-kod-javascript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/feature-flag/index.mdx": {
  id: "2022/feature-flag/index.mdx",
  slug: "czym-sa-feature-flags",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/micorfrontend-module-federation/index.mdx": {
  id: "2022/micorfrontend-module-federation/index.mdx",
  slug: "microfronends-with-module-federation",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/mikrus/index.mdx": {
  id: "2022/mikrus/index.mdx",
  slug: "recenzja-mikrus-tani-vps",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/najgorszy-programista/index.mdx": {
  id: "2022/najgorszy-programista/index.mdx",
  slug: "antywzorce-pisania-dobrego-kodu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/next13-layouts/index.mdx": {
  id: "2022/next13-layouts/index.mdx",
  slug: "vercel-nextjs-layouts",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/prisma-crud/index.mdx": {
  id: "2022/prisma-crud/index.mdx",
  slug: "prisma-fastify-basic-crud",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/prisma-relacje/index.mdx": {
  id: "2022/prisma-relacje/index.mdx",
  slug: "relacje-baza-danych-prisma-fastify",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2022/trendy-js-2022/index.mdx": {
  id: "2022/trendy-js-2022/index.mdx",
  slug: "trendy-javascript-2022",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2023/github-actions/index.mdx": {
  id: "2023/github-actions/index.mdx",
  slug: "ci-github-actions",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2023/js-console/index.mdx": {
  id: "2023/js-console/index.mdx",
  slug: "javascript-console",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2023/s3-deploy/index.mdx": {
  id: "2023/s3-deploy/index.mdx",
  slug: "amazon-s3-konfiguracja-spa-deploy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"2023/yt-hof/index.mdx": {
  id: "2023/yt-hof/index.mdx",
  slug: "javascript-higher-order-function",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-component.mdx": {
  id: "angular-component.mdx",
  slug: "angular-komponenty",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-hello-world.mdx": {
  id: "angular-hello-world.mdx",
  slug: "angular-hello-world",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-kontrolowanie-widoku.mdx": {
  id: "angular-kontrolowanie-widoku.mdx",
  slug: "angular-kontrolowanie-widoku",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-lifecycle.mdx": {
  id: "angular-lifecycle.mdx",
  slug: "angular-cykl-zycia-komponentu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-pipes.mdx": {
  id: "angular-pipes.mdx",
  slug: "angular-pipes-czyli-jak-przeksztalcac-zmienne-na-widoku",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-redux.mdx": {
  id: "angular-redux.mdx",
  slug: "redux-store-w-angularze",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-routing.mdx": {
  id: "angular-routing.mdx",
  slug: "angular-podstawy-routingu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"angular-testy.mdx": {
  id: "angular-testy.mdx",
  slug: "testy-komponentow-w-angularze",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"any-vs-unknown.mdx": {
  id: "any-vs-unknown.mdx",
  slug: "typescript-any-vs-unknown",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"api-platform-crud.mdx": {
  id: "api-platform-crud.mdx",
  slug: "api-platform-pierwsze-endpointy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"api-platform-konfiguracja-cruda.mdx": {
  id: "api-platform-konfiguracja-cruda.mdx",
  slug: "api-platform-konfiguracja-cruda",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"api-platform-wprowadzenie.mdx": {
  id: "api-platform-wprowadzenie.mdx",
  slug: "api-platform-wprowadzenie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"assemblyscript.mdx": {
  id: "assemblyscript.mdx",
  slug: "assembly-script-czyli-webassembly-dla-programistow-typescripta",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"asynchronicznosc-w-javascript.mdx": {
  id: "asynchronicznosc-w-javascript.mdx",
  slug: "asynchronicznosc-w-javascript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"badz-produktywny-bitbucket.mdx": {
  id: "badz-produktywny-bitbucket.mdx",
  slug: "badz-produktywny-wyciagnij-wiecej-z-bitbucketa",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"bubble-todo.mdx": {
  id: "bubble-todo.mdx",
  slug: "jak-15-minut-zrobic-todo-app",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"confrontjs2019-konkurs.mdx": {
  id: "confrontjs2019-konkurs.mdx",
  slug: "confrontjs2019-konkurs",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"css-animacje.mdx": {
  id: "css-animacje.mdx",
  slug: "animacje-w-css",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"css-grid.mdx": {
  id: "css-grid.mdx",
  slug: "CSS-Grid",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"css-transform.mdx": {
  id: "css-transform.mdx",
  slug: "css-transform",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"css-variables.mdx": {
  id: "css-variables.mdx",
  slug: "css-variables",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"cypress.mdx": {
  id: "cypress.mdx",
  slug: "cypress-proste-testy-e2e",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"d3-axes.mdx": {
  id: "d3-axes.mdx",
  slug: "d3-osie-na-wykresie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"d3-events.mdx": {
  id: "d3-events.mdx",
  slug: "d3-obsluga-zdarzen",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"d3-simple-line-chart.mdx": {
  id: "d3-simple-line-chart.mdx",
  slug: "d3-prosty-wykres-liniowy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"dnotebook.mdx": {
  id: "dnotebook.mdx",
  slug: "javascript-notebook-dnotebook",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"ecma-modules.mdx": {
  id: "ecma-modules.mdx",
  slug: "moduly-ecmascript-w-nodejs",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"electron-builder.mdx": {
  id: "electron-builder.mdx",
  slug: "budowanie-aplikacji-w-electronie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"electron-komunikacja.mdx": {
  id: "electron-komunikacja.mdx",
  slug: "komunikacja-miedzy-widokiem-a-glownym-watkiem-w-electronie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"electron.mdx": {
  id: "electron.mdx",
  slug: "electron-czyli-javascript-w-aplikacjach-desktopowych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"es2020.mdx": {
  id: "es2020.mdx",
  slug: "es2020-co-nowego-nas-czeka",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"es6-funkcje.mdx": {
  id: "es6-funkcje.mdx",
  slug: "seria-es6-funkcje",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"es6-klasy.mdx": {
  id: "es6-klasy.mdx",
  slug: "seria-es6-obiekty-i-klasy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"es6-zmienne.mdx": {
  id: "es6-zmienne.mdx",
  slug: "seria-es6-zmienne-const-let",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"eslint.mdx": {
  id: "eslint.mdx",
  slug: "eslint-statyczna-analiza-kodu-javascript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"estymaty.mdx": {
  id: "estymaty.mdx",
  slug: "wywroz-sobie-estymacje",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"express-hello-world.mdx": {
  id: "express-hello-world.mdx",
  slug: "expressjs-hello-world",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"express-routes.mdx": {
  id: "express-routes.mdx",
  slug: "express-routing",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"file-upload.mdx": {
  id: "file-upload.mdx",
  slug: "upload-plikow-w-aplikacji",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"firebase.mdx": {
  id: "firebase.mdx",
  slug: "firebase-backend-dla-frontendu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"frontendcon2017.mdx": {
  id: "frontendcon2017.mdx",
  slug: "frontend-con-2017",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"git-dla-poczatkujacych.mdx": {
  id: "git-dla-poczatkujacych.mdx",
  slug: "git-dla-poczatkujacych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"github-actions-konfiguracja.mdx": {
  id: "github-actions-konfiguracja.mdx",
  slug: "github-actions-konfiguracja-i-wlasne-obrazy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"graphql-wstep.mdx": {
  id: "graphql-wstep.mdx",
  slug: "czym-jest-graphql",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"grapql-mutacje.mdx": {
  id: "grapql-mutacje.mdx",
  slug: "graphql-wysylanie-danych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"grapql-schemat-typy.mdx": {
  id: "grapql-schemat-typy.mdx",
  slug: "graphql-wlasne-typy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"gtihub-actions-pierwsze-kroki.mdx": {
  id: "gtihub-actions-pierwsze-kroki.mdx",
  slug: "github-actions-pierwsze-kroki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"headless-cms.mdx": {
  id: "headless-cms.mdx",
  slug: "co-to-jest-headless-cms",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"hugo-theme.mdx": {
  id: "hugo-theme.mdx",
  slug: "szablony-w-hugo",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"intellij-szablony.mdx": {
  id: "intellij-szablony.mdx",
  slug: "intellij-szablony",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"jak-pisac-kod-by-nie-przeklinali.mdx": {
  id: "jak-pisac-kod-by-nie-przeklinali.mdx",
  slug: "jak-pisac-kod-by-inni-nie-przeklinali",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"js-array-methods.mdx": {
  id: "js-array-methods.mdx",
  slug: "jak-sobie-radzic-z-tablicami-w-javascript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"js-regex.mdx": {
  id: "js-regex.mdx",
  slug: "wyrazenia-regularne-w-javascript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"koa-errors.mdx": {
  id: "koa-errors.mdx",
  slug: "koa-obsluga-bledow",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"koa-middlewares.mdx": {
  id: "koa-middlewares.mdx",
  slug: "koa-middlewares",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"koa-pierwsze-kroki.mdx": {
  id: "koa-pierwsze-kroki.mdx",
  slug: "koa-pierwsze-kroki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"latex.mdx": {
  id: "latex.mdx",
  slug: "latex-lepszy-sposob-na-pisanie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"leniwy-programista.mdx": {
  id: "leniwy-programista.mdx",
  slug: "programisto-badz-leniwy",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"low-code.mdx": {
  id: "low-code.mdx",
  slug: "czym-jest-low-code-no-code",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"machine-learning.mdx": {
  id: "machine-learning.mdx",
  slug: "czym-jest-uczenie-maszynowe",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"mockowanie-danych.mdx": {
  id: "mockowanie-danych.mdx",
  slug: "jak-mockowac-dane-na-frontendzie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"nauka-programowania.mdx": {
  id: "nauka-programowania.mdx",
  slug: "jak-uczyc-sie-programowania",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-cli-narzedzia.mdx": {
  id: "node-cli-narzedzia.mdx",
  slug: "5-bibliotek-ktore-pomoga-w-napisaniu-cli-w-nodejs",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-events.mdx": {
  id: "node-events.mdx",
  slug: "nodejs-asynchroniczne-zdarzenia",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-jak-postawic-serwer.mdx": {
  id: "node-jak-postawic-serwer.mdx",
  slug: "node-jak-postawic-serwer",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-mongo-fetch.mdx": {
  id: "node-mongo-fetch.mdx",
  slug: "nodejs-mongodb-pobieranie-danych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-mongo.mdx": {
  id: "node-mongo.mdx",
  slug: "nodejs-mongodb-laczenie-baza-danych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-mysql.mdx": {
  id: "node-mysql.mdx",
  slug: "node-mysql",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-pierwsze-kroki.mdx": {
  id: "node-pierwsze-kroki.mdx",
  slug: "nodejs-pierwsze-kroki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"node-worker.mdx": {
  id: "node-worker.mdx",
  slug: "worker-threads-w-nodejs",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"nodegui.mdx": {
  id: "nodegui.mdx",
  slug: "czy-nodegui-jest-nastepca-electrona",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"nodemailer.mdx": {
  id: "nodemailer.mdx",
  slug: "wysylanie-maili-w-nodejs-nodemailer",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"nowosci-typescript.mdx": {
  id: "nowosci-typescript.mdx",
  slug: "optional-chaining-nullish-coalescing",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"open-graph.mdx": {
  id: "open-graph.mdx",
  slug: "open-graph-dla-bloggerow",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"open-source.mdx": {
  id: "open-source.mdx",
  slug: "czy-jestesmy-wiezniami-open-source",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"plop.mdx": {
  id: "plop.mdx",
  slug: "generowanie-plikow-z-plop",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"poczatkujacy-cors.mdx": {
  id: "poczatkujacy-cors.mdx",
  slug: "sop-cors",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"poczatkujacy-kody-odpowiedzi.mdx": {
  id: "poczatkujacy-kody-odpowiedzi.mdx",
  slug: "http-response-status-codes",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"podstawanie-2018.mdx": {
  id: "podstawanie-2018.mdx",
  slug: "podsumowanie-2019-i-plany-na-2019",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"podstawy-regex.mdx": {
  id: "podstawy-regex.mdx",
  slug: "w-swiecie-wyrazen-regularnych",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"podsumowanie-2017.mdx": {
  id: "podsumowanie-2017.mdx",
  slug: "podsumowanie-2017",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"podsumowanie-2019.mdx": {
  id: "podsumowanie-2019.mdx",
  slug: "podsumowanie-2019-i-plany-2020",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"postman-testy.mdx": {
  id: "postman-testy.mdx",
  slug: "badz-produktywny-testy-w-postmanie",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"postman.mdx": {
  id: "postman.mdx",
  slug: "badz-produktywny-podstawy-postmana",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"praktyki.mdx": {
  id: "praktyki.mdx",
  slug: "jak-przezyc-staz-praktyki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"prettier.mdx": {
  id: "prettier.mdx",
  slug: "badz-produktywny-prettier",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"programowanie-w-szkolach.mdx": {
  id: "programowanie-w-szkolach.mdx",
  slug: "programowanie-w-szkolach",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"quokka.mdx": {
  id: "quokka.mdx",
  slug: "quokka-szybkie-prototypy-w-twoim-edytorze",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"react-testowanie-jest-enzyme.mdx": {
  id: "react-testowanie-jest-enzyme.mdx",
  slug: "react-testowanie-jest-i-enzyme",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"role-w-webdev.mdx": {
  id: "role-w-webdev.mdx",
  slug: "kto-jest-kim-czyli-role-webdevelopment",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"spa-ssr.mdx": {
  id: "spa-ssr.mdx",
  slug: "spa-vs-ssr-vs-static-site",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"spreadit2018.mdx": {
  id: "spreadit2018.mdx",
  slug: "spreadit2018-wrazenia-po-konferencji",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"sse.mdx": {
  id: "sse.mdx",
  slug: "server-sent-events-sse-co-to-jest",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"statyczna-strona-na-aws.mdx": {
  id: "statyczna-strona-na-aws.mdx",
  slug: "statyczna-strona-na-aws",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"steve-jobs-recenzja.mdx": {
  id: "steve-jobs-recenzja.mdx",
  slug: "steve-jobs-recenzja-ksiazki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"style-cz-1.mdx": {
  id: "style-cz-1.mdx",
  slug: "szybka-powtorka-z-selektorow-css",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"testowanie-javascript-mocha-chai.mdx": {
  id: "testowanie-javascript-mocha-chai.mdx",
  slug: "testowanie-w-javascript-mocha-i-chai",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"testy.mdx": {
  id: "testy.mdx",
  slug: "czym-sa-testy-w-programowaniu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"ts-decorators.mdx": {
  id: "ts-decorators.mdx",
  slug: "dekoratory-w-typescript",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"typeorm.mdx": {
  id: "typeorm.mdx",
  slug: "typeorm-pierwsze-kroki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"vsc-snippets.mdx": {
  id: "vsc-snippets.mdx",
  slug: "vsc-snippets",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"webassembly.mdx": {
  id: "webassembly.mdx",
  slug: "webassembly-jak-zaczac",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"webcomponents.mdx": {
  id: "webcomponents.mdx",
  slug: "czym-sa-web-components",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"webgl.mdx": {
  id: "webgl.mdx",
  slug: "grafika-3d-w-przegladarce-webgl",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"wzorce-projektowe-singleton.mdx": {
  id: "wzorce-projektowe-singleton.mdx",
  slug: "wzorce-projektowe-singleton",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
