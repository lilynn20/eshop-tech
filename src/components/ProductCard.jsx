import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()

  return (
    <article className="card">
      <div className="card-media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="card-price">{product.price.toFixed(2)} EUR</p>
        <div className="card-actions">
          <Link to={`/produit/${product.id}`} className="button ghost">
            Detail
          </Link>
          <button
            className="button"
            onClick={() => dispatch(addItem(product))}
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
