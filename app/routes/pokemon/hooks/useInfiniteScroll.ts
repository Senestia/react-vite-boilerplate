import { useIntersectionObserver } from "./useIntersectionObserver"
import { usePokemonData } from "./usePokemonData"

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions = {}) {
  const { threshold = 0.1, rootMargin = "100px" } = options

  const pokemonData = usePokemonData()
  const { loadNextPage } = pokemonData

  const { sentinelRef } = useIntersectionObserver({
    threshold,
    rootMargin,
    onIntersect: loadNextPage,
  })

  return {
    ...pokemonData,
    sentinelRef,
  }
}
