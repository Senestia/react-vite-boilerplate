import { useQuery } from "@tanstack/react-query"
import { pokemonRepository } from "../repositories/pokemon"

const keys = {
  byName: (name: string) => ["pokemon", "detail", name] as const,
}

export function usePokemonDetail(name: string) {
  return useQuery({
    queryKey: keys.byName(name),
    queryFn: () => pokemonRepository.fetchPokemonByName(name),
    enabled: Boolean(name),
  })
}

export { keys as pokemonDetailKeys }
