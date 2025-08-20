import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import { store } from "../../shared/store"
import type { Route } from "./+types/_index"
import { PokemonExplorer } from "./containers/PokemonExplorer"
import { pokemonApi } from "./slices/pokemonApi"
import { resetPokemonList } from "./slices/pokemonUiSlice"

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  // Reset the pokemon list state for a fresh start
  store.dispatch(resetPokemonList())

  const { pokemonUi } = store.getState()
  const { limit } = pokemonUi
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let details = "An unexpected error occurred while loading Pokemon."

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details
  } else if (error instanceof Error && error.message) {
    details = error.message
  }

  return <ErrorView title="Error" details={details} />
}
