import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { SpellCard } from "~/routes/wizard/components/SpellCard"

const mockSpell = {
  id: "1",
  name: "Fireball",
  description: "Deals fire damage",
  level: 3,
  school: "evocation",
}

describe("SpellCard", () => {
  it("renders spell card", () => {
    render(<SpellCard spell={mockSpell} />)

    expect(screen.getByText(/fireball/i)).toBeInTheDocument()
  })
})
