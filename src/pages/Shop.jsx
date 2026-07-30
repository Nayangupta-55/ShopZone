import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') 
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      setStatus('loading')
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100')
        if (!res.ok) throw new Error(`Request failed with ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setProducts(data.products || [])
          setStatus('ready')
        }
      } catch (err) {
        if (!cancelled) setStatus('error')
      }
    }

    fetchProducts()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-2">
            Inventory
          </p>
          <h1 className="font-display text-3xl font-bold text-ink">The Shop</h1>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-64 rounded-md border border-ink/15 bg-white px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-green"
        />
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white border border-ink/10 rounded-lg p-4 h-72"
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="text-center py-20">
          <p className="font-display text-xl font-semibold text-ink mb-2">
            Couldn't load the inventory.
          </p>
          <p className="text-ink/60">
            The product feed didn't respond. Check your connection and refresh.
          </p>
        </div>
      )}

      {status === 'ready' && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-display text-xl font-semibold text-ink mb-2">
            No products match "{query}"
          </p>
          <p className="text-ink/60">Try a different search term.</p>
        </div>
      )}

      {status === 'ready' && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
