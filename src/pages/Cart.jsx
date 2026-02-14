import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import {
  clearCart,
  removeItem,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../store/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="state-box">
          <h2>Votre panier est vide</h2>
          <p>Ajoutez vos produits preferes pour continuer.</p>
          <Link to="/" className="button">
            Explorer la boutique
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <h1>Panier</h1>
      <div className="cart-list">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={(id, quantity) => dispatch(updateQuantity({ id, quantity }))}
            onRemove={(id) => dispatch(removeItem(id))}
          />
        ))}
      </div>
      <div className="cart-summary">
        <div>
          <p>Total</p>
          <h2>{total.toFixed(2)} EUR</h2>
        </div>
        <div className="cart-summary-actions">
          <button className="button ghost" onClick={() => dispatch(clearCart())}>
            Vider
          </button>
          <Link to="/checkout" className="button">
            Finaliser la commande
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cart
