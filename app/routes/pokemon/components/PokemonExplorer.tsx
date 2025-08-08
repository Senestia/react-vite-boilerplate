import { usePokemonList } from "../../../hooks/usePokemonList"
import { PokemonHeader } from "./PokemonHeader"
import { PokemonList } from "./PokemonList"

export function PokemonExplorer() {
  const { isLoading, errorMessage, pokemonList } = usePokemonList()

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-10 px-4">
        <PokemonHeader />

        <section className="w-full max-w-4xl">
          {isLoading && (
            <div className="rounded-2xl border border-gray-200 p-6 text-center dark:border-gray-700">
              Loading...
            </div>
          )}
          {!isLoading && errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {errorMessage}
            </div>
          )}
          {!isLoading && !errorMessage && <PokemonList items={pokemonList} />}
        </section>
      </div>
    </main>
  )
}
