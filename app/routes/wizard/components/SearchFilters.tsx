import type { WizardFilters, WizardTab } from "../types"
import { ElixirDifficulty, SpellType } from "../types"

interface SearchFiltersProps {
  activeTab: WizardTab
  filters: WizardFilters
  onSearchQueryChange: (query: string) => void
  onSpellTypeChange: (type: string | undefined) => void
  onElixirDifficultyChange: (difficulty: string | undefined) => void
  onResetFilters: () => void
}

export function SearchFilters({
  activeTab,
  filters,
  onSearchQueryChange,
  onSpellTypeChange,
  onElixirDifficultyChange,
  onResetFilters,
}: SearchFiltersProps) {
  const spellTypes = Object.values(SpellType)
  const elixirDifficulties = Object.values(ElixirDifficulty)

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="flex-1">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Search {activeTab}
          </label>
          <input
            id="search"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder={
              activeTab === "spells"
                ? "Search spells by name, incantation, or effect..."
                : "Search elixirs..."
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Spell Type Filter */}
        {activeTab === "spells" && (
          <div className="sm:w-48">
            <label
              htmlFor="spellType"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Spell Type
            </label>
            <select
              id="spellType"
              value={filters.spellType || ""}
              onChange={(e) => onSpellTypeChange(e.target.value || undefined)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Types</option>
              {spellTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Elixir Difficulty Filter */}
        {activeTab === "elixirs" && (
          <div className="sm:w-48">
            <label
              htmlFor="elixirDifficulty"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Difficulty
            </label>
            <select
              id="elixirDifficulty"
              value={filters.elixirDifficulty || ""}
              onChange={(e) =>
                onElixirDifficultyChange(e.target.value || undefined)
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Difficulties</option>
              {elixirDifficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={onResetFilters}
            className="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
