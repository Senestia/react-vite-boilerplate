import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/layout.tsx", [
    index("routes/home/home.tsx"),
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/list.tsx"),
      route(":name", "routes/pokemon/detail.tsx"),
    ]),
    route("/wizard", "routes/wizard/explorer.tsx"),
    route("*", "routes/notFound/not-found.tsx"),
  ]),
] satisfies RouteConfig
