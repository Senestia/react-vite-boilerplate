import { create } from "zustand"

export interface PokemonUiState {
  listLimit: number
  selectedName: string
  setListLimit: (limit: number) => void
  setSelectedName: (name: string) => void
}

export const usePokemonUiStore = create<PokemonUiState>((set) => ({
  listLimit: 12,
  selectedName: "",
  setListLimit: (limit: number) => set({ listLimit: limit }),
  setSelectedName: (name: string) => set({ selectedName: name }),
}))
