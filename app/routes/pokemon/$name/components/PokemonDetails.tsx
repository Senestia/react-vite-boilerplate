import type { PokemonDetail } from "../../types"

interface PokemonDetailsProps {
  pokemon: PokemonDetail
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <article className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
      <div className="flex items-center gap-4">
        {pokemon.imageUrl ? (
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="h-20 w-20"
          />
        ) : (
          <div className="h-20 w-20 rounded bg-gray-100 dark:bg-gray-800" />
        )}
        <div>
          <h2 className="text-xl font-medium capitalize">{pokemon.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Types: {pokemon.types.join(", ") || "-"}
          </p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-400">ID</dt>
          <dd className="font-medium">{pokemon.id}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-400">Height</dt>
          <dd className="font-medium">{pokemon.height}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-400">Weight</dt>
          <dd className="font-medium">{pokemon.weight}</dd>
        </div>
      </dl>
    </article>
  )
}
