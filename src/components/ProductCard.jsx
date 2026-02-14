import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const baseButton =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors'
  const primaryButton = `${baseButton} bg-[#ffb347] text-[#1a1a1a] hover:bg-[#ffc76f]`
  const ghostButton = `${baseButton} border border-white/40 text-[#f5f4f1] hover:border-white/60`

  return (
    <article className="bg-white/10 rounded-[18px] overflow-hidden flex flex-col min-h-full border border-white/10 animate-rise">
      <div className="bg-[#f7f1e8] grid place-items-center h-[200px] p-4">
        <img
          src={product.image ?? product.thumbnail ?? product.images?.[0]}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3>{product.title}</h3>
        <p className="font-bold">{product.price.toFixed(2)} MAD</p>
        <div className="flex gap-3">
          <Link to={`/produit/${product.id}`} className={ghostButton}>
            Detail
          </Link>
          <button
            className={primaryButton}
            onClick={() =>
              dispatch(
                addItem({
                  ...product,
                  image: product.image ?? product.thumbnail ?? product.images?.[0],
                }),
              )
            }
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
