import { pokemonRepository } from "../repositories/pokemon"
import type { Route } from "./+types/_index"
import { PokemonDetailsContainer } from "./containers/PokemonDetailsContainer"

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Pokemon Details" },
    {
      name: "description",
      content: "Explore Pokemon details and examples.",
    },
  ]
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const name = params.name?.toString() ?? ""
  if (!name) {
    throw new Response("Missing pokemon name", { status: 400 })
  }
  const pokemon = await pokemonRepository.fetchPokemonByName(name)
  return { pokemon }
}

export default function Index() {
  return <PokemonDetailsContainer />
}
