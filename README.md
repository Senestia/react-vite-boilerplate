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
│   ├── home.tsx              # / route
│   └── components/           # Module-specific components only
├── notFound/
│   ├── not-found.tsx         # catch-all route
│   └── components/           # Module-specific components only
├── auth/                              # Authentication module
│   ├── layout.tsx                     # Auth module layout (wraps all auth routes)
│   ├── login.tsx                      # /auth/login route
│   ├── register.tsx                   # /auth/register route
│   ├── forgot-password.tsx            # /auth/forgot-password route
│   ├── components/                    # Auth-specific UI components
│   ├── hooks/                         # Auth-specific custom hooks
│   ├── types/                         # Auth-specific TypeScript definitions
│   └── slices/                        # Auth-specific Redux slices
├── pokemon/                           # Pokemon module
│   ├── layout.tsx                     # Pokemon module layout (wraps all pokemon routes)
│   ├── list.tsx                       # /pokemon route (list page)
│   ├── detail.tsx                     # /pokemon/:name route (detail page)
│   ├── components/                    # Pokemon-specific UI components
│   ├── containers/                    # Pokemon-specific containers
│   ├── hooks/                         # Pokemon-specific custom hooks
│   ├── slices/                        # Pokemon-specific Redux slices
│   └── types/                         # Pokemon-specific TypeScript definitions
├── [module-name]/                     # Additional modules follow same pattern
│   ├── layout.tsx                     # Module layout (optional)
│   ├── [route-name].tsx               # Module routes named by URL path
│   ├── [semantic-name].tsx            # Dynamic routes with semantic names
│   └── [folders]/                     # Module-specific resources
└── layout.tsx                         # Root layout (optional)
tests/
├── routes/
│   ├── auth/                          # Mirror module structure
│   └── pokemon/
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

### 🗺️ Route definitions

`app/routes.ts`

```ts
import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("/auth", "routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"), // /auth/login
    route("register", "routes/auth/register.tsx"), // /auth/register
    route("forgot-password", "routes/auth/forgot-password.tsx"), // /auth/forgot-password
  ]),
  layout("routes/layout.tsx", [
    index("routes/home/home.tsx"), // /
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/list.tsx"), // /pokemon
      route(":name", "routes/pokemon/detail.tsx"), // /pokemon/:name
    ]),
    route("/admin", "routes/admin/layout.tsx", [
      index("routes/admin/dashboard.tsx"), // /admin
      route("users", "routes/admin/users.tsx"), // /admin/users
      route("users/:id/edit", "routes/admin/edit-user.tsx"), // /admin/users/:id/edit
    ]),
    route("*", "routes/notFound/not-found.tsx"), // 404
  ]),
] satisfies RouteConfig
```

### 🧭 RTK Query prefetching

`app/routes/pokemon/detail.tsx`

```tsx
import type { Route } from "./+types/detail"
import { store } from "../../shared/store"
import { pokemonApi } from "./slices/pokemonApi"
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

export default function PokemonDetailRoute() {
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

## 🏗️ Architecture Patterns

### Components vs Containers vs Custom Hooks

Our architecture separates concerns into three distinct layers:

- **Components**: Presentational only (no data fetching/business logic, minimal state)
- **Containers**: Compose components and custom hooks; handle UI-specific concerns (refs, Intersection Observers)
- **Custom Hooks**: Business logic, Redux state management, RTK Query calls, complex side effects

**Key Rules:**

- Never mix fetching and UI in the same file
- Prefer custom hooks for business logic encapsulation
- Components focus purely on rendering
- Containers orchestrate components and hooks

### Custom Hook Organization

- Place in `hooks/` folders within route segments
- Name with `use` prefix + clear functionality (`useInfiniteScroll`, `usePokemonFilters`)
- Export from barrel files when folder has 3+ hooks
- Pure business logic only - no JSX, refs, or DOM manipulation
- One primary concern per hook; avoid deep nesting

### Naming Conventions

**Route Files:**

- **Route Files**: kebab-case matching URL path (`login.tsx`, `forgot-password.tsx`)
- **Dynamic Routes**: Semantic names describing purpose (`detail.tsx`, `edit.tsx`, `settings.tsx`)
- **Module Layouts**: Always `layout.tsx` within module folders

**Components & Code:**

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useUserData.ts`)
- **Services**: camelCase with `Service` suffix (`userService.ts`)
- **Modules**: kebab-case folder names (`auth/`, `user-profile/`)
- **Barrels**: always `index.ts`

**Common Dynamic Route Names:**

- `detail.tsx` - For showing individual item details (`/pokemon/:name`, `/users/:id`)
- `edit.tsx` - For editing individual items (`/users/:id/edit`, `/posts/:id/edit`)
- `settings.tsx` - For settings pages (`/users/:id/settings`)
- `dashboard.tsx` - For dashboard/overview pages (`/admin`, `/user/:id/dashboard`)

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
