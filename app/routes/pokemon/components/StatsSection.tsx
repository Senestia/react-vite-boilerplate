interface StatItem {
  name: string
  value: number
}

interface StatsSectionProps {
  stats: StatItem[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  if (!stats || stats.length === 0) return null
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Stats
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((s) => (
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
  )
}
