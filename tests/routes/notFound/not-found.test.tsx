import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import NotFoundRoute from "~/routes/notFound/not-found"

describe("NotFoundRoute", () => {
  it("renders 404 page", () => {
    render(
      <MemoryRouter>
        <NotFoundRoute />
      </MemoryRouter>,
    )

    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
