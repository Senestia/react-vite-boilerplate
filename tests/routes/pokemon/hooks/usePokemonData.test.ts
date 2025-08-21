import { renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"
import { store } from "~/shared/store"
import { usePokemonData } from "~/routes/pokemon/hooks/usePokemonData"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

describe("usePokemonData", () => {
  it("provides pokemon data functionality", () => {
    const { result } = renderHook(() => usePokemonData(), { wrapper })
    
    expect(result.current).toBeDefined()
  })
})
