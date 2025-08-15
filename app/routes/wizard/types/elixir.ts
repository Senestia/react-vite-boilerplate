export interface Elixir {
  id: string
  name: string
  effect?: string
  sideEffects?: string
  characteristics?: string
  time?: string
  difficulty?: ElixirDifficulty
  ingredient?: string
  inventor?: string
  manufacturer?: string
}

export enum ElixirDifficulty {
  Unknown = "Unknown",
  Beginner = "Beginner",
  Moderate = "Moderate",
  Advanced = "Advanced",
  OrdinaryWizardingLevel = "OrdinaryWizardingLevel",
}

export interface ElixirQueryArgs {
  name?: string
  difficulty?: string
}
