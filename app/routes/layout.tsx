import { Outlet } from "react-router"
import { SiteHeader } from "../shared/components/SiteHeader"

export default function AppLayout() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  )
}
