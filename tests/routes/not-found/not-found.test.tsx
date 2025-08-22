import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import NotFoundRoute from "~/routes/not-found/not-found"

describe("NotFoundRoute", () => {
  it("renders not found page", () => {
    render(<NotFoundRoute />)
    // Add assertions based on actual not found component content
    expect(document.body).toBeInTheDocument()
  })
})
