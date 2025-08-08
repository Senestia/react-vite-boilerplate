import type { Route } from "./+types/_index"
import { Welcome } from "../home/components/welcome"

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Index() {
  return <Welcome />
}
