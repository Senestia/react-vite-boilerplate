import { QueryClient } from "@tanstack/react-query"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { clientLoader } from "~/routes/pokemon/list"

describe("pokemon/list clientLoader (infinite prefetch)", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("prefetches the first page with the default limit", async () => {
    const queryClient = new QueryClient()
    const spy = vi
      .spyOn(queryClient, "prefetchInfiniteQuery")
      .mockResolvedValue()

    const loader = clientLoader(queryClient)
    const result = await loader({} as unknown as any)

    expect(spy).toHaveBeenCalledTimes(1)
    const call = spy.mock.calls[0]?.[0]
    expect(call?.queryKey).toEqual(["pokemon", "list", "infinite", 12])
    expect(call?.initialPageParam).toBe(0)
    // We can't assert specific TS-only properties on the options object at runtime
    expect(typeof call?.queryFn).toBe("function")
    expect(result).toBeNull()
  })
})
