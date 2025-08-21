import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { PokemonList } from "~/routes/pokemon/components/PokemonList"

const mockPokemon = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
]

describe("PokemonList", () => {
  it("renders list of pokemon", () => {
    render(
      <MemoryRouter>
        <PokemonList pokemon={mockPokemon} />
      </MemoryRouter>,
    )

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument()
  })
})
