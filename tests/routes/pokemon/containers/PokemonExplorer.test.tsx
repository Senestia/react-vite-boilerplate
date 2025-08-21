import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { PokemonExplorer } from "~/routes/pokemon/containers/PokemonExplorer"
import { store } from "~/shared/store"

describe("PokemonExplorer", () => {
  it("renders pokemon explorer container", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonExplorer />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
