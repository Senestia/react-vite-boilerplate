import { Link, Outlet } from "react-router"

export default function MainLayout() {
  return (
    <div className="container mx-auto p-4 pt-16">
      <header className="mb-6 flex items-center justify-between">
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/pokemon">Pokemon</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
