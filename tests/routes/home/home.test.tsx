import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import HomeRoute from "~/routes/home/home"
import { store } from "~/shared/store"

describe("HomeRoute", () => {
  it("renders home page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeRoute />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
