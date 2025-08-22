import { QueryClientProvider } from "@tanstack/react-query"
import { I18nextProvider, useTranslation } from "react-i18next"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import type { Route } from "./+types/root"
import ErrorView from "./shared/components/ErrorView"
import i18n from "./shared/utils/i18n"
import { queryClient } from "./shared/utils/queryClient"
import "./styles/app.css"

export const meta: Route.MetaFunction = () => [
  { name: "robots", content: "noindex,nofollow" },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return <div>Loading…</div>
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation()
  let message = t("error.title.generic")
  let details = t("error.details.generic")
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? t("error.title.404") : t("error.title.error")
    details =
      error.status === 404
        ? t("error.details.404")
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    const { message, stack: errorStack } = error
    details = message
    stack = errorStack
  }

  return stack !== undefined ? (
    <ErrorView title={message} details={details} stack={stack} />
  ) : (
    <ErrorView title={message} details={details} />
  )
}
