import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { SpellList } from "../components/SpellList"
import { WizardHeader } from "../components/WizardHeader"
import { wizardRepository } from "../repositories/wizard"
import { useWizardUiStore } from "../state/uiStore"
import type { Spell } from "../types"

export function WizardExplorer() {
  const { searchQuery, typeFilter } = useWizardUiStore()

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["wizard", "spells", searchQuery, typeFilter],
    queryFn: () =>
      wizardRepository.searchSpells({ search: searchQuery, type: typeFilter }),
  })

  const { data: allSpells } = useQuery({
    queryKey: ["wizard", "spells", "all-types"],
    queryFn: () => wizardRepository.searchSpells({ pageSize: 2000 }),
    staleTime: 5 * 60 * 1000,
  })

  const items: Spell[] = useMemo(() => data ?? [], [data])

  const errorMessage: string | null = isError
    ? error instanceof Error
      ? error.message
      : "Failed to load spells"
    : null

  const types: string[] = useMemo(() => {
    const list = Array.isArray(allSpells) ? allSpells : []
    const unique = Array.from(
      new Set(
        list
          .map((s) => (typeof s.type === "string" ? s.type : ""))
          .filter((t) => t.trim().length > 0),
      ),
    )
    unique.sort((a, b) => a.localeCompare(b))
    return unique
  }, [allSpells])

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
