import { beforeEach, describe, expect, it, vi } from "vitest"
import type { Route } from "~/../.react-router/types/app/routes/pokemon/+types/list"

const { mockStore, mockPokemonApi, mockResetPokemonList } = vi.hoisted(() => {
  const mockStore = {
    dispatch: vi.fn(),
    getState: vi.fn(() => ({
      pokemonUi: {
        limit: 12,
      },
    })),
  }

  const mockPokemonApi = {
    endpoints: {
      getPokemonListPage: {
        initiate: vi.fn(),
      },
    },
  }

  const mockResetPokemonList = vi.fn()

  return { mockStore, mockPokemonApi, mockResetPokemonList }
})

vi.mock("~/shared/store", () => ({
  store: mockStore,
}))

vi.mock("~/shared/store/hooks", () => ({
  useAppDispatch: () => mockStore.dispatch,
  useAppSelector: (selector: any) => selector(mockStore.getState()),
}))

vi.mock("react-redux", () => ({
  useDispatch: () => mockStore.dispatch,
  useSelector: (selector: any) => selector(mockStore.getState()),
}))

vi.mock("~/routes/pokemon/slices/pokemonApi", () => ({
  pokemonApi: mockPokemonApi,
}))

vi.mock("~/routes/pokemon/slices/pokemonUiSlice", () => ({
  resetPokemonList: mockResetPokemonList,
}))

import { clientLoader } from "~/routes/pokemon/list"

describe("pokemon/list clientLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStore.dispatch.mockClear()
    mockStore.getState.mockReturnValue({
      pokemonUi: {
        limit: 12,
      },
    })
    mockPokemonApi.endpoints.getPokemonListPage.initiate.mockClear()
    mockResetPokemonList.mockClear()
  })

  it("resets pokemon list and initiates API call", async () => {
    const result = await clientLoader({} as Route.ClientLoaderArgs)

    expect(mockStore.dispatch).toHaveBeenCalledWith(mockResetPokemonList())
    expect(
      mockPokemonApi.endpoints.getPokemonListPage.initiate,
    ).toHaveBeenCalledWith({ limit: 12, offset: 0 }, { forceRefetch: false })
    expect(result).toBeNull()
  })
})
