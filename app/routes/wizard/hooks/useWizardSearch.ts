import { useCallback, useMemo } from "react"
import { useGetAllSpellsQuery, useGetElixirsQuery } from "../slices/wizardApi"
import { useWizardState } from "./useWizardState"

export function useWizardSearch() {
  const { activeTab, filters } = useWizardState()

  // Spells query - get all spells when on spells tab
  const spellsQuery = useGetAllSpellsQuery(
    { query: filters.searchQuery },
    { skip: activeTab !== "spells" },
  )

  // Elixirs query
  const elixirsQuery = useGetElixirsQuery(
    {
      ...(filters.searchQuery && { name: filters.searchQuery }),
      ...(filters.elixirDifficulty && {
        difficulty: filters.elixirDifficulty,
      }),
    },
    { skip: activeTab !== "elixirs" },
  )

  // Filter spells by search query and type
  const filteredSpells = useMemo(() => {
    if (!spellsQuery.data) return []

    let result = spellsQuery.data

    // Filter by search query (name, incantation, or effect)
    if (filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.toLowerCase()
      result = result.filter(
        (spell) =>
          spell.name.toLowerCase().includes(searchTerm) ||
          (spell.incantation &&
            spell.incantation.toLowerCase().includes(searchTerm)) ||
          spell.effect.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by spell type if specified
    if (filters.spellType) {
      result = result.filter(
        (spell) =>
          spell.type.toString().toLowerCase() ===
          filters.spellType?.toLowerCase(),
      )
    }

    return result
  }, [spellsQuery.data, filters.searchQuery, filters.spellType])

  // Filter elixirs by search query in name or effect
  const filteredElixirs = useMemo(() => {
    if (!elixirsQuery.data) return []

    const searchTerm = filters.searchQuery.toLowerCase()
    if (!searchTerm) return elixirsQuery.data

    return elixirsQuery.data.filter(
      (elixir) =>
        elixir.name.toLowerCase().includes(searchTerm) ||
        (elixir.effect && elixir.effect.toLowerCase().includes(searchTerm)),
    )
  }, [elixirsQuery.data, filters.searchQuery])

  const getCurrentData = useCallback(() => {
    if (activeTab === "spells") return filteredSpells
    return filteredElixirs
  }, [activeTab, filteredSpells, filteredElixirs])

  const getCurrentQuery = useCallback(() => {
    if (activeTab === "spells") return spellsQuery
    return elixirsQuery
  }, [activeTab, spellsQuery, elixirsQuery])

  return {
    data: getCurrentData(),
    query: getCurrentQuery(),
    spells: filteredSpells,
    elixirs: filteredElixirs,
    isLoading:
      activeTab === "spells" ? spellsQuery.isLoading : elixirsQuery.isLoading,
    isError:
      activeTab === "spells" ? spellsQuery.isError : elixirsQuery.isError,
    error: activeTab === "spells" ? spellsQuery.error : elixirsQuery.error,
  }
}
