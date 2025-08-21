import { TypeBadge } from "../../components/TypeBadge"
import type { PokemonDetail } from "../../types"
import { AbilitiesSection } from "./AbilitiesSection"
import { StatsSection } from "./StatsSection"

interface PokemonDetailsProps {
  pokemon: PokemonDetail
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const paddedId = `#${String(pokemon.id).padStart(4, "0")}`

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
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {paddedId}
          </div>
          <h2 className="truncate text-xl font-medium capitalize">
            {pokemon.name}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon.types.length > 0 ? (
              pokemon.types.map((t) => <TypeBadge key={t} name={t} />)
            ) : (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                -
              </span>
            )}
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-400">ID</dt>
          <dd className="font-medium">{paddedId}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-400">Height</dt>
          <dd className="font-medium">{pokemon.height}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-400">Weight</dt>
          <dd className="font-medium">{pokemon.weight}</dd>
        </div>
        {typeof pokemon.baseExperience === "number" && (
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">
              Base EXP
            </dt>
            <dd className="font-medium">{pokemon.baseExperience}</dd>
          </div>
        )}
      </dl>

      <AbilitiesSection abilities={pokemon.abilities ?? []} />

      <StatsSection stats={pokemon.stats ?? []} />
    </article>
  )
}
