import { QueryClient } from "@tanstack/react-query"
import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import type { Route } from "./+types/list"
import { WizardExplorer } from "./containers/WizardExplorer"
import { spellTypesKeys } from "./hooks"
import { wizardRepository } from "./repositories/wizard"

export const clientLoader =
  (queryClient: QueryClient) => async (_args: Route.ClientLoaderArgs) => {
    // Prefetch a large page of spells without type filter for deriving all types
    await queryClient.prefetchQuery({
      queryKey: spellTypesKeys.spellsAllTypes(),
      queryFn: () => wizardRepository.searchSpells({ pageSize: 2000 }),
      staleTime: 5 * 60 * 1000,
    })
    return null
  }

export default function WizardListRoute() {
  return <WizardExplorer />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let details = "An unexpected error occurred while loading spells."

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details
  } else if (error instanceof Error && error.message) {
    details = error.message
  }

  return <ErrorView title="Error" details={details} />
}
