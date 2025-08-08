import { Link, useParams } from "react-router"
import { PokemonDetails } from "../components/PokemonDetails"
import { usePokemonDetails } from "../hooks/usePokemonDetails"

export function PokemonDetailsContainer() {
  const { name = "" } = useParams<{ name: string }>()
  const { isLoading, errorMessage, pokemon } = usePokemonDetails(name)

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-6 px-4">
        <header className="flex w-full max-w-xl items-center justify-between">
          <h1 className="text-2xl font-semibold capitalize">{name}</h1>
          <Link
            to="/pokemon"
            className="text-sm text-blue-700 hover:underline dark:text-blue-400"
          >
            Back to list
          </Link>
        </header>

        <section className="w-full max-w-xl">
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
          {!isLoading && !errorMessage && pokemon && (
            <PokemonDetails pokemon={pokemon} />
          )}
        </section>
      </div>
    </main>
  )
}
