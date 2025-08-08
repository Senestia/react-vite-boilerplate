import axios from "axios"

export interface HttpError {
  status: number | null
  code: string
  message: string
  details?: unknown
  isNetworkError: boolean
}

export function toHttpError(error: unknown): HttpError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null
    const code = error.code ?? (status ? String(status) : "ERR_HTTP")
    return {
      status,
      code,
      message: error.message || "Request failed",
      details: error.response?.data ?? error.toJSON?.() ?? undefined,
      isNetworkError: !error.response,
    }
  }

  return {
    status: null,
    code: "ERR_UNKNOWN",
    message: error instanceof Error ? error.message : "Unknown error occurred",
    details: error,
    isNetworkError: false,
  }
}
