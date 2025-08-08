<div align="center">

# ⚡️ React Vite Boilerplate (RR7 SPA)

Modern, production-ready React boilerplate using React Router 7 Framework Mode (SPA), Vite, Tailwind CSS v4, and TypeScript.

🧭 File-based routing • 🔁 Client loaders • 🧩 Layouts • 🛡️ Error boundaries • 🎨 Theming • 🌍 i18n

</div>

---

## 🚀 Tech Stack

- ⚛️ **React 19**
- 🧭 **React Router 7 (Framework Mode)** — SPA by default
- 🏎️ **Vite 6**
- 🎨 **Tailwind CSS v4**
- 🔷 **TypeScript** (strict)
- 🌍 **i18next** (optional)

## ✨ Highlights

- **SPA mode** with React Router 7 Framework Mode (no SSR)
- **File-based routing** with segment layouts and dynamic routes
- **clientLoader/ErrorBoundary** per-route for great UX
- **Centralized HTTP** client and repositories (no side effects)
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
│   ├── repositories/         # Page-specific data provider definitions
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
      route(":pokemonName", "routes/pokemon/$pokemonName/index.tsx"),
    ]),
    route("*", "routes/notFound/index.tsx"),
  ]),
] satisfies RouteConfig
```

### 📦 Index route with client loader

`app/routes/pokemon/index.tsx`

```tsx
import type { Route } from "./+types/index"
import { pokemonRepository } from "./repositories/pokemon"

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  const pokemonList = await pokemonRepository.fetchPokemonList(12)
  return { pokemonList }
}

export default function PokemonRoute({ loaderData }: Route.ComponentProps) {
  const { pokemonList } = loaderData
  // render with a container/component
  // return <PokemonExplorer pokemonList={pokemonList} />
  return <div>{pokemonList.length} items</div>
}
```

### 🧭 Dynamic route with params + loader

`app/routes/pokemon/$pokemonName/index.tsx`

```tsx
import type { Route } from "./+types/index"
import { pokemonRepository } from "../repositories/pokemon"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const pokemonName = params.pokemonName?.toString() ?? ""
  if (!pokemonName) throw new Response("Missing pokemon name", { status: 400 })
  const pokemon = await pokemonRepository.fetchPokemonByName(pokemonName)
  return { pokemon }
}

export default function PokemonDetailsRoute({
  loaderData,
}: Route.ComponentProps) {
  const { pokemon } = loaderData
  return <div>{pokemon.name}</div>
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

## 🔌 Data Layer & HTTP

- Endpoints and HTTP clients are centralized and reused across features.

`app/shared/constants/endpoint.ts`

```ts
export const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2"
```

`app/shared/utils/http.ts`

```ts
import axios, { type AxiosInstance } from "axios"
import { POKEMON_API_BASE_URL } from "../constants/endpoint"

export function createHttpClient(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}

export const pokemonHttp: AxiosInstance = createHttpClient(POKEMON_API_BASE_URL)
```

`app/routes/pokemon/repositories/pokemon.ts`

```ts
import { pokemonHttp } from "~/shared/utils/http"

async function fetchPokemonList(limit: number) {
  const { data } = await pokemonHttp.get<{ results: { name: string }[] }>(
    "/pokemon",
    { params: { limit } },
  )
  return data.results
}

export const pokemonRepository = { fetchPokemonList }
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

- `dev` — start dev server with HMR
- `build` — production build
- `start` — preview production build
- `typecheck` — TypeScript diagnostics
- `test` — run unit tests (Vitest + RTL)

---

Built with ❤️ for fast, maintainable SPAs.
