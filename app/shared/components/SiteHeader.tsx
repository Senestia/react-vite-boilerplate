import { PrimaryNav } from "./PrimaryNav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 mb-6 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-lg font-semibold">React Router Boilerplate</div>
        <PrimaryNav />
      </div>
    </header>
  )
}
