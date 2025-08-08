import type { PokemonListItem as PokemonListItemModel } from "../types"
import { PokemonListItem } from "./PokemonListItem"

interface PokemonListProps {
  items: PokemonListItemModel[]
}

export function PokemonList({ items }: PokemonListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((pokemon) => (
        <PokemonListItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </ul>
  )
}
