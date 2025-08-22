import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import type { LoginRequest } from "../../routes/login/types"
import { authRepository } from "../repositories/auth"
import { isAuthenticated, removeAuthToken, setAuthToken } from "../utils/auth"

export function useAuth() {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: authRepository.login,
    onSuccess: (data) => {
      setAuthToken(data.token)
      navigate("/")
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })

  const logout = () => {
    removeAuthToken()
    navigate("/login")
  }

  const checkAuth = () => {
    return isAuthenticated()
  }

  return {
    login: (credentials: LoginRequest) => loginMutation.mutate(credentials),
    logout,
    checkAuth,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isAuthenticated: isAuthenticated(),
  }
}
