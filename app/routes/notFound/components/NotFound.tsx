import { useTranslation } from "react-i18next"
import { Link } from "react-router"

export function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 pt-16 pb-8">
      <section className="mx-auto max-w-xl text-center">
        <h1 className="mb-2 text-6xl font-bold tracking-tight">
          {t("error.title.404")}
        </h1>
        <p className="mb-8 text-balance text-gray-700 dark:text-gray-300">
          {t("error.details.404")}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
          >
            {t("error.actions.goHome", { defaultValue: "Go Home" })}
          </Link>
        </div>
      </section>
    </main>
  )
}
