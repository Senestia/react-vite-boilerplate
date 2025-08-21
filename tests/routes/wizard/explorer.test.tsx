import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"
import WizardExplorerRoute from "~/routes/wizard/explorer"
import { store } from "~/shared/store"

describe("WizardExplorerRoute", () => {
  it("renders wizard explorer page", () => {
    render(
      <Provider store={store}>
        <WizardExplorerRoute />
      </Provider>,
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
