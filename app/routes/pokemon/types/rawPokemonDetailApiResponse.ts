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
