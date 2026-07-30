import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const linkBase =
  'px-3 py-2 text-sm font-medium tracking-wide transition-colors border-b-2'

function navClass({ isActive }) {
  return `${linkBase} ${
    isActive
      ? 'border-green text-green-dark'
      : 'border-transparent text-ink/70 hover:text-ink hover:border-line'
  }`
}

export default function Navbar() {
  const { cartCount } = useCart()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-bold text-xl tracking-tight text-ink">
            Shop<span className="text-green">Zone</span>
          </span>
        </NavLink>

        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/checkout" className={navClass}>
              Checkout
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="hidden sm:inline text-sm font-medium text-ink/70 hover:text-ink px-3 py-2"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="hidden sm:inline text-sm font-medium text-ink/70 hover:text-ink px-3 py-2"
            >
              Login
            </NavLink>
          )}

          <NavLink
            to="/cart"
            aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 bg-white hover:border-green transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-sale text-white text-[11px] font-mono font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      <nav className="sm:hidden flex items-center justify-around border-t border-line">
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>
        <NavLink to="/shop" className={navClass}>
          Shop
        </NavLink>
        <NavLink to="/contact" className={navClass}>
          Contact
        </NavLink>
        <NavLink to={isAuthenticated ? '/checkout' : '/login'} className={navClass}>
          {isAuthenticated ? 'Checkout' : 'Login'}
        </NavLink>
      </nav>
    </header>
  )
}
