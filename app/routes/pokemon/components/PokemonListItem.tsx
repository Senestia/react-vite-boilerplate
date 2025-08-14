import type { KeyboardEvent } from "react"
import { useNavigate } from "react-router"
import type { PokemonListItem as PokemonListItemModel } from "../types"

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
  const paddedNumber = pokemonId ? String(pokemonId).padStart(4, "0") : "----"
  const navigate = useNavigate()

  const handleActivate = () => navigate(`/pokemon/${pokemon.name}`)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleActivate()
    }
  }

  return (
    <li className="rounded-2xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md dark:border-gray-700">
      <div
        role="link"
        tabIndex={0}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        className="flex cursor-pointer flex-col items-center gap-2 text-center"
        aria-label={`View details for ${pokemon.name}`}
      >
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          {paddedNumber}
        </span>

        {spriteUrl ? (
          <img
            src={spriteUrl}
            alt={pokemon.name}
            loading="lazy"
            className="mx-auto h-20 w-full max-w-24 object-contain"
          />
        ) : (
          <div className="mx-auto h-20 w-20 rounded bg-gray-100 dark:bg-gray-800" />
        )}

        {pokemon.types && pokemon.types.length > 0 ? (
          <div className="mt-1 flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700 capitalize dark:bg-gray-800 dark:text-gray-300"
              >
                {type}
              </span>
            ))}
          </div>
        ) : null}

        <span className="mt-1 font-medium capitalize">{pokemon.name}</span>
      </div>
    </li>
  )
}
