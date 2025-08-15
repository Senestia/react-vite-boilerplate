import { useCallback, useState } from "react"
import { useWizardUiStore } from "../state/uiStore"

interface Props {
  types: string[]
}

export function WizardHeader({ types }: Props) {
  const { searchQuery, typeFilter, setSearchQuery, setTypeFilter } =
    useWizardUiStore()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setSearchQuery(localSearch)
    },
    [localSearch, setSearchQuery],
  )

  return (
    <header className="flex w-full max-w-4xl flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Wizard Spells</h1>
      <form
        onSubmit={onSubmit}
        className="flex w-full items-center gap-2 rounded-lg bg-white p-3 shadow dark:bg-gray-800"
      >
        <input
          type="search"
          placeholder="Search spells by name..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        <select
          className="rounded-md border border-gray-300 px-2 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {["", ...types].map((t) => (
            <option key={t} value={t}>
              {t || "All types"}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"
        >
          Search
        </button>
      </form>
    </header>
  )
}
