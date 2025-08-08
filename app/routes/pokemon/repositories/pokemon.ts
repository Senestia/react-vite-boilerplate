import { pokemonHttp } from "~/shared/utils/http"
import { toHttpError } from "~/shared/utils/httpError"
import type {
  PokemonDetail,
  PokemonListItem,
  RawPokemonDetailApiResponse,
} from "../types"

async function fetchPokemonList(limit: number): Promise<PokemonListItem[]> {
  try {
    const { data } = await pokemonHttp.get<{ results: PokemonListItem[] }>(
      "/pokemon",
      { params: { limit } },
    )
    return data.results
  } catch (error) {
    throw toHttpError(error)
  }
}

async function fetchPokemonByName(name: string): Promise<PokemonDetail> {
  try {
    const { data } = await pokemonHttp.get<RawPokemonDetailApiResponse>(
      `/pokemon/${encodeURIComponent(name.toLowerCase())}`,
    )

    const types: string[] = (data.types ?? [])
      .map(
        (entry: RawPokemonDetailApiResponse["types"][number]) =>
          entry.type?.name,
      )
      .filter((t: string | undefined): t is string => Boolean(t))

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      imageUrl: data.sprites?.front_default ?? null,
      types,
    }
  } catch (error) {
    throw toHttpError(error)
  }
}

export const pokemonRepository = {
  fetchPokemonList,
  fetchPokemonByName,
}
