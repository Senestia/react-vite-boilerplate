import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../../shared/components/ErrorView"
import { pokemonRepository } from "../repositories/pokemon"
import type { Route } from "./+types/index"
import { PokemonDetailsContainer } from "./containers/PokemonDetailsContainer"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const pokemonName = params.pokemonName?.toString() ?? ""
  if (!pokemonName) {
    throw new Response("Missing pokemon name", { status: 400 })
  }
  const pokemon = await pokemonRepository.fetchPokemonByName(pokemonName)
  return { pokemon }
}

export default function PokemonDetailsRoute({
  loaderData,
}: Route.ComponentProps) {
  const { pokemon } = loaderData
  return <PokemonDetailsContainer pokemon={pokemon} />
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
