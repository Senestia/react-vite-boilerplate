import { useLoaderData } from "react-router"
import { PokemonHeader } from "../components/PokemonHeader"
import { PokemonList } from "../components/PokemonList"
import type { PokemonListItem } from "../types/pokemon.types"

export function PokemonExplorer() {
  const { pokemonList } = useLoaderData() as { pokemonList: PokemonListItem[] }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-10 px-4">
        <PokemonHeader />

        <section className="w-full max-w-4xl">
          <PokemonList items={pokemonList} />
        </section>
      </div>
    </main>
  )
}
