import { useEffect } from "react"
import { useNavigate } from "react-router"
import { isAuthenticated } from "../utils/auth"

export function useAuthGuard(redirectTo = "/login") {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(redirectTo, { replace: true })
    }
  }, [navigate, redirectTo])

  return isAuthenticated()
}

export function useGuestGuard(redirectTo = "/") {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(redirectTo, { replace: true })
    }
  }, [navigate, redirectTo])

  return !isAuthenticated()
}
