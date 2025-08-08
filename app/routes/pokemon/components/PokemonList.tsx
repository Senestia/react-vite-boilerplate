import type { PokemonListItem } from "../types/pokemon.types"

interface PokemonListProps {
  items: PokemonListItem[]
}

export function PokemonList({ items }: PokemonListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((pokemon) => (
        <li
          key={pokemon.name}
          className="rounded-2xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium capitalize">{pokemon.name}</span>
            <a
              href={pokemon.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-blue-700 hover:underline dark:text-blue-400"
            >
              Details
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
