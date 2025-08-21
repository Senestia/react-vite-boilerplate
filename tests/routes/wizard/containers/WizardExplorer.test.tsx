import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"
import { WizardExplorer } from "~/routes/wizard/containers/WizardExplorer"
import { store } from "~/shared/store"

describe("WizardExplorer", () => {
  it("renders wizard explorer container", () => {
    render(
      <Provider store={store}>
        <WizardExplorer />
      </Provider>,
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
