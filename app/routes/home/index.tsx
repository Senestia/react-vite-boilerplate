import type { Route } from "./+types/index"
import { HomeWelcome } from "./components/HomeWelcome"

export function meta(_args: Route.MetaArgs) {
  // Static meta; runtime translations handled in <Layout> lang and UI strings
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function HomeRoute() {
  return <HomeWelcome />
}
