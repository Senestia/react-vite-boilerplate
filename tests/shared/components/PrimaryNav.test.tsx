import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { PrimaryNav } from "~/shared/components/PrimaryNav"

describe("PrimaryNav", () => {
  it("renders Home and Pokemon links", () => {
    render(
      <MemoryRouter>
        <PrimaryNav />
      </MemoryRouter>,
    )

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /pokemon/i })).toBeInTheDocument()
  })
})
