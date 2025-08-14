import { QueryClient, useQuery } from "@tanstack/react-query"
import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import type { Route } from "./+types/index"
import { PokemonExplorer } from "./containers/PokemonExplorer"
import { pokemonRepository } from "./repositories/pokemon"

const keys = {
  list: (limit: number) => ["pokemon", "list", limit] as const,
}

export const clientLoader =
  (queryClient: QueryClient) => async (_args: Route.ClientLoaderArgs) => {
    await queryClient.prefetchQuery({
      queryKey: keys.list(12),
      queryFn: () => pokemonRepository.fetchPokemonList(12),
    })
    return null
  }

export default function PokemonRoute() {
  const { data, isLoading, isError } = useQuery({
    queryKey: keys.list(12),
    queryFn: () => pokemonRepository.fetchPokemonList(12),
  })
  if (isLoading) return <p>Loading...</p>
  if (isError) throw new Error("Failed to load Pokemon list")
  if (!data) throw new Error("No Pokemon list found")
  return <PokemonExplorer pokemonList={data} />
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
