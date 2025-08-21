import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { SearchFilters } from "~/routes/wizard/components/SearchFilters"

describe("SearchFilters", () => {
  it("renders search filters", () => {
    render(<SearchFilters />)

    expect(screen.getByRole("search")).toBeInTheDocument()
  })
})
