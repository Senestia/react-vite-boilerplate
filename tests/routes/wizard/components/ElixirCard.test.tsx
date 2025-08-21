import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ElixirCard } from "~/routes/wizard/components/ElixirCard"

const mockElixir = {
  id: "1",
  name: "Health Potion",
  description: "Restores health",
  rarity: "common" as const,
}

describe("ElixirCard", () => {
  it("renders elixir card", () => {
    render(<ElixirCard elixir={mockElixir} />)

    expect(screen.getByText(/health potion/i)).toBeInTheDocument()
  })
})
