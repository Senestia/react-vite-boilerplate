import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import { store } from "../../shared/store"
import type { Route } from "./+types/_index"
import { WizardExplorer } from "./containers/WizardExplorer"
import { resetFilters } from "./slices/wizardUiSlice"

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  // Reset the wizard filters for a fresh start
  store.dispatch(resetFilters())

  // Pre-load elixirs data for when users switch to the elixirs tab
  // Note: For spells, we skip preloading as it requires a search query

  return null
}

export default function WizardRoute() {
  return <WizardExplorer />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let details = "An unexpected error occurred while loading the Wizard World."

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details
  } else if (error instanceof Error && error.message) {
    details = error.message
  }

  return <ErrorView title="Error" details={details} />
}
