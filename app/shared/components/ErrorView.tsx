import type { ReactNode } from "react"
export interface ErrorViewProps {
  title: string
  details: string
  stack?: string | undefined
  actions?: ReactNode
}

export default function ErrorView({
  title,
  details,
  stack,
  actions,
}: ErrorViewProps) {
  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{title}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
      {actions && (
        <div className="mt-4 flex justify-center gap-3">{actions}</div>
      )}
    </main>
  )
}
