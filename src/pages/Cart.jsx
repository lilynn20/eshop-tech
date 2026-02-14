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
      <section className="grid gap-6">
        <div className="bg-white/10 p-8 rounded-[18px] text-center border border-dashed border-white/20 grid gap-4 place-items-center">
          <h2>Votre panier est vide</h2>
          <p>Ajoutez vos produits preferes pour continuer.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors bg-[#ffb347] text-[#1a1a1a] hover:bg-[#ffc76f]"
          >
            Explorer la boutique
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="grid gap-6">
      <h1>Panier</h1>
      <div className="grid gap-4 my-8">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={(id, quantity) => dispatch(updateQuantity({ id, quantity }))}
            onRemove={(id) => dispatch(removeItem(id))}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 bg-white/10 p-6 rounded-[18px] max-[720px]:flex-col max-[720px]:items-start">
        <div>
          <p>Total</p>
          <h2>{total.toFixed(2)} MAD</h2>
        </div>
        <div className="flex gap-4 flex-wrap">
          <button
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors border border-white/40 text-[#f5f4f1] hover:border-white/60"
            onClick={() => dispatch(clearCart())}
          >
            Vider
          </button>
          <Link
            to="/checkout"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors bg-[#ffb347] text-[#1a1a1a] hover:bg-[#ffc76f]"
          >
            Finaliser la commande
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cart
