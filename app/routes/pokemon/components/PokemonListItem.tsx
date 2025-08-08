import { Link } from "react-router"
import type { PokemonListItem as PokemonListItemModel } from "../types/pokemon.types"

interface PokemonListItemProps {
  pokemon: PokemonListItemModel
}

function extractPokemonIdFromUrl(resourceUrl: string): number | null {
  const match = resourceUrl.match(/\/pokemon\/(\d+)\/?$/)
  if (!match) return null
  const id = Number(match[1])
  return Number.isNaN(id) ? null : id
}

function buildSpriteUrl(pokemonId: number | null): string | null {
  if (!pokemonId) return null

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
}

export function PokemonListItem({ pokemon }: PokemonListItemProps) {
  const pokemonId = extractPokemonIdFromUrl(pokemon.url)
  const spriteUrl = buildSpriteUrl(pokemonId)

  return (
    <li className="rounded-2xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {spriteUrl ? (
            <img
              src={spriteUrl}
              alt={pokemon.name}
              loading="lazy"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800" />
          )}
          <span className="font-medium capitalize">{pokemon.name}</span>
        </div>
        <Link
          to={`/pokemon/${pokemon.name}`}
          className="text-sm text-blue-700 hover:underline dark:text-blue-400"
        >
          Details
        </Link>
      </div>
    </li>
  )
}
