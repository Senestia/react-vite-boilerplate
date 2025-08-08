import { NavLink } from "react-router"

interface NavItem {
  to: string
  label: string
  end?: boolean
}

export function PrimaryNav() {
  const navItems: NavItem[] = [
    { to: "/", label: "Home", end: true },
    { to: "/pokemon", label: "Pokemon" },
  ]

  return (
    <nav aria-label="Primary">
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
    </nav>
  )
}
