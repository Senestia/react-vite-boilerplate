import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import type { Route } from "./+types/index"
import { PokemonExplorer } from "./containers/PokemonExplorer"
import { pokemonRepository } from "./repositories/pokemon"

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  const pokemonList = await pokemonRepository.fetchPokemonList(12)
  return { pokemonList }
}

export default function PokemonRoute({ loaderData }: Route.ComponentProps) {
  const { pokemonList } = loaderData
  return <PokemonExplorer pokemonList={pokemonList} />
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
