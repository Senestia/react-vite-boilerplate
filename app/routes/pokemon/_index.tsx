import type { Route } from "./+types/_index"
import { PokemonExplorer } from "./containers/PokemonExplorer"
import { pokemonRepository } from "./repositories/pokemon"

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Pokemon" },
    { name: "description", content: "Explore Pokemon features and examples." },
  ]
}

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  const pokemonList = await pokemonRepository.fetchPokemonList(12)
  return { pokemonList }
}

export default function Index() {
  return <PokemonExplorer />
}
