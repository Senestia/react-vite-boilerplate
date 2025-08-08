import type { Route } from "./+types/_index"
import { NotFound } from "./components/NotFound"

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "404 - Page Not Found" },
    { name: "description", content: "The requested page was not found" },
  ]
}

export default function NotFoundRoute() {
  return <NotFound />
}
