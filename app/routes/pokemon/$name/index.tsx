import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../../shared/components/ErrorView"
import { store } from "../../../shared/store"
import { pokemonApi } from "../slices/pokemonApi"
import type { Route } from "./+types/index"
import { PokemonDetailsContainer } from "./containers/PokemonDetailsContainer"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const name = params.name?.toString() ?? ""
  if (!name) {
    throw new Response("Missing pokemon name", { status: 400 })
  }
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let details = "An unexpected error occurred while loading Pokemon details."

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details
  } else if (error instanceof Error && error.message) {
    details = error.message
  }

  return <ErrorView title="Error" details={details} />
}
