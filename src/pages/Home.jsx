import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-20 grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-4">
            No. 001 &middot; Now open
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-ink leading-[1.05] mb-6">
            Everything's
            <br />
            priced to browse.
          </h1>
          <p className="text-ink/70 text-lg max-w-md mb-8">
            ShopZone is a single page store - every product, every detail
            page, every cart update, no reloads. Just clean routing under
            the hood.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-green-dark transition-colors"
            >
              Browse the shop
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-ink/20 text-ink font-medium px-6 py-3 rounded-md hover:border-ink transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div className="relative bg-white border border-ink/10 rounded-xl p-6 shadow-tag">
          <span className="tag-hole" aria-hidden="true" />
          <p className="font-mono text-xs text-muted mb-3 pl-6">TODAY'S RECEIPT</p>
          <div className="dash-rule pt-3 space-y-2 font-mono text-sm text-ink/80 pl-6">
            <div className="flex justify-between">
              <span>Wireless earbuds</span>
              <span>$64.99</span>
            </div>
            <div className="flex justify-between">
              <span>Ceramic mug set</span>
              <span>$18.50</span>
            </div>
            <div className="flex justify-between">
              <span>Desk lamp</span>
              <span>$32.00</span>
            </div>
          </div>
          <div className="dash-rule mt-3 pt-3 flex justify-between font-mono text-sm font-semibold pl-6">
            <span>Total</span>
            <span>$115.49</span>
          </div>
          <div className="perf-edge mt-5 -mx-6" aria-hidden="true" />
        </div>
      </section>
    </div>
  )
}
