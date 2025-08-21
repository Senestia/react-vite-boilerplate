import { renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"
import { store } from "~/shared/store"
import { useWizardSearch } from "~/routes/wizard/hooks/useWizardSearch"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

describe("useWizardSearch", () => {
  it("provides wizard search functionality", () => {
    const { result } = renderHook(() => useWizardSearch(), { wrapper })
    
    expect(result.current).toBeDefined()
  })
})
