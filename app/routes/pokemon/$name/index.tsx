import { QueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { isRouteErrorResponse, useParams } from "react-router"
import ErrorView from "../../../shared/components/ErrorView"
import { pokemonDetailKeys, usePokemonDetail } from "../hooks"
import { pokemonRepository } from "../repositories/pokemon"
import { usePokemonUiStore } from "../state/uiStore"
import type { Route } from "./+types/index"
import { PokemonDetailsContainer } from "./containers/PokemonDetailsContainer"

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: Route.ClientLoaderArgs) => {
    const name = params.name?.toString() ?? ""
    if (!name) {
      throw new Response("Missing pokemon name", { status: 400 })
    }
    await queryClient.prefetchQuery({
      queryKey: pokemonDetailKeys.byName(name),
      queryFn: () => pokemonRepository.fetchPokemonByName(name),
    })
    return null
  }

export default function PokemonDetailsRoute() {
  const { name = "" } = useParams<{ name: string }>()
  const setSelectedName = usePokemonUiStore(
    (state: { setSelectedName: (name: string) => void }) =>
      state.setSelectedName,
  )

  useEffect(() => {
    setSelectedName(name)
  }, [name, setSelectedName])

  const { data, isLoading, isError } = usePokemonDetail(name)

  if (isLoading) return <p>Loading...</p>
  if (isError || !data) throw new Error("Pokemon not found")
  return <PokemonDetailsContainer pokemon={data} />
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
