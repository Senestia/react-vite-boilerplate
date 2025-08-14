interface TypeBadgeProps {
  name: string
}

const TYPE_STYLES: Record<string, string> = {
  normal:
    "bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-200",
  fire: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
  water: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  electric:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
  grass:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  ice: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
  fighting: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  poison:
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-200",
  ground:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  flying:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
  psychic: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200",
  bug: "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-200",
  rock: "bg-yellow-200 text-yellow-900 dark:bg-yellow-900/50 dark:text-yellow-100",
  ghost:
    "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
  dragon:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
  dark: "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
  steel: "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-200",
  fairy: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
}

export function TypeBadge({ name }: TypeBadgeProps) {
  const classes = `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
    TYPE_STYLES[name] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }`
  return <span className={classes}>{name}</span>
}
