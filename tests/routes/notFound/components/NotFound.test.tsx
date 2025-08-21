import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { NotFound } from "~/routes/notFound/components/NotFound"

describe("NotFound", () => {
  it("renders not found message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )

    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
