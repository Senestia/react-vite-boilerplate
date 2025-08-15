import ErrorView from "~/shared/components/ErrorView"
import { ElixirCard } from "../components/ElixirCard"
import { SearchFilters } from "../components/SearchFilters"
import { SpellCard } from "../components/SpellCard"
import { WizardTabs } from "../components/WizardTabs"
import { useWizardSearch } from "../hooks/useWizardSearch"
import { useWizardState } from "../hooks/useWizardState"

export function WizardExplorer() {
  const {
    activeTab,
    filters,
    setActiveTab,
    setSearchQuery,
    setSpellType,
    setElixirDifficulty,
    resetFilters,
  } = useWizardState()

  const { data, spells, elixirs, isLoading, isError, error } = useWizardSearch()

  if (isError) {
    return (
      <ErrorView
        title="Error loading wizard data"
        details={error?.toString() || "An unexpected error occurred"}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Wizard World Explorer
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Discover magical spells and powerful elixirs from the wizarding
            world
          </p>
        </div>

        {/* Tabs */}
        <WizardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Search and Filters */}
        <div className="mt-6">
          <SearchFilters
            activeTab={activeTab}
            filters={filters}
            onSearchQueryChange={setSearchQuery}
            onSpellTypeChange={setSpellType}
            onElixirDifficultyChange={setElixirDifficulty}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading {activeTab}...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && data.length === 0 && filters.searchQuery && (
          <div className="py-12 text-center">
            <div className="text-lg text-gray-500 dark:text-gray-400">
              No {activeTab} found matching your search criteria
            </div>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && data.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeTab === "spells"
              ? spells.map((spell) => (
                  <SpellCard key={spell.id} spell={spell} />
                ))
              : elixirs.map((elixir) => (
                  <ElixirCard key={elixir.id} elixir={elixir} />
                ))}
          </div>
        )}

        {/* Results Count */}
        {!isLoading && data.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Showing {data.length} {activeTab}
          </div>
        )}
      </div>
    </div>
  )
}
