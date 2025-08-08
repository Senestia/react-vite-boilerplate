import type { Route } from "./+types/_index"
import { PokemonExplorer } from "./containers/PokemonExplorer"

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Pokemon" },
    { name: "description", content: "Explore Pokemon features and examples." },
  ]
}

export default function Index() {
  return <PokemonExplorer />
}
