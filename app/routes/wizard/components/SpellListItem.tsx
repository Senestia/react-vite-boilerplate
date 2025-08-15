import type { Spell } from "../types"

interface Props {
  spell: Spell
}

export function SpellListItem({ spell }: Props) {
  return (
    <li className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {spell.name}
          </h3>
          {spell.incantation && (
            <p className="mt-1 text-sm font-medium text-blue-600 italic dark:text-blue-400">
              &quot;{spell.incantation}&quot;
            </p>
          )}
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {spell.effect || "No effect description"}
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/40 dark:text-purple-200">
          {spell.type || "Unknown"}
        </span>
      </div>
    </li>
  )
}
