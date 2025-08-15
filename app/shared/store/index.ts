import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { pokemonApi } from "~/routes/pokemon/slices/pokemonApi"
import { pokemonUiSlice } from "~/routes/pokemon/slices/pokemonUiSlice"
import { wizardApi } from "~/routes/wizard/slices/wizardApi"
import { wizardUiSlice } from "~/routes/wizard/slices/wizardUiSlice"

export const store = configureStore({
  reducer: {
    // RTK Query API slices
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [wizardApi.reducerPath]: wizardApi.reducer,
    // Feature-specific UI state slices
    pokemonUi: pokemonUiSlice.reducer,
    wizardUi: wizardUiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, wizardApi.middleware),
})

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
