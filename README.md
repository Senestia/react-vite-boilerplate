<div align="center">

# ⚡️ React Vite Boilerplate (RR7 SPA)

Modern, production-ready React boilerplate using React Router 7 Framework Mode (SPA), Redux Toolkit + RTK Query, Vite, Tailwind CSS v4, and TypeScript.

🧭 File-based routing • 🗄️ Redux Toolkit • 🔄 Infinite scroll • 🛡️ Error boundaries • 🎨 Theming • 🌍 i18n

</div>

---

## 🚀 Tech Stack

- ⚛️ **React 19**
- 🧭 **React Router 7 (Framework Mode)** — SPA by default
- 🏎️ **Vite 6**
- 🎨 **Tailwind CSS v4**
- 🔷 **TypeScript** (strict)
- 🗄️ **Redux Toolkit** with RTK Query for state management & data fetching
- 🌍 **i18next** (optional)

## ✨ Highlights

- **SPA mode** with React Router 7 Framework Mode (no SSR)
- **File-based routing** with segment layouts and dynamic routes
- **clientLoader/ErrorBoundary** per-route for great UX
- **Redux Toolkit + RTK Query** for unified state management and data fetching
- **Infinite scroll** implementation with automatic caching and request deduplication
- **Tailwind v4** theme-ready styles (light/dark)

## 📁 Folder Structure

From our front-end rules, routes and tests are organized like this:

```
app/routes/
├── home/
│   ├── components/
│   └── index.tsx             # Home route component
├── notFound/
│   ├── components/
│   └── index.tsx             # Page not found route component
├── [page-name]/
│   │   └── $[path]           # Optional nested dynamic route
│   ├── layout.tsx            # Optional layout route for this segment
│   ├── index.tsx             # Main route component
│   ├── components/           # Page-specific UI components
│   ├── containers/           # Page-specific business logic containers
│   ├── hooks/                # Page-specific custom hooks
│   ├── services/             # Page-specific API services
│   ├── constants/            # Page-specific constants and static data
│   ├── slices/               # Page-specific Redux slices (RTK Query APIs)
│   ├── types/                # Page-specific TypeScript definitions
│   └── utils/                # Page-specific utility functions
└── layout/
tests/
├── routes/[page-name]/
└── shared/
```

## 🧭 React Router 7 (Framework Mode, SPA)

### 🔧 SPA configuration

`react-router.config.ts`

```ts
import type { Config } from "@react-router/dev/config"

export default {
  // Enable SPA mode (no SSR)
  ssr: false,
} satisfies Config
```

### 🗺️ Route definitions (file-based)

`app/routes.ts`

```ts
import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/layout.tsx", [
    index("routes/home/index.tsx"),
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/index.tsx"),
      route(":name", "routes/pokemon/$name/index.tsx"),
    ]),
    route("*", "routes/notFound/index.tsx"),
  ]),
] satisfies RouteConfig
```

### 📦 Index route with RTK Query prefetching

`app/routes/pokemon/index.tsx`

```tsx
import type { Route } from "./+types/index"
import { store } from "../../shared/store"
import { pokemonApi } from "./slices/pokemonApi"
import { PokemonExplorer } from "./containers/PokemonExplorer"

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  const { ui } = store.getState()
  const { limit } = ui.pokemonList
  store.dispatch(
    pokemonApi.endpoints.getPokemonListPage.initiate(
      { limit, offset: 0 },
      { forceRefetch: false },
    ),
  )
  return null
}

export default function PokemonRoute() {
  return <PokemonExplorer />
}
```

### 🧭 Dynamic route with RTK Query prefetching

`app/routes/pokemon/$name/index.tsx`

```tsx
import type { Route } from "./+types/index"
import { store } from "../../../shared/store"
import { pokemonApi } from "../slices/pokemonApi"
import { PokemonDetailsContainer } from "./containers/PokemonDetailsContainer"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const name = params.name?.toString() ?? ""
  if (!name) throw new Response("Missing pokemon name", { status: 400 })
  store.dispatch(
    pokemonApi.endpoints.getPokemonByName.initiate(name, {
      forceRefetch: false,
    }),
  )
  return null
}

export default function PokemonDetailsRoute() {
  return <PokemonDetailsContainer />
}
```

### 🧩 Segment layout

`app/routes/layout.tsx`

```tsx
import { Outlet } from "react-router"
import { SiteHeader } from "../shared/components/SiteHeader"

export default function AppLayout() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  )
}
```

### 🛡️ Error boundaries

Each route (or layout) can export an `ErrorBoundary`. Example:

```tsx
import type { Route } from "./+types/index"
import { isRouteErrorResponse } from "react-router"

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let details = "Something went wrong."
  if (isRouteErrorResponse(error)) details = error.statusText || details
  else if (error instanceof Error && error.message) details = error.message
  return <div role="alert">{details}</div>
}
```

## 🗄️ Redux Toolkit + RTK Query Setup

### 📊 Redux Store Configuration

`app/shared/store/index.ts`

```ts
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { pokemonApi } from "~/routes/pokemon/slices/pokemonApi"
import { pokemonUiSlice } from "~/routes/pokemon/slices/pokemonUiSlice"
import { wizardUiSlice } from "~/routes/wizard/slices/wizardUiSlice"

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemonUi: pokemonUiSlice.reducer,
    wizardUi: wizardUiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
```

### 🔧 RTK Query API Slice

`app/routes/pokemon/slices/pokemonApi.ts`

```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { PokemonDetail, PokemonListPage } from "~/routes/pokemon/types"

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
    timeout: 10000,
  }),
  tagTypes: ["Pokemon", "PokemonList"],
  endpoints: (builder) => ({
    getPokemonListPage: builder.query<
      PokemonListPage,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: "/pokemon",
        params: { limit, offset },
      }),
      transformResponse: (response: any, _meta, args) => ({
        data: response.results,
        hasMore: response.next !== null,
        nextOffset: response.next ? args.offset + args.limit : null,
        totalCount: response.count,
      }),
    }),
    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `/pokemon/${encodeURIComponent(name.toLowerCase())}`,
      transformResponse: (response: any): PokemonDetail => ({
        id: response.id,
        name: response.name,
        height: response.height,
        weight: response.weight,
        imageUrl: response.sprites?.front_default ?? null,
        types:
          response.types?.map((t: any) => t.type?.name).filter(Boolean) ?? [],
      }),
    }),
  }),
})

export const { useGetPokemonListPageQuery, useGetPokemonByNameQuery } =
  pokemonApi
```

### 🏗️ Redux Provider Setup

`app/root.tsx`

```tsx
import { Provider } from "react-redux"
import { store } from "./shared/store"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
```

### 🔄 Infinite Scroll Container Example

`app/routes/pokemon/containers/PokemonExplorer.tsx`

```tsx
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "~/shared/store/hooks"
import { useGetPokemonListPageQuery } from "../slices/pokemonApi"

export function PokemonExplorer() {
  const { limit, hasMore } = useAppSelector((state) => state.pokemonUi)
  const [allPokemon, setAllPokemon] = useState([])
  const [currentOffset, setCurrentOffset] = useState(0)

  const { data, isLoading } = useGetPokemonListPageQuery({
    limit,
    offset: currentOffset,
  })

  useEffect(() => {
    if (data) {
      setAllPokemon((prev) =>
        currentOffset === 0 ? data.data : [...prev, ...data.data],
      )
    }
  }, [data, currentOffset])

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setCurrentOffset((prev) => prev + limit)
    }
  }, [hasMore, isLoading, limit])

  return (
    <div>
      {allPokemon.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
      {/* Infinite scroll - automatically loads more when scrolling near bottom */}
      {isLoadingMore && <div>Loading more Pokemon...</div>}
      {!hasMore && <div>You&apos;ve seen all the Pokemon!</div>}
    </div>
  )
}
```

## 🧪 Getting Started

1. Install deps

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build / Preview

```bash
npm run build && npm run start
```

## 🧭 Useful Scripts

### 🚀 Development

- `dev` — start dev server with HMR
- `build` — production build
- `start` — preview production build
- `typecheck` — TypeScript diagnostics

### 🧪 Testing

- `test` — run unit tests (Vitest + RTL)
- `test:watch` — run tests in watch mode
- `test:coverage` — run tests with coverage report

### 🔍 Code Quality

- `lint` — check for ESLint errors (max 0 warnings)
- `lint:fix` — fix auto-fixable ESLint issues
- `lint:check` — alias for lint command
- `format` — format code with Prettier
- `format:check` — check if code is properly formatted
- `quality` — run all quality checks (lint + typecheck + format)
- `quality:fix` — fix linting and formatting issues

---

Built with ❤️ for fast, maintainable SPAs.
