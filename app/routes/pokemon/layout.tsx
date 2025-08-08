import { useTranslation } from "react-i18next"
import {
  isRouteErrorResponse,
  NavLink,
  Outlet,
  useNavigation,
} from "react-router"
import ErrorView from "../../shared/components/ErrorView"
import type { Route } from "./+types/layout"

export default function PokemonLayout() {
  const navigation = useNavigation()
  const isPending = navigation.state === "loading"

  if (isPending) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-gray-600 dark:text-gray-300">
        Loading Pokemon…
      </div>
    )
  }

  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation()

  const title = t("error.title.error", { defaultValue: "Something went wrong" })
  let details = t("error.details.generic", {
    defaultValue: "An unexpected error occurred while loading Pokemon.",
  })

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details
  } else if (error && typeof error === "object") {
    const maybeHttpError = error as {
      status?: number | null
      message?: string
      isNetworkError?: boolean
    }

    if (maybeHttpError.isNetworkError) {
      details = t("error.details.network", {
        defaultValue:
          "Network error. Please check your connection and try again.",
      })
    } else if (
      typeof maybeHttpError?.message === "string" &&
      maybeHttpError.message
    ) {
      details = maybeHttpError.message
    }
  }

  return (
    <ErrorView
      title={title}
      details={details}
      actions={
        <NavLink
          to="/pokemon"
          className="text-sm text-blue-700 hover:underline dark:text-blue-400"
        >
          {t("error.actions.goPokemon", { defaultValue: "Go to Pokemon" })}
        </NavLink>
      }
    />
  )
}
