import { useEffect, useState } from "react"
import { pokemonRepository } from "../repositories/pokemon"
import type { PokemonListItem } from "../types/pokemon.types"

interface UsePokemonListResult {
  isLoading: boolean
  errorMessage: string | null
  pokemonList: PokemonListItem[]
}

export function usePokemonList(limit = 12): UsePokemonListResult {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([])

  useEffect(() => {
    let isActive = true

    async function loadPokemon() {
      try {
        const results = await pokemonRepository.fetchPokemonList(limit)
        if (isActive) {
          setPokemonList(results)
        }
      } catch {
        if (isActive) {
          setErrorMessage("Could not load Pokemon. Please try again.")
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadPokemon()
    return () => {
      isActive = false
    }
  }, [limit])

  return { isLoading, errorMessage, pokemonList }
}
