import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

function createQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        // Keep side-effects minimal; surface errors via boundaries/UI
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(error))
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(error))
      },
    }),
  })
}

export const queryClient: QueryClient = createQueryClient()
