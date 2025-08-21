import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import PokemonLayout from "~/routes/pokemon/layout"

describe("PokemonLayout", () => {
  it("renders pokemon layout", () => {
    render(
      <MemoryRouter>
        <PokemonLayout />
      </MemoryRouter>,
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
