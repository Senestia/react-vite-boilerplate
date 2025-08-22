import { Outlet } from "react-router"
import { SiteHeader } from "../shared/components/SiteHeader"
import { useAuthGuard } from "../shared/hooks"

export default function AppLayout() {
  const isAuthenticated = useAuthGuard()

  if (!isAuthenticated) {
    return null // useAuthGuard handles the redirect
  }

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  )
}
