import type { PokemonListItem } from "./pokemonListItem"

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}
