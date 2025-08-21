import { beforeEach, describe, expect, it, vi } from "vitest"
import type { Route } from "~/../.react-router/types/app/routes/pokemon/+types/detail"

const { mockStore, mockPokemonApi } = vi.hoisted(() => {
  const mockStore = {
    dispatch: vi.fn(),
  }

  const mockPokemonApi = {
    endpoints: {
      getPokemonByName: {
        initiate: vi.fn(),
      },
    },
  }

  return { mockStore, mockPokemonApi }
})

vi.mock("~/shared/store", () => ({
  store: mockStore,
}))

vi.mock("~/shared/store/hooks", () => ({
  useAppDispatch: () => mockStore.dispatch,
  useAppSelector: (selector: any) => selector({ pokemonUi: { limit: 12 } }),
}))

vi.mock("react-redux", () => ({
  useDispatch: () => mockStore.dispatch,
  useSelector: (selector: any) => selector({ pokemonUi: { limit: 12 } }),
}))

vi.mock("~/routes/pokemon/slices/pokemonApi", () => ({
  pokemonApi: mockPokemonApi,
}))

vi.mock("@reduxjs/toolkit", () => ({
  configureStore: vi.fn(),
  createSlice: vi.fn(),
  createApi: vi.fn(),
  fetchBaseQuery: vi.fn(),
  setupListeners: vi.fn(),
}))

vi.mock("@reduxjs/toolkit/query/react", () => ({
  createApi: vi.fn(),
  fetchBaseQuery: vi.fn(),
}))

vi.mock("~/routes/pokemon/slices/pokemonUiSlice", () => ({
  resetPokemonList: vi.fn(),
  pokemonUiSlice: {
    reducer: vi.fn(),
    actions: {},
  },
}))

import { clientLoader } from "~/routes/pokemon/detail"

describe("pokemon/detail clientLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStore.dispatch.mockClear()
    mockPokemonApi.endpoints.getPokemonByName.initiate.mockClear()
  })

  it("throws 400 when missing name param", async () => {
    await expect(
      clientLoader({ params: {} } as Route.ClientLoaderArgs),
    ).rejects.toMatchObject({ status: 400 })
  })

  it("throws 400 when name param is empty", async () => {
    await expect(
      clientLoader({ params: { name: "" } } as Route.ClientLoaderArgs),
    ).rejects.toMatchObject({ status: 400 })
  })

  it("initiates API call with pokemon name", async () => {
    const result = await clientLoader({
      params: { name: "bulbasaur" },
    } as Route.ClientLoaderArgs)

    expect(
      mockPokemonApi.endpoints.getPokemonByName.initiate,
    ).toHaveBeenCalledWith("bulbasaur", { forceRefetch: false })
    expect(result).toBeNull()
  })
})
