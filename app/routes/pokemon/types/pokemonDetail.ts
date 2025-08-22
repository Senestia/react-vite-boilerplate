export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  imageUrl: string | null
  types: string[]
  baseExperience?: number
  abilities?: string[]
  stats?: { name: string; value: number }[]
}
