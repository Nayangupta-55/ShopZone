import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)

  if (placed) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <p className="font-display text-2xl font-semibold text-ink mb-2">
          Order placed.
        </p>
        <p className="text-ink/60 mb-6">
          This is a mock checkout for the sprint — no payment was taken.
        </p>
        <Link
          to="/shop"
          className="inline-flex bg-ink text-paper font-medium px-5 py-2.5 rounded-md hover:bg-green-dark transition-colors"
        >
          Keep browsing
        </Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <p className="font-display text-2xl font-semibold text-ink mb-2">
          Nothing to check out.
        </p>
        <p className="text-ink/60 mb-6">Add a product to your cart first.</p>
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
    <div className="max-w-xl mx-auto px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-2">
        Final step
      </p>
      <h1 className="font-display text-3xl font-bold text-ink mb-8">Checkout</h1>

      <div className="bg-white border border-ink/10 rounded-xl p-6 shadow-tag">
        <ul className="space-y-2 font-mono text-sm text-ink/80 mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="truncate pr-4">
                {item.title} &times; {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="dash-rule pt-4 flex justify-between items-center">
          <span className="font-display font-semibold text-ink">Total due</span>
          <span className="font-mono text-2xl font-bold text-green-dark">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => {
            clearCart()
            setPlaced(true)
          }}
          className="mt-6 w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-green-dark transition-colors"
        >
          Place order
        </button>
      </div>
    </div>
  )
}
