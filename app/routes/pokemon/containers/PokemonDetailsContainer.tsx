import { Link } from "react-router"
import { PokemonDetails } from "../components/PokemonDetails"
import { usePokemonDetail } from "../hooks"

export function PokemonDetailsContainer() {
  const { pokemon, pokemonName, error, isLoading } = usePokemonDetail()

  if (error) {
    throw error
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-6 px-4">
        <header className="flex w-full max-w-xl items-center justify-between">
          <h1 className="text-2xl font-semibold capitalize">{pokemonName}</h1>
          <Link
            to="/pokemon"
            className="text-sm text-blue-700 hover:underline dark:text-blue-400"
          >
            Back to list
          </Link>
        </header>

        <section className="w-full max-w-xl">
          {isLoading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Loading Pokemon details...
              </div>
            </div>
          ) : pokemon ? (
            <PokemonDetails pokemon={pokemon} />
          ) : null}
        </section>
      </div>
    </main>
  )
}
