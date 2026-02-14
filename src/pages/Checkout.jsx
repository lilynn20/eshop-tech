import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../store/cartSlice'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  delivery: 'standard',
  notes: '',
  terms: false,
}

function validate(form) {
  const errors = {}

  if (form.fullName.trim().length < 3) {
    errors.fullName = 'Nom complet requis (3 caracteres minimum).'
  }

  if (!/^[\w-.]+@[\w-]+\.[\w-]{2,}$/i.test(form.email)) {
    errors.email = 'Email invalide.'
  }

  if (!/^[0-9]{10}$/.test(form.phone)) {
    errors.phone = 'Telephone invalide (10 chiffres).'
  }

  if (form.address.trim().length < 8) {
    errors.address = 'Adresse incomplete.'
  }

  if (form.city.trim().length < 2) {
    errors.city = 'Ville requise.'
  }

  if (!/^[0-9]{5}$/.test(form.postalCode)) {
    errors.postalCode = 'Code postal invalide.'
  }

  if (!form.terms) {
    errors.terms = 'Vous devez accepter les conditions.'
  }

  return errors
}

function Checkout() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validate(form), [form])
  const isValid = Object.keys(errors).length === 0

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
      terms: true,
    })

    if (isValid && items.length > 0) {
      setSubmitted(true)
    }
  }

  return (
    <section className="grid gap-6">
      <h1>Finaliser la commande</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-2">
            <label htmlFor="fullName">Nom complet</label>
            <input
              className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Votre nom et prenom"
            />
            {touched.fullName && errors.fullName && (
              <span className="text-rose-300 text-sm">{errors.fullName}</span>
            )}
          </div>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="exemple@mail.com"
              />
              {touched.email && errors.email && (
                <span className="text-rose-300 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Telephone</label>
              <input
                className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0600000000"
              />
              {touched.phone && errors.phone && (
                <span className="text-rose-300 text-sm">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="address">Adresse</label>
            <input
              className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="12 rue des Tech"
            />
            {touched.address && errors.address && (
              <span className="text-rose-300 text-sm">{errors.address}</span>
            )}
          </div>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            <div className="grid gap-2">
              <label htmlFor="city">Ville</label>
              <input
                className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Paris"
              />
              {touched.city && errors.city && (
                <span className="text-rose-300 text-sm">{errors.city}</span>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="postalCode">Code postal</label>
              <input
                className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="75000"
              />
              {touched.postalCode && errors.postalCode && (
                <span className="text-rose-300 text-sm">{errors.postalCode}</span>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="delivery">Livraison</label>
            <select
              className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
              id="delivery"
              name="delivery"
              value={form.delivery}
              onChange={handleChange}
            >
              <option value="standard">Standard (48h)</option>
              <option value="express">Express (24h)</option>
              <option value="pickup">Retrait magasin</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="notes">Instructions</label>
            <textarea
              className="px-3 py-2.5 rounded-[10px] border border-white/30 bg-white/5 text-inherit"
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Informations utiles pour la livraison"
              rows="4"
            />
          </div>

          <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={form.terms}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="terms">J'accepte les conditions.</label>
            {touched.terms && errors.terms && (
              <span className="text-rose-300 text-sm">{errors.terms}</span>
            )}
          </div>

          <button
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors bg-[#ffb347] text-[#1a1a1a] hover:bg-[#ffc76f]"
            type="submit"
          >
            Valider la commande
          </button>

          {submitted && (
            <p className="text-green-200 font-semibold">
              Commande prise en compte. Merci !
            </p>
          )}
        </form>

        <aside className="bg-white/10 p-6 rounded-[18px] border border-white/10">
          <h2>Resume</h2>
          <div>
            {items.length === 0 && <p>Votre panier est vide.</p>}
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[1.1rem] font-bold">
            <span>Total</span>
            <strong>{total.toFixed(2)} MAD</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
