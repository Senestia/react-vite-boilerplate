export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  imageUrl: string | null
  types: string[]
}

export interface RawPokemonDetailApiResponse {
  id: number
  name: string
  height: number
  weight: number
  sprites?: {
    front_default?: string | null
  }
  types: {
    type: {
      name: string
    }
  }[]
}
