import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { useIntersectionObserver } from "~/routes/pokemon/hooks/useIntersectionObserver"

describe("useIntersectionObserver", () => {
  it("provides intersection observer functionality", () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current).toBeDefined()
  })
})
