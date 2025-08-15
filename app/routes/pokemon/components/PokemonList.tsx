import type { PokemonListItem as PokemonListItemModel } from "../types"
import { PokemonListItem } from "./PokemonListItem"

interface PokemonListProps {
  items: PokemonListItemModel[]
  isLoading?: boolean
  isLoadingMore?: boolean
  hasMore?: boolean
}

export function PokemonList({ items, isLoading = false }: PokemonListProps) {
  if (isLoading && items.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Loading Pokemon...
        </div>
      </div>
    )
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          No Pokemon found
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((pokemon) => (
          <PokemonListItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  )
}
