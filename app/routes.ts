import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  // Public login route (no layout)
  route("/login", "routes/login/_index.tsx"),

  // Protected routes with layout
  layout("routes/layout.tsx", [
    index("routes/home/_index.tsx"),
    route("/wizard", "routes/wizard/_index.tsx"),
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/_index.tsx"),
      route(":name", "routes/pokemon/$name/_index.tsx"),
    ]),
    route("*", "routes/notFound/_index.tsx"),
  ]),
] satisfies RouteConfig
