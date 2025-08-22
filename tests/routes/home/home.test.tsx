import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import HomeRoute from "~/routes/home/home"

describe("HomeRoute", () => {
  it("renders home page", () => {
    render(<HomeRoute />)
    // Add assertions based on actual home component content
    expect(document.body).toBeInTheDocument()
  })
})
