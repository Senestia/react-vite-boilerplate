import pokemonHttp from "~/utils/http"
import type {
  PokemonDetail,
  PokemonListItem,
  RawPokemonDetailApiResponse,
} from "../types/pokemon.types"

async function fetchPokemonList(limit: number): Promise<PokemonListItem[]> {
  const { data } = await pokemonHttp.get<{ results: PokemonListItem[] }>(
    "/pokemon",
    { params: { limit } },
  )
  return data.results
}

async function fetchPokemonByName(name: string): Promise<PokemonDetail> {
  const { data } = await pokemonHttp.get<RawPokemonDetailApiResponse>(
    `/pokemon/${encodeURIComponent(name.toLowerCase())}`,
  )

  const types: string[] = (data.types ?? [])
    .map((entry) => entry.type?.name)
    .filter((t): t is string => Boolean(t))

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    imageUrl: data.sprites?.front_default ?? null,
    types,
  }
}

export const pokemonRepository = {
  fetchPokemonList,
  fetchPokemonByName,
}
