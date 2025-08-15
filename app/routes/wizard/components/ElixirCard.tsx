import type { Elixir } from "../types"

interface ElixirCardProps {
  elixir: Elixir
}

export function ElixirCard({ elixir }: ElixirCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {elixir.name}
        </h3>
        {elixir.difficulty && (
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {elixir.difficulty}
          </span>
        )}
      </div>

      {elixir.effect && (
        <p className="mb-4 text-gray-700 dark:text-gray-300">{elixir.effect}</p>
      )}

      <div className="space-y-3">
        {elixir.sideEffects && (
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Side Effects:
            </span>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {elixir.sideEffects}
            </p>
          </div>
        )}

        {elixir.characteristics && (
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Characteristics:
            </span>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {elixir.characteristics}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {elixir.time && (
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Time: {elixir.time}
            </span>
          )}

          {elixir.ingredient && (
            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Ingredient: {elixir.ingredient}
            </span>
          )}

          {elixir.inventor && (
            <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Inventor: {elixir.inventor}
            </span>
          )}

          {elixir.manufacturer && (
            <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              Manufacturer: {elixir.manufacturer}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
