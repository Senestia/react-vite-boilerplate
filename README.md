<div align="center">

# ⚡️ React Vite Boilerplate

### 🚀 React Router 7 + Redux Toolkit

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![React Router](https://img.shields.io/badge/React%20Router-7-ca4245?logo=react-router)](https://reactrouter.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0-764abc?logo=redux)](https://redux-toolkit.js.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://typescriptlang.org)

</div>

---

## 🎯 Stack Benefits

<table>
<tr>
<td width="50%">

### 🧭 **React Router 7**

✅ Programmatic routing (no magic folders!)  
✅ Built-in data loading  
✅ Perfect error boundaries  
✅ SPA optimized

</td>
<td width="50%">

### 🗄️ **Redux Toolkit + RTK Query**

✅ State + API in one place  
✅ Auto-caching & deduplication  
✅ TypeScript heaven  
✅ DevTools built-in

</td>
</tr>
</table>

## 🛠️ Technology Stack

```
⚛️  React 19          🧭  React Router 7      🏎️  Vite 6
🎨  Tailwind v4       🔷  TypeScript         🗄️  Redux Toolkit
```

## 📂 Project Structure

```
app/routes/
├── 🏠 home/
│   ├── home.tsx                        → / route
│   └── components/                     → Home-specific UI
├── 🚫 not-found/
│   ├── not-found.tsx                   → catch-all route
│   └── components/                     → 404 UI components
├── 📁 [module]/                        → Feature module
│   ├── layout.tsx                      → Wraps /[module]/* (or [scope]-layout.tsx)
│   ├── list.tsx                        → /[module]
│   ├── detail.tsx                      → /[module]/:name
│   ├── 🧩 components/                  → UI pieces
│   ├── 📦 containers/                  → Smart components
│   ├── 🎣 hooks/                       → Business logic
│   ├── 🏪 slices/                      → Redux + API
│   └── 📝 types/                       → TypeScript defs
├── layout.tsx                          → Root layout (or [scope]-layout.tsx)
└── 🔗 shared/                          → Cross-module utilities
    ├── components/                     → Reusable UI
    ├── store/                          → Redux config
    └── utils/                          → Common helpers
```

> 💡 **No more** `$id/index.tsx` madness. Just clean, semantic names!

## ⚡️ React Router 7 Features

### 🗺️ Route Configuration

```typescript
// routes.ts
export default [
  layout("routes/layout.tsx", [
    index("routes/home/home.tsx"), // 🏠 /
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/list.tsx"), // 📜 /pokemon
      route(":name", "routes/pokemon/detail.tsx"), // 🔍 /pokemon/pikachu
    ]),
    route("*", "routes/notFound/not-found.tsx"), // 🚫 404
  ]),
] satisfies RouteConfig
```

### 🚀 Data Loading

```typescript
// Load data BEFORE the page shows up
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  store.dispatch(pokemonApi.endpoints.getPokemonByName.initiate(params.name!))
  return null // ← Magic happens here
}
```

## 🏪 Redux Toolkit Features

### ⚙️ Store Configuration

```typescript
export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer, // ← API magic
    pokemonUi: pokemonUiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware), // ← More magic
})
```

### 🎣 RTK Query Setup

```typescript
export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name}`,
      // ↑ That's it. No fetch, no loading states, no cache management.
    }),
  }),
})

// Auto-generated hooks! 🪄
export const { useGetPokemonQuery } = pokemonApi
```

### 🎯 Usage Example

```typescript
function PokemonCard() {
  const { data, isLoading } = useGetPokemonQuery("pikachu")

  if (isLoading) return <div>⚡️ Loading...</div>
  return <div>Found {data?.name}!</div>
}
```

## 🌐 State Separation Strategy

| State Type    | What Goes Here             | Files                 |
| ------------- | -------------------------- | --------------------- |
| 🌍 **Server** | Remote data, API responses | `*Api.ts` (RTK Query) |
| 💻 **Client** | UI state, user preferences | `*UiSlice.ts` (Redux) |

> 🎯 **Keep it simple**: Server data in RTK Query, UI state in Redux slices

## 🏗️ Architecture Guidelines

| Layer             | Does What          | Example                             |
| ----------------- | ------------------ | ----------------------------------- |
| 🧩 **Components** | Just render stuff  | `<PokemonCard />`                   |
| 📦 **Containers** | Connect data to UI | `usePokemonQuery` + `<PokemonCard>` |
| 🎣 **Hooks**      | Business logic     | `usePokemonFilters()`               |

## 🚀 Quick Start

```bash
npm install    # ⬇️  Get the goods
npm run dev    # 🔥 Fire it up
npm run build  # 📦 Ship it
```

## 📜 Available Scripts

| Command         | Does What              |
| --------------- | ---------------------- |
| `npm run dev`   | 🔥 Dev server with HMR |
| `npm run build` | 📦 Production build    |
| `npm test`      | 🧪 Run tests           |
| `npm run lint`  | 🔍 Check code quality  |

---

<div align="center">

**Stop wrestling with routing. Start building features.**

_Built with ❤️ for developers who want control, not chaos._

</div>
