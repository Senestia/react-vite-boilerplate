import type { LoginRequest, LoginResponse } from "../../routes/login/types"

// Mock delay to simulate real API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user database
const MOCK_USERS = [
  { id: "1", email: "user@example.com", name: "John Doe" },
  { id: "2", email: "admin@example.com", name: "Admin User" },
]

export const authRepository = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await delay(800) // Simulate network delay

    // Mock: Accept any email/password combination
    const user = MOCK_USERS.find((u) => u.email === credentials.email) || {
      id: Math.random().toString(36).substring(7),
      email: credentials.email,
      name: credentials.email.split("@")[0] || "User",
    }

    // Generate a mock JWT-like token
    const mockToken = `mock_jwt_${user.id}_${Date.now()}`

    return {
      token: mockToken,
      user,
    }
  },

  async validateToken(token: string): Promise<boolean> {
    await delay(200)
    // Mock validation: accept any token that starts with 'mock_jwt_'
    return token.startsWith("mock_jwt_")
  },

  async refreshToken(token: string): Promise<string> {
    await delay(300)
    if (!token.startsWith("mock_jwt_")) {
      throw new Error("Invalid token")
    }

    const userId = token.split("_")[2]
    return `mock_jwt_${userId}_${Date.now()}`
  },
}
