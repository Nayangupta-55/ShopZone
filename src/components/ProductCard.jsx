import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="relative pt-4">
      <div className="tag-string" />
      <Link
        to={`/product/${product.id}`}
        className="relative block bg-white border border-ink/10 rounded-lg p-4 shadow-tag hover:-translate-y-0.5 hover:shadow-md transition-all"
      >
        <span className="tag-hole" aria-hidden="true" />
        <div className="aspect-square w-full rounded-md bg-paper overflow-hidden mb-3 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain p-3"
            loading="lazy"
          />
        </div>
        <p className="text-[11px] uppercase tracking-widest text-muted font-medium mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-semibold text-ink leading-snug line-clamp-2 min-h-[2.6em]">
          {product.title}
        </h3>
        <p className="mt-2 font-mono text-lg font-semibold text-green-dark">
          ${product.price?.toFixed(2)}
        </p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 w-full rounded-md border border-ink/15 bg-ink text-paper text-sm font-medium py-2 hover:bg-green-dark transition-colors"
      >
        Add to cart
      </button>
    </div>
  )
}
