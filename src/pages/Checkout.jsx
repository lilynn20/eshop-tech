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
    <section className="section">
      <h1>Finaliser la commande</h1>
      <div className="checkout">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="fullName">Nom complet</label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Votre nom et prenom"
            />
            {touched.fullName && errors.fullName && (
              <span className="field-error">{errors.fullName}</span>
            )}
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="exemple@mail.com"
              />
              {touched.email && errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="phone">Telephone</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0600000000"
              />
              {touched.phone && errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="address">Adresse</label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="12 rue des Tech"
            />
            {touched.address && errors.address && (
              <span className="field-error">{errors.address}</span>
            )}
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="city">Ville</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Paris"
              />
              {touched.city && errors.city && (
                <span className="field-error">{errors.city}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="postalCode">Code postal</label>
              <input
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="75000"
              />
              {touched.postalCode && errors.postalCode && (
                <span className="field-error">{errors.postalCode}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="delivery">Livraison</label>
            <select
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

          <div className="field">
            <label htmlFor="notes">Instructions</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Informations utiles pour la livraison"
              rows="4"
            />
          </div>

          <div className="field checkbox">
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
              <span className="field-error">{errors.terms}</span>
            )}
          </div>

          <button className="button" type="submit">
            Valider la commande
          </button>

          {submitted && (
            <p className="success">Commande prise en compte. Merci !</p>
          )}
        </form>

        <aside className="summary">
          <h2>Resume</h2>
          <div className="summary-items">
            {items.length === 0 && <p>Votre panier est vide.</p>}
            {items.map((item) => (
              <div key={item.id} className="summary-row">
                <span>{item.title}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{total.toFixed(2)} EUR</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
