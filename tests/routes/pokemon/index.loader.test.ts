import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockFetchPokemonList } = vi.hoisted(() => ({
  mockFetchPokemonList: vi.fn(),
}))

vi.mock("~/routes/pokemon/repositories/pokemon", () => ({
  pokemonRepository: {
    fetchPokemonList: mockFetchPokemonList,
    fetchPokemonByName: vi.fn(),
  },
}))

import { clientLoader } from "~/routes/pokemon/index"

describe("pokemon/index clientLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchPokemonList.mockReset()
  })

  it("returns pokemon list from repository", async () => {
    const list = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    ]
    mockFetchPokemonList.mockResolvedValueOnce(list)

    const result = await clientLoader({} as unknown as any)

    expect(mockFetchPokemonList).toHaveBeenCalledWith(12)
    expect(result).toEqual({ pokemonList: list })
  })

  it("propagates repository errors", async () => {
    const error = new Error("network error")
    mockFetchPokemonList.mockRejectedValueOnce(error)

    await expect(clientLoader({} as unknown as any)).rejects.toBe(error)
  })
})
