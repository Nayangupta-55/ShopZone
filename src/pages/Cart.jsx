import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <p className="font-display text-2xl font-semibold text-ink mb-2">
          Your cart is empty.
        </p>
        <p className="text-ink/60 mb-6">Add something from the shop to see it here.</p>
        <Link
          to="/shop"
          className="inline-flex bg-ink text-paper font-medium px-5 py-2.5 rounded-md hover:bg-green-dark transition-colors"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-2">
        Order summary
      </p>
      <h1 className="font-display text-3xl font-bold text-ink mb-8">Your Cart</h1>

      <div className="bg-white border border-ink/10 rounded-xl overflow-hidden shadow-tag">
        <div className="p-6 space-y-5">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md bg-paper border border-ink/10 flex items-center justify-center shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink truncate">{item.title}</p>
                <p className="font-mono text-sm text-muted">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center border border-ink/15 rounded-md">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-8 h-8 text-ink/70 hover:text-ink"
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  &minus;
                </button>
                <span className="w-7 text-center font-mono text-sm">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-8 h-8 text-ink/70 hover:text-ink"
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
              </div>
              <p className="font-mono text-sm font-semibold w-16 text-right">
                ${(item.price * item.qty).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.title} from cart`}
                className="text-ink/40 hover:text-sale text-sm"
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>

        <div className="perf-edge" aria-hidden="true" />

        <div className="p-6 pt-4 dash-rule">
          <div className="flex justify-between items-center pt-4">
            <span className="font-display font-semibold text-lg text-ink">Total</span>
            <span className="font-mono text-2xl font-bold text-green-dark">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-5 w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-green-dark transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
