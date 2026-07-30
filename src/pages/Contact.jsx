import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-xl mx-auto px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-dark mb-2">
        Get in touch
      </p>
      <h1 className="font-display text-3xl font-bold text-ink mb-8">Contact Us</h1>

      {sent ? (
        <div className="bg-white border border-ink/10 rounded-xl p-8 text-center">
          <p className="font-display text-xl font-semibold text-ink mb-2">
            Message sent.
          </p>
          <p className="text-ink/60 mb-6">
            Thanks, {form.name || 'friend'} — we'll get back to you shortly.
          </p>
          <button
            onClick={() => {
              setForm({ name: '', email: '', message: '' })
              setSent(false)
            }}
            className="text-sm font-medium text-green-dark hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-ink/10 rounded-xl p-6 space-y-5 shadow-tag"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-ink/15 px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-green"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-ink/15 px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-green"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-md border border-ink/15 px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-green resize-none"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-ink text-paper font-medium py-2.5 rounded-md hover:bg-green-dark transition-colors"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  )
}
