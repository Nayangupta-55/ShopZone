import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setProduct(null)
    setQty(1)

    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        if (!cancelled) {
          setProduct(data)
          setStatus('ready')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    fetchProduct()
    return () => {
      cancelled = true
    }
  }, [id])

  if (status === 'loading') {
    return (
      <div className="max-w-5xl mx-auto px-5 py-16 grid sm:grid-cols-2 gap-10 animate-pulse">
        <div className="aspect-square bg-white border border-ink/10 rounded-xl" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-line rounded" />
          <div className="h-8 w-3/4 bg-line rounded" />
          <div className="h-6 w-32 bg-line rounded" />
          <div className="h-24 w-full bg-line rounded" />
        </div>
      </div>
    )
  }

  if (status === 'error' || !product) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <p className="font-display text-2xl font-semibold text-ink mb-2">
          This product doesn't exist.
        </p>
        <p className="text-ink/60 mb-6">
          Product #{id} isn't in the catalog. It may have been removed.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex bg-ink text-paper font-medium px-5 py-2.5 rounded-md hover:bg-green-dark transition-colors"
        >
          Back to shop
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <Link to="/shop" className="text-sm text-ink/60 hover:text-ink mb-6 inline-block">
        &larr; Back to shop
      </Link>

      <div className="grid sm:grid-cols-2 gap-10">
        <div className="relative bg-white border border-ink/10 rounded-xl p-8 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-3">
            {product.category}
          </p>
          <h1 className="font-display text-3xl font-bold text-ink mb-3 leading-tight">
            {product.title}
          </h1>

          {product.rating && (
            <p className="text-sm text-ink/60 mb-4">
              &#9733; {product.rating.toFixed(1)} rating &middot;{' '}
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          )}

          <p className="font-mono text-3xl font-semibold text-green-dark mb-6">
            ${product.price?.toFixed(2)}
          </p>

          <p className="text-ink/70 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-ink/15 rounded-md">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-ink/70 hover:text-ink"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="w-8 text-center font-mono">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 text-ink/70 hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, qty)
                setJustAdded(true)
                setTimeout(() => setJustAdded(false), 1600)
              }}
              className="flex-1 bg-ink text-paper font-medium py-2.5 rounded-md hover:bg-green-dark transition-colors"
            >
              {justAdded ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
