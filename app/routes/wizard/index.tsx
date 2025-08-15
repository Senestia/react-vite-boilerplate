import { QueryClient } from "@tanstack/react-query"
import { isRouteErrorResponse } from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import type { Route } from "./+types/index"
import { WizardExplorer } from "./containers/WizardExplorer"
import { wizardRepository } from "./repositories/wizard"
import { useWizardUiStore } from "./state/uiStore"

const keys = {
  spells: (search: string, type: string) =>
    ["wizard", "spells", search, type] as const,
  spellsAllTypes: () => ["wizard", "spells", "all-types"] as const,
}

export const clientLoader =
  (queryClient: QueryClient) => async (_args: Route.ClientLoaderArgs) => {
    const { searchQuery, typeFilter } = useWizardUiStore.getState()
    // Prefetch a large page of spells without type filter for deriving all types
    await queryClient.prefetchQuery({
      queryKey: keys.spellsAllTypes(),
      queryFn: () => wizardRepository.searchSpells({ pageSize: 2000 }),
      staleTime: 5 * 60 * 1000,
    })
    if (searchQuery.trim().length > 0) {
      await queryClient.prefetchQuery({
        queryKey: keys.spells(searchQuery, typeFilter),
        queryFn: () =>
          wizardRepository.searchSpells({
            search: searchQuery,
            type: typeFilter,
          }),
        staleTime: 60 * 1000,
      })
    }
    return null
  }

export default function WizardRoute() {
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
