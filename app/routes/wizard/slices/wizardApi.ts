import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { WIZARD_API_BASE_URL } from "~/shared/constants/endpoint"
import type { Elixir, ElixirQueryArgs, Spell } from "../types"

export const wizardApi = createApi({
  reducerPath: "wizardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: WIZARD_API_BASE_URL,
    timeout: 10000,
  }),
  tagTypes: ["Spells", "Elixirs"],
  endpoints: (builder) => ({
    getAllSpells: builder.query<Spell[], { query: string }>({
      query: () => "/spells",
      providesTags: ["Spells"],
    }),
    getSpellByName: builder.query<Spell, string>({
      query: (name) => `/spells/${encodeURIComponent(name)}`,
      providesTags: (result, error, name) => [{ type: "Spells", id: name }],
    }),
    getElixirs: builder.query<Elixir[], ElixirQueryArgs>({
      query: (args) => ({
        url: "/elixirs",
        params: {
          ...(args.name && { name: args.name }),
          ...(args.difficulty && { difficulty: args.difficulty }),
        },
      }),
      providesTags: ["Elixirs"],
    }),
  }),
})

export const {
  useGetAllSpellsQuery,
  useGetSpellByNameQuery,
  useGetElixirsQuery,
} = wizardApi
