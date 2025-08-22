import { Link, useParams } from "react-router"
import type { PokemonDetail } from "../../types"
import { PokemonDetails } from "../components/PokemonDetails"

export function PokemonDetailsContainer({
  pokemon,
}: {
  pokemon: PokemonDetail
}) {
  const { name = "" } = useParams<{ name: string }>()

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
          {pokemon && <PokemonDetails pokemon={pokemon} />}
        </section>
      </div>
    </main>
  )
}
