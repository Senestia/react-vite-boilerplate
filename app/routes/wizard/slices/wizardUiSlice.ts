import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { WizardFilters, WizardTab } from "../types"

interface WizardUiState {
  activeTab: WizardTab
  filters: WizardFilters
}

const initialState: WizardUiState = {
  activeTab: "spells",
  filters: {
    searchQuery: "",
  },
}

export const wizardUiSlice = createSlice({
  name: "wizardUi",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<WizardTab>) => {
      state.activeTab = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload
    },
    setSpellType: (state, action: PayloadAction<string | undefined>) => {
      state.filters.spellType = action.payload
    },
    setElixirDifficulty: (state, action: PayloadAction<string | undefined>) => {
      state.filters.elixirDifficulty = action.payload
    },
    resetFilters: (state) => {
      state.filters = {
        searchQuery: "",
      }
    },
  },
})

export const {
  setActiveTab,
  setSearchQuery,
  setSpellType,
  setElixirDifficulty,
  resetFilters,
} = wizardUiSlice.actions
