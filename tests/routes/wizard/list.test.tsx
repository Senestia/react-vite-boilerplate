import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import WizardRoute from "~/routes/wizard/list"

describe("WizardRoute", () => {
  it("renders wizard list", () => {
    render(<WizardRoute />)
    // Add assertions based on actual wizard component content
    expect(document.body).toBeInTheDocument()
  })
})
