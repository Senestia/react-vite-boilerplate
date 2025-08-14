import type { PokemonDetail } from "../../types"

interface PokemonDetailsProps {
  pokemon: PokemonDetail
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const paddedId = `#${String(pokemon.id).padStart(4, "0")}`

  const TYPE_STYLES: Record<string, string> = {
    normal:
      "bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-200",
    fire: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
    water: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
    electric:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
    grass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    ice: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
    fighting: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
    poison:
      "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-200",
    ground:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    flying:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
    psychic: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200",
    bug: "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-200",
    rock: "bg-yellow-200 text-yellow-900 dark:bg-yellow-900/50 dark:text-yellow-100",
    ghost:
      "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
    dragon:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
    dark: "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
    steel:
      "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-200",
    fairy: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  }

  const getTypeBadgeClasses = (type: string) =>
    `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      TYPE_STYLES[type as keyof typeof TYPE_STYLES] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }`

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
              pokemon.types.map((t) => (
                <span key={t} className={getTypeBadgeClasses(t)}>
                  {t}
                </span>
              ))
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

      {pokemon.abilities && pokemon.abilities.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Abilities
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {pokemon.abilities.map((a) => (
              <span
                key={a}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {pokemon.stats && pokemon.stats.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Stats
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pokemon.stats.map((s) => (
              <div
                key={s.name}
                className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize dark:text-gray-400">
                    {s.name}
                  </span>
                  <span className="text-sm font-medium">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
