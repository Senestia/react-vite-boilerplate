import type { PokemonListItem } from "./pokemonListItem"

export interface PokemonListPage {
  data: PokemonListItem[]
  hasMore: boolean
  nextOffset: number | null
  totalCount: number
}
