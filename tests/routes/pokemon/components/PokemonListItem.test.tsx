import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { PokemonListItem } from "~/routes/pokemon/components/PokemonListItem"

describe("PokemonListItem", () => {
  it("renders name and link and image from url id", () => {
    const item = {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    }
    render(
      <MemoryRouter>
        <ul>
          <PokemonListItem pokemon={item} />
        </ul>
      </MemoryRouter>,
    )

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    const link = screen.getByRole("link", { name: /details/i })
    expect(link).toHaveAttribute("href", "/pokemon/bulbasaur")
    const img = screen.getByRole("img", { name: /bulbasaur/i })
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("/official-artwork/1.png"),
    )
  })
})
