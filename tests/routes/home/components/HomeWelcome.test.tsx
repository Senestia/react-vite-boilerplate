import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HomeWelcome } from "~/routes/home/components/HomeWelcome"

describe("HomeWelcome", () => {
  it("renders welcome message", () => {
    render(<HomeWelcome />)

    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })
})
