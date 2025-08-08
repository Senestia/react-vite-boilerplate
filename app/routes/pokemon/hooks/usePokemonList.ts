import { useEffect, useState } from "react"
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
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${encodeURIComponent(
            String(limit),
          )}`,
          {
            headers: { accept: "application/json" },
          },
        )
        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`)
        }
        const data = (await response.json()) as { results: PokemonListItem[] }
        if (isActive) {
          setPokemonList(data.results)
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
