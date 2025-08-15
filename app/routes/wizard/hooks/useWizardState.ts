import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "~/shared/store/hooks"
import {
  resetFilters,
  setActiveTab,
  setElixirDifficulty,
  setSearchQuery,
  setSpellType,
} from "../slices/wizardUiSlice"
import type { WizardTab } from "../types"

export function useWizardState() {
  const dispatch = useAppDispatch()
  const { activeTab, filters } = useAppSelector((state) => state.wizardUi)

  const setActiveTabHandler = useCallback(
    (tab: WizardTab) => {
      dispatch(setActiveTab(tab))
    },
    [dispatch],
  )

  const setSearchQueryHandler = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query))
    },
    [dispatch],
  )

  const setSpellTypeHandler = useCallback(
    (type: string | undefined) => {
      dispatch(setSpellType(type))
    },
    [dispatch],
  )

  const setElixirDifficultyHandler = useCallback(
    (difficulty: string | undefined) => {
      dispatch(setElixirDifficulty(difficulty))
    },
    [dispatch],
  )

  const resetFiltersHandler = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])

  return {
    activeTab,
    filters,
    setActiveTab: setActiveTabHandler,
    setSearchQuery: setSearchQueryHandler,
    setSpellType: setSpellTypeHandler,
    setElixirDifficulty: setElixirDifficultyHandler,
    resetFilters: resetFiltersHandler,
  }
}
