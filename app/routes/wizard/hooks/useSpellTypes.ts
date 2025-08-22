import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { wizardRepository } from "../repositories/wizard"

const keys = {
  spellsAllTypes: () => ["wizard", "spells", "all-types"] as const,
}

export function useSpellTypes() {
  const query = useQuery({
    queryKey: keys.spellsAllTypes(),
    queryFn: () => wizardRepository.searchSpells({ pageSize: 2000 }),
    staleTime: 5 * 60 * 1000,
  })

  const types: string[] = useMemo(() => {
    const list = Array.isArray(query.data) ? query.data : []
    const unique = Array.from(
      new Set(
        list
          .map((s) => (typeof s.type === "string" ? s.type : ""))
          .filter((t) => t.trim().length > 0),
      ),
    )
    unique.sort((a, b) => a.localeCompare(b))
    return unique
  }, [query.data])

  return {
    ...query,
    types,
  }
}

export { keys as spellTypesKeys }
