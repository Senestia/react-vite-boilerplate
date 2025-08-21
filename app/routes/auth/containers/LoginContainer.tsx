import { useAuth, useGuestGuard } from "../../../shared/hooks"
import { LoginForm } from "../components/LoginForm"

export function LoginContainer() {
  const { login, isLoading, error } = useAuth()

  // Redirect authenticated users away from login page
  useGuestGuard()

  return <LoginForm onSubmit={login} isLoading={isLoading} error={error} />
}
