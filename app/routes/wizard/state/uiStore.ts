import { create } from "zustand"

export interface WizardUiState {
  searchQuery: string
  typeFilter: string
  setSearchQuery: (q: string) => void
  setTypeFilter: (t: string) => void
}

export const useWizardUiStore = create<WizardUiState>((set) => ({
  searchQuery: "",
  typeFilter: "",
  setSearchQuery: (q: string) => set({ searchQuery: q }),
  setTypeFilter: (t: string) => set({ typeFilter: t }),
}))
