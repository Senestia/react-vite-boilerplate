interface AbilitiesSectionProps {
  abilities: string[]
}

export function AbilitiesSection({ abilities }: AbilitiesSectionProps) {
  if (!abilities || abilities.length === 0) return null
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Abilities
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {abilities.map((ability) => (
          <span
            key={ability}
            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {ability}
          </span>
        ))}
      </div>
    </div>
  )
}
