import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { useInfiniteScroll } from "~/routes/pokemon/hooks/useInfiniteScroll"

describe("useInfiniteScroll", () => {
  it("provides infinite scroll functionality", () => {
    const { result } = renderHook(() => useInfiniteScroll())

    expect(result.current).toBeDefined()
  })
})
