import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { pokemonRepository } from "../repositories/pokemon"
import type { PokemonListItem } from "../types"

export function usePokemonInfiniteQuery(limit: number) {
  const query = useInfiniteQuery({
    queryKey: ["pokemon", "list", "infinite", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      pokemonRepository.fetchPokemonListPage({ limit, offset: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
  })

  const items: PokemonListItem[] = useMemo(() => {
    if (!query.data) return []
    return query.data.pages.flatMap((p) => p.items)
  }, [query.data])

  return {
    ...query,
    items,
  }
}
