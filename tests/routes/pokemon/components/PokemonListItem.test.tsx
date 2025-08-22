import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { PokemonListItem } from "~/routes/pokemon/components/PokemonListItem"

describe("PokemonListItem", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  }

  it("renders pokemon name correctly", () => {
    render(<PokemonListItem pokemon={mockPokemon} />)
    expect(screen.getByText("bulbasaur")).toBeInTheDocument()
  })

  it("renders as a link to pokemon detail", () => {
    render(<PokemonListItem pokemon={mockPokemon} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/pokemon/bulbasaur")
  })
})
