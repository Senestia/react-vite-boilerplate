import type { Spell } from "../types"

interface SpellCardProps {
  spell: Spell
}

export function SpellCard({ spell }: SpellCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {spell.name}
        </h3>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {spell.type}
        </span>
      </div>

      {spell.incantation && (
        <p className="mb-2 text-sm text-gray-600 italic dark:text-gray-400">
          "{spell.incantation}"
        </p>
      )}

      <p className="mb-4 text-gray-700 dark:text-gray-300">{spell.effect}</p>

      <div className="flex flex-wrap gap-2">
        {spell.light !== "None" && (
          <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Light: {spell.light}
          </span>
        )}

        {spell.canBeVerbal !== undefined && (
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
              spell.canBeVerbal
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {spell.canBeVerbal ? "Verbal" : "Non-verbal"}
          </span>
        )}

        {spell.creator && (
          <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Creator: {spell.creator}
          </span>
        )}
      </div>
    </div>
  )
}
