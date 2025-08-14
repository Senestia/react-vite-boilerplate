import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useRef } from "react"
import { PokemonHeader } from "../components/PokemonHeader"
import { PokemonList } from "../components/PokemonList"
import { pokemonRepository } from "../repositories/pokemon"
import { usePokemonUiStore } from "../state/uiStore"
import type { PokemonListItem } from "../types"

export function PokemonExplorer() {
  const limit = usePokemonUiStore(
    (state: { listLimit: number }) => state.listLimit,
  )

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon", "list", "infinite", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      pokemonRepository.fetchPokemonListPage({ limit, offset: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
  })

  const items: PokemonListItem[] = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((p) => p.items)
  }, [data])

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!sentinelRef.current) return
    if (!hasNextPage) return
    const element = sentinelRef.current
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) return <p>Loading...</p>
  if (isError) throw new Error("Failed to load Pokemon list")

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-10 px-4">
        <PokemonHeader />

        <section className="w-full max-w-4xl">
          <PokemonList items={items} />
          <div ref={sentinelRef} className="flex justify-center py-6">
            {isFetchingNextPage ? <span>Loading more…</span> : null}
            {!hasNextPage ? (
              <span className="text-gray-500">End of list</span>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  )
}
