const AUTH_TOKEN_KEY = "auth_token"

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${AUTH_TOKEN_KEY}=`))
      ?.split("=")[1] || null
  )
}

export function setAuthToken(token: string): void {
  if (typeof document === "undefined") return
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=lax`
}

export function removeAuthToken(): void {
  if (typeof document === "undefined") return
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0`
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken())
}
