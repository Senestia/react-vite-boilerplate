import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { PokemonHeader } from "~/routes/pokemon/components/PokemonHeader"

describe("PokemonHeader", () => {
  it("renders pokemon header", () => {
    render(<PokemonHeader />)

    expect(screen.getByRole("heading")).toBeInTheDocument()
  })
})
