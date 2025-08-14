import { QueryClient } from "@tanstack/react-query"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { clientLoader } from "~/routes/pokemon/$name/index"

describe("pokemon/$name clientLoader (prefetch)", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("throws 400 when missing name param", async () => {
    const queryClient = new QueryClient()
    const loader = clientLoader(queryClient)
    await expect(
      loader({ params: {} } as unknown as any),
    ).rejects.toMatchObject({ status: 400 })
  })

  it("prefetches details and returns null", async () => {
    const queryClient = new QueryClient()
    const spy = vi.spyOn(queryClient, "prefetchQuery").mockResolvedValue()

    const loader = clientLoader(queryClient)
    const result = await loader({
      params: { name: "Bulbasaur" },
    } as unknown as any)

    expect(spy).toHaveBeenCalledTimes(1)
    const call = spy.mock.calls[0]?.[0]
    expect(call?.queryKey).toEqual(["pokemon", "detail", "Bulbasaur"])
    expect(typeof call?.queryFn).toBe("function")
    expect(result).toBeNull()
  })

  it("propagates repository errors", async () => {
    const queryClient = new QueryClient()
    const error = new Error("boom")
    vi.spyOn(queryClient, "prefetchQuery").mockRejectedValue(error)

    const loader = clientLoader(queryClient)
    await expect(
      loader({ params: { name: "mew" } } as unknown as any),
    ).rejects.toBe(error)
  })
})
