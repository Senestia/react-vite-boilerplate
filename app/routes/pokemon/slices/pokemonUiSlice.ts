import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PokemonListItem } from "../types"

interface PokemonUiState {
  items: PokemonListItem[]
  currentOffset: number
  limit: number
  hasMore: boolean
  isLoadingMore: boolean
}

const initialState: PokemonUiState = {
  items: [],
  currentOffset: 0,
  limit: 20, // Items per page
  hasMore: true,
  isLoadingMore: false,
}

export const pokemonUiSlice = createSlice({
  name: "pokemonUi",
  initialState,
  reducers: {
    setIsLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMore = action.payload
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setInitialPokemonList: (
      state,
      action: PayloadAction<PokemonListItem[]>,
    ) => {
      state.items = action.payload
      state.currentOffset = 0
    },
    appendPokemonList: (state, action: PayloadAction<PokemonListItem[]>) => {
      state.items.push(...action.payload)
    },
    incrementOffset: (state) => {
      state.currentOffset += state.limit
    },
    resetPokemonList: (state) => {
      state.items = []
      state.currentOffset = 0
      state.hasMore = true
    },
  },
})

export const {
  setIsLoadingMore,
  setHasMore,
  setLimit,
  setInitialPokemonList,
  appendPokemonList,
  incrementOffset,
  resetPokemonList,
} = pokemonUiSlice.actions
