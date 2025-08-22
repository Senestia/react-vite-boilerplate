import { SpellList } from "../components/SpellList"
import { WizardHeader } from "../components/WizardHeader"
import { useSpellSearch, useSpellTypes } from "../hooks"
import { useWizardUiStore } from "../stores/uiStore"

export function WizardExplorer() {
  const { searchQuery, typeFilter } = useWizardUiStore()

  const { items, isLoading, isFetching, errorMessage, refetch } =
    useSpellSearch(searchQuery, typeFilter)

  const { types } = useSpellTypes()

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-10 px-4">
        <WizardHeader types={types} />

        <section className="w-full max-w-4xl">
          {errorMessage ? (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800/40 dark:bg-red-900/30 dark:text-red-200">
              <div className="flex items-center justify-between gap-3">
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <SpellList items={items} loading={isLoading || isFetching} />
          )}
        </section>
      </div>
    </main>
  )
}
