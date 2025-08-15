import { QueryClient } from "@tanstack/react-query"
import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import type { Route } from "./+types/index"
import { PokemonExplorer } from "./containers/PokemonExplorer"
import { pokemonRepository } from "./repositories/pokemon"
import { usePokemonUiStore } from "./stores/uiStore"

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
  // Data fetching lives in PokemonExplorer (container)
  // Route stays presentational and relies on ErrorBoundary
  // Loader above seeds the cache for the first page
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
