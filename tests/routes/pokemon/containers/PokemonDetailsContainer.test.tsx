import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { PokemonDetailsContainer } from "~/routes/pokemon/containers/PokemonDetailsContainer"
import { store } from "~/shared/store"

describe("PokemonDetailsContainer", () => {
  it("renders pokemon details container", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonDetailsContainer />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
