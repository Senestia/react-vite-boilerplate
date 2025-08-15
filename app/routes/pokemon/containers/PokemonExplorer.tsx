import { PokemonHeader } from "../components/PokemonHeader"
import { PokemonList } from "../components/PokemonList"
import { useInfiniteScroll } from "../hooks"

export function PokemonExplorer() {
  const { items, isLoading, isLoadingMore, hasMore, error, sentinelRef } =
    useInfiniteScroll()

  if (error) {
    throw error
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-10 px-4">
        <PokemonHeader />

        <section className="w-full max-w-4xl">
          <PokemonList
            items={items}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
          <div
            ref={sentinelRef}
            className="flex justify-center py-6"
            aria-hidden="true"
          >
            {isLoadingMore ? (
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Loading more Pokemon…
              </span>
            ) : null}
            {!hasMore && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                You&apos;ve seen all the Pokemon!
              </span>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
