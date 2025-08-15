import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  PokemonDetail,
  PokemonListPage,
  PokemonListQueryArgs,
  PokemonListResponse,
  RawPokemonDetailApiResponse,
} from "~/routes/pokemon/types"
import { POKEMON_API_BASE_URL } from "~/shared/constants/endpoint"

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: POKEMON_API_BASE_URL,
    timeout: 10000,
  }),
  tagTypes: ["Pokemon", "PokemonList"],
  endpoints: (builder) => ({
    getPokemonListPage: builder.query<PokemonListPage, PokemonListQueryArgs>({
      query: ({ limit, offset }) => ({
        url: "/pokemon",
        params: { limit, offset },
      }),
      transformResponse: (
        response: PokemonListResponse,
        _meta,
        args,
      ): PokemonListPage => {
        const hasMore = response.next !== null
        const nextOffset = hasMore ? args.offset + args.limit : null

        return {
          data: response.results,
          hasMore,
          nextOffset,
          totalCount: response.count,
        }
      },
      providesTags: (result, error, args) => [
        { type: "PokemonList", id: `${args.limit}-${args.offset}` },
      ],
    }),
    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `/pokemon/${encodeURIComponent(name.toLowerCase())}`,
      transformResponse: (
        response: RawPokemonDetailApiResponse,
      ): PokemonDetail => {
        const types: string[] = (response.types ?? [])
          .map((entry) => entry.type?.name)
          .filter((t): t is string => Boolean(t))

        return {
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          imageUrl: response.sprites?.front_default ?? null,
          types,
        }
      },
      providesTags: (result, error, name) => [{ type: "Pokemon", id: name }],
    }),
  }),
})

export const { useGetPokemonListPageQuery, useGetPokemonByNameQuery } =
  pokemonApi
