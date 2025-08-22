import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  // Public auth routes (no layout)
  route("/login", "routes/auth/login.tsx"),

  // Protected routes with layout
  layout("routes/layout.tsx", [
    index("routes/home/home.tsx"),
    route("/wizard", "routes/wizard/list.tsx"),
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/list.tsx"),
      route(":name", "routes/pokemon/detail.tsx"),
    ]),
    route("*", "routes/not-found/not-found.tsx"),
  ]),
] satisfies RouteConfig
