import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/layout.tsx", [
    index("routes/home/index.tsx"),
    route("/pokemon", "routes/pokemon/layout.tsx", [
      index("routes/pokemon/index.tsx"),
      route(":pokemonName", "routes/pokemon/$pokemonName/index.tsx"),
    ]),
    route("*", "routes/notFound/index.tsx"),
  ]),
] satisfies RouteConfig
