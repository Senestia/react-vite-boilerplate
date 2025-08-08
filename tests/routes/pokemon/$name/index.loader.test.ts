import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockFetchPokemonByName } = vi.hoisted(() => ({
  mockFetchPokemonByName: vi.fn(),
}))

vi.mock("~/routes/pokemon/repositories/pokemon", () => ({
  pokemonRepository: {
    fetchPokemonList: vi.fn(),
    fetchPokemonByName: mockFetchPokemonByName,
  },
}))

import { clientLoader } from "~/routes/pokemon/$name/index"

describe("pokemon/$name clientLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchPokemonByName.mockReset()
  })

  it("throws 400 when missing name param", async () => {
    await expect(
      clientLoader({ params: {} } as unknown as any),
    ).rejects.toMatchObject({ status: 400 })
  })

  it("returns pokemon details from repository", async () => {
    const pokemon = {
      id: 1,
      name: "bulbasaur",
      height: 7,
      weight: 69,
      imageUrl: "http://example.com/img.png",
      types: ["grass", "poison"],
    }
    mockFetchPokemonByName.mockResolvedValueOnce(pokemon)

    const result = await clientLoader({
      params: { name: "Bulbasaur" },
    } as unknown as any)

    expect(mockFetchPokemonByName).toHaveBeenCalledWith("Bulbasaur")
    expect(result).toEqual({ pokemon })
  })

  it("propagates repository errors", async () => {
    const error = new Error("boom")
    mockFetchPokemonByName.mockRejectedValueOnce(error)

    await expect(
      clientLoader({ params: { name: "mew" } } as unknown as any),
    ).rejects.toBe(error)
  })
})
