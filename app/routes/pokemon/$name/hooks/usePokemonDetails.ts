import { useEffect, useState } from "react"
import { pokemonRepository } from "../../repositories/pokemon"
import type { PokemonDetail } from "../../types/pokemon.types"

interface UsePokemonDetailsResult {
  isLoading: boolean
  errorMessage: string | null
  pokemon: PokemonDetail | null
}

export function usePokemonDetails(name: string): UsePokemonDetailsResult {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadPokemon() {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const result = await pokemonRepository.fetchPokemonByName(name)
        if (isActive) {
          setPokemon(result)
        }
      } catch {
        if (isActive) {
          setErrorMessage("Could not load Pokemon details. Please try again.")
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (name) {
      loadPokemon()
    } else {
      setIsLoading(false)
      setPokemon(null)
      setErrorMessage("Pokemon name is missing")
    }

    return () => {
      isActive = false
    }
  }, [name])

  return { isLoading, errorMessage, pokemon }
}
