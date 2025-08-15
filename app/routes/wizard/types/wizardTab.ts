export type WizardTab = "spells" | "elixirs"

export interface WizardFilters {
  spellType?: string | undefined
  elixirDifficulty?: string | undefined
  searchQuery: string
}
