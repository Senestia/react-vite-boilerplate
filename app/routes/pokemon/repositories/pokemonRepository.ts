import pokemonHttp from "~/utils/http"
import type { PokemonListItem } from "../types/pokemon.types"

async function fetchPokemonList(limit: number): Promise<PokemonListItem[]> {
  const { data } = await pokemonHttp.get<{ results: PokemonListItem[] }>(
    "/pokemon",
    { params: { limit } },
  )
  return data.results
}

export const pokemonRepository = {
  fetchPokemonList,
}
