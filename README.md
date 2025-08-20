<div align="center">

# ⚡️ React Vite Boilerplate (RR7 SPA)

Modern, production-ready React boilerplate using React Router 7 Framework Mode (SPA), Vite, Tailwind CSS v4, and TypeScript.

🧭 File-based routing • 🔁 Client loaders + React Query • 📦 Zustand for UI state • 🧩 Layouts • 🛡️ Error boundaries • 🎨 Theming • 🌍 i18n

</div>

---

## 🚀 Tech Stack

- ⚛️ **[React 19](https://react.dev)**
- 🧭 **[React Router 7 (Framework Mode)](https://reactrouter.com/)** — SPA by default
- 🏎️ **[Vite 6](https://vitejs.dev/)**
- 🎨 **[Tailwind CSS v4](https://tailwindcss.com/)**
- 🔷 **[TypeScript](https://www.typescriptlang.org/)** (strict)
- 📦 **[@tanstack/react-query](https://tanstack.com/query/latest)**
- 🗂️ **[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)** (ephemeral UI state)
- 🌍 **[i18next](https://www.i18next.com/)** (optional)

## ✨ Highlights

- **SPA mode** with React Router 7 Framework Mode (no SSR)
- **File-based routing** with segment layouts and dynamic routes
- **Client loaders** that pre-seed React Query cache; components read via `useQuery`/`useInfiniteQuery`
- **Zustand** for ephemeral UI/app state only (no server entities)
- **Centralized HTTP** clients and typed repositories (no side effects)
- **Tailwind v4** theme-ready styles (light/dark)

## 📁 Folder Structure

Routes and tests follow the rules in `.cursor/rules/front-end-rules.mdc`:

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
      route(":name", "routes/pokemon/$name/index.tsx"),
    ]),
    route("*", "routes/notFound/index.tsx"),
  ]),
] satisfies RouteConfig
```

### 🧱 App root providers

`app/root.tsx`

```tsx
import { QueryClientProvider } from "@tanstack/react-query"
import { I18nextProvider } from "react-i18next"
import i18n from "./shared/utils/i18n"
import { queryClient } from "./shared/utils/queryClient"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language}>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

### 📦 List route with client loader + React Query + Zustand

`app/routes/pokemon/index.tsx`

```tsx
import { QueryClient } from "@tanstack/react-query"
import type { Route } from "./+types/index"
import { PokemonExplorer } from "./containers/PokemonExplorer"
import { pokemonRepository } from "./repositories/pokemon"
import { usePokemonUiStore } from "./state/uiStore"

const keys = {
  listInfinite: (limit: number) =>
    ["pokemon", "list", "infinite", limit] as const,
}

export const clientLoader =
  (queryClient: QueryClient) => async (_args: Route.ClientLoaderArgs) => {
    const limit = usePokemonUiStore.getState().listLimit
    await queryClient.prefetchInfiniteQuery({
      queryKey: keys.listInfinite(limit),
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        pokemonRepository.fetchPokemonListPage({ limit, offset: pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
      pages: 1,
    })
    return null
  }

export default function PokemonRoute() {
  return <PokemonExplorer />
}
```

### 🧭 Dynamic route with params + client loader prefetch

`app/routes/pokemon/$name/index.tsx`

```tsx
import { QueryClient, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import type { Route } from "./+types/index"
import { pokemonRepository } from "../repositories/pokemon"

const keys = { byName: (name: string) => ["pokemon", "detail", name] as const }

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: Route.ClientLoaderArgs) => {
    const name = params.name?.toString() ?? ""
    if (!name) throw new Response("Missing pokemon name", { status: 400 })
    await queryClient.prefetchQuery({
      queryKey: keys.byName(name),
      queryFn: () => pokemonRepository.fetchPokemonByName(name),
    })
    return null
  }

export default function PokemonDetailsRoute() {
  const { name = "" } = useParams<{ name: string }>()
  const { data } = useQuery({
    queryKey: keys.byName(name),
    queryFn: () => pokemonRepository.fetchPokemonByName(name),
    enabled: Boolean(name),
  })
  return data ? <div>{data.name}</div> : null
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

Each route (or layout) can export an `ErrorBoundary`.

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
import { toHttpError } from "~/shared/utils/httpError"

export interface PokemonListPageResult {
  items: { name: string }[]
  nextOffset: number | null
}

async function fetchPokemonListPage(params: {
  limit: number
  offset: number
}): Promise<PokemonListPageResult> {
  const { limit, offset } = params
  try {
    const { data } = await pokemonHttp.get<{
      results: { name: string }[]
      next?: string | null
    }>("/pokemon", { params: { limit, offset } })
    let nextOffset: number | null = null
    if (data?.next) {
      try {
        const nextUrl = new URL(data.next)
        const offsetParam = nextUrl.searchParams.get("offset")
        nextOffset = offsetParam ? Number(offsetParam) : null
        if (Number.isNaN(nextOffset)) nextOffset = null
      } catch {
        nextOffset = null
      }
    }
    return { items: data.results ?? [], nextOffset }
  } catch (error) {
    throw toHttpError(error)
  }
}

async function fetchPokemonByName(name: string) {
  try {
    const { data } = await pokemonHttp.get(
      `/pokemon/${encodeURIComponent(name.toLowerCase())}`,
    )
    return { id: data.id, name: data.name }
  } catch (error) {
    throw toHttpError(error)
  }
}

export const pokemonRepository = { fetchPokemonListPage, fetchPokemonByName }
```

## 🗂️ Zustand (UI state)

`app/routes/pokemon/state/uiStore.ts`

```ts
import { create } from "zustand"

export interface PokemonUiState {
  listLimit: number
  selectedName: string
  setListLimit: (limit: number) => void
  setSelectedName: (name: string) => void
}

export const usePokemonUiStore = create<PokemonUiState>((set) => ({
  listLimit: 12,
  selectedName: "",
  setListLimit: (limit: number) => set({ listLimit: limit }),
  setSelectedName: (name: string) => set({ selectedName: name }),
}))
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

### Development

- `dev` — start dev server with HMR
- `build` — production build
- `start` — preview production build

### Code Quality

- `typecheck` — TypeScript diagnostics
- `lint` — ESLint check with error reporting
- `lint:check` — ESLint check with zero warnings policy
- `lint:fix` — ESLint with auto-fix
- `quality` — run lint + typecheck + format checks
- `quality:fix` — run lint:fix + format auto-fix

### Testing

- `test` — run unit tests (Vitest + RTL)
- `test:watch` — run tests in watch mode
- `test:coverage` — run tests with coverage report

---

Built with ❤️ for fast, maintainable SPAs.
