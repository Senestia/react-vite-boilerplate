import { NavLink } from "react-router"
import { useAuth } from "../hooks"

interface NavItem {
  to: string
  label: string
  end?: boolean
}

export function PrimaryNav() {
  const { isAuthenticated, logout } = useAuth()

  const navItems: NavItem[] = [
    { to: "/", label: "Home", end: true },
    { to: "/pokemon", label: "Pokemon" },
    { to: "/wizard", label: "Wizard" },
  ]

  return (
    <nav aria-label="Primary">
      <div className="flex items-center gap-4">
        <ul className="flex gap-2 sm:gap-3">
          {navItems.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={Boolean(end)}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-400",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-red-700 dark:text-gray-200 dark:hover:text-red-400"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-400"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
