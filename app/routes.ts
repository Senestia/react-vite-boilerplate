import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/_layout.tsx", [
    index("routes/home/_index.tsx"),
    route("/pokemon", "routes/pokemon/_index.tsx"),
    route("*", "routes/notFound/_index.tsx"),
  ]),
] satisfies RouteConfig
