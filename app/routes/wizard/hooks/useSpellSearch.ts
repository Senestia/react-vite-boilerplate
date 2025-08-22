import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { wizardRepository } from "../repositories/wizard"
import type { Spell } from "../types"

const keys = {
  spells: (search: string, type: string) =>
    ["wizard", "spells", search, type] as const,
}

export function useSpellSearch(searchQuery: string, typeFilter: string) {
  const query = useQuery({
    queryKey: keys.spells(searchQuery, typeFilter),
    queryFn: () =>
      wizardRepository.searchSpells({ search: searchQuery, type: typeFilter }),
  })

  const items: Spell[] = useMemo(() => query.data ?? [], [query.data])

  const errorMessage: string | null = query.isError
    ? query.error instanceof Error
      ? query.error.message
      : "Failed to load spells"
    : null

  return {
    ...query,
    items,
    errorMessage,
  }
}

export { keys as spellSearchKeys }
