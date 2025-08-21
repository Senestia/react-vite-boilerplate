import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { PokemonDetails } from "~/routes/pokemon/components/PokemonDetails"

const mockPokemon = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  types: ["grass", "poison"],
}

describe("PokemonDetails", () => {
  it("renders pokemon details", () => {
    render(<PokemonDetails pokemon={mockPokemon} />)

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    expect(screen.getByText(/grass/i)).toBeInTheDocument()
    expect(screen.getByText(/poison/i)).toBeInTheDocument()
  })
})
