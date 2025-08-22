import type { Spell } from "../types"
import { SpellListItem } from "./SpellListItem"

interface Props {
  items: Spell[]
  loading?: boolean
}

export function SpellList({ items, loading = false }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center py-8 text-sm text-gray-600 dark:text-gray-300">
        Loading…
      </div>
    )
  }

  if (!items.length)
    return <p className="text-center text-sm text-gray-500">No spells found.</p>
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((s) => (
        <SpellListItem key={s.id + s.name} spell={s} />
      ))}
    </ul>
  )
}
