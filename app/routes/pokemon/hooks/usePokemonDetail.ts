import { useParams } from "react-router"
import { useGetPokemonByNameQuery } from "../slices/pokemonApi"

export function usePokemonDetail() {
  const { name = "" } = useParams<{ name: string }>()
  const {
    data: pokemon,
    error,
    isLoading,
    isFetching,
  } = useGetPokemonByNameQuery(name, {
    skip: !name,
  })

  return {
    pokemon,
    pokemonName: name,
    error,
    isLoading,
    isFetching,
  }
}
