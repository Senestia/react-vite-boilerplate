import { PokemonHeader } from "../components/PokemonHeader"
import { PokemonList } from "../components/PokemonList"
import { useIntersectionObserver, usePokemonInfiniteQuery } from "../hooks"
import { usePokemonUiStore } from "../stores/uiStore"

export function PokemonExplorer() {
  const limit = usePokemonUiStore(
    (state: { listLimit: number }) => state.listLimit,
  )

  const {
    items,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonInfiniteQuery(limit)

  const sentinelRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) throw new Error("Failed to load Pokemon list")

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-10 px-4">
        <PokemonHeader />

        <section className="w-full max-w-4xl">
          <PokemonList items={items} />
          <div ref={sentinelRef} className="flex justify-center py-6">
            {isFetchingNextPage ? <p>Loading more…</p> : null}
            {!hasNextPage ? (
              <span className="text-gray-500">End of list</span>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  )
}
