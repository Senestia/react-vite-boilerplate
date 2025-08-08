import type { Route } from "./+types/_index"
import { Welcome } from "./components/welcome"

export function meta(_args: Route.MetaArgs) {
  // Static meta; runtime translations handled in <Layout> lang and UI strings
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return <Welcome />
}
