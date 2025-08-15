import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "~/shared/store/hooks"
import { useGetPokemonListPageQuery } from "../slices/pokemonApi"
import {
  appendPokemonList,
  incrementOffset,
  resetPokemonList,
  setHasMore,
  setInitialPokemonList,
  setIsLoadingMore,
} from "../slices/pokemonUiSlice"

export function usePokemonData() {
  const dispatch = useAppDispatch()

  const pokemonState = useAppSelector((state) => state.pokemonUi)
  const { items, currentOffset, limit, hasMore, isLoadingMore } = pokemonState

  // Fetch initial data
  const {
    data: initialData,
    error: initialError,
    isLoading: isInitialLoading,
  } = useGetPokemonListPageQuery(
    { limit, offset: 0 },
    { skip: currentOffset > 0 },
  )

  // Fetch additional pages for infinite scroll
  const {
    data: moreData,
    error: moreError,
    isLoading: isLoadingMoreData,
  } = useGetPokemonListPageQuery(
    { limit, offset: currentOffset },
    { skip: currentOffset === 0 },
  )

  // Handle initial data loading
  useEffect(() => {
    if (initialData && currentOffset === 0) {
      dispatch(setInitialPokemonList(initialData.data))
      dispatch(setHasMore(initialData.hasMore))
    }
  }, [initialData, currentOffset, dispatch])

  // Handle additional data loading
  useEffect(() => {
    if (moreData && currentOffset > 0) {
      dispatch(appendPokemonList(moreData.data))
      dispatch(setHasMore(moreData.hasMore))
      dispatch(setIsLoadingMore(false))
    }
  }, [moreData, currentOffset, dispatch])

  // Handle loading states
  useEffect(() => {
    dispatch(setIsLoadingMore(isLoadingMoreData))
  }, [isLoadingMoreData, dispatch])

  const loadNextPage = useCallback(() => {
    if (hasMore && !isLoadingMore && !isLoadingMoreData) {
      dispatch(incrementOffset())
    }
  }, [hasMore, isLoadingMore, isLoadingMoreData, dispatch])

  const resetData = useCallback(() => {
    dispatch(resetPokemonList())
  }, [dispatch])

  const error = initialError || moreError

  return {
    items,
    isLoading: isInitialLoading,
    isLoadingMore,
    hasMore,
    error,
    loadNextPage,
    resetData,
  }
}
