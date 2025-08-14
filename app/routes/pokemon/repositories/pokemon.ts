import { pokemonHttp } from "~/shared/utils/http"
import { toHttpError } from "~/shared/utils/httpError"
import type {
  PokemonDetail,
  PokemonListItem,
  RawPokemonDetailApiResponse,
} from "../types"

async function fetchPokemonList(limit: number): Promise<PokemonListItem[]> {
  try {
    const { data } = await pokemonHttp.get<{
      results: PokemonListItem[]
    }>("/pokemon", { params: { limit } })
    return data.results
  } catch (error) {
    throw toHttpError(error)
  }
}

export interface PokemonListPageResult {
  items: PokemonListItem[]
  nextOffset: number | null
}

async function fetchPokemonListPage(params: {
  limit: number
  offset: number
}): Promise<PokemonListPageResult> {
  const { limit, offset } = params
  try {
    const { data } = await pokemonHttp.get<{
      results: PokemonListItem[]
      next?: string | null
    }>("/pokemon", { params: { limit, offset } })

    let nextOffset: number | null = null
    if (data?.next) {
      try {
        const nextUrl = new URL(data.next)
        const offsetParam = nextUrl.searchParams.get("offset")
        nextOffset = offsetParam ? Number(offsetParam) : null
        if (Number.isNaN(nextOffset)) nextOffset = null
      } catch {
        nextOffset = null
      }
    }

    return {
      items: data.results ?? [],
      nextOffset,
    }
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

    const abilities: string[] = (data.abilities ?? [])
      .map((a) => a.ability?.name)
      .filter((n: string | undefined): n is string => Boolean(n))

    const stats: { name: string; value: number }[] = (data.stats ?? [])
      .map((s) => ({ name: s.stat?.name ?? "", value: s.base_stat ?? 0 }))
      .filter((s) => Boolean(s.name))

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      imageUrl: data.sprites?.front_default ?? null,
      types,
      ...(typeof data.base_experience === "number"
        ? { baseExperience: data.base_experience }
        : {}),
      abilities,
      stats,
    }
  } catch (error) {
    throw toHttpError(error)
  }
}

export const pokemonRepository = {
  fetchPokemonList,
  fetchPokemonListPage,
  fetchPokemonByName,
}
