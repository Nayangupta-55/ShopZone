import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { loginAsGuest, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/checkout'

  function handleGuestLogin() {
    loginAsGuest()
    navigate(from, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto px-5 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-3">
        Account
      </p>
      <h1 className="font-display text-3xl font-bold text-ink mb-3">
        {isAuthenticated ? "You're signed in" : 'Sign in to continue'}
      </h1>
      <p className="text-ink/60 mb-8">
        {isAuthenticated
          ? 'You can head straight to checkout.'
          : "No password needed — this is a mocked flow for the sprint. Continue as a guest to unlock checkout."}
      </p>

      <div className="bg-white border border-ink/10 rounded-xl p-8 shadow-tag">
        <button
          onClick={isAuthenticated ? () => navigate('/checkout') : handleGuestLogin}
          className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-green-dark transition-colors"
        >
          {isAuthenticated ? 'Go to checkout' : 'Login as Guest'}
        </button>
      </div>
    </div>
  )
}
