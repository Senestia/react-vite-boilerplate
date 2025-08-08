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

export default function Index() {
  return <PokemonDetailsContainer />
}
