import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    const loadProduct = async () => {
      setStatus('loading')
      setError('')
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
          throw new Error('Produit introuvable')
        }
        const data = await response.json()
        if (isActive) {
          setProduct(data)
          setStatus('success')
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError.message)
          setStatus('error')
        }
      }
    }

    loadProduct()

    return () => {
      isActive = false
    }
  }, [id])

  if (status === 'loading') {
    return <Loader label="Chargement du produit..." />
  }

  if (status === 'error') {
    return <ErrorState message={error} />
  }

  if (!product) {
    return null
  }

  return (
    <section className="section">
      <div className="detail">
        <div className="detail-media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-body">
          <Link to="/" className="text-link">
            Retour a la boutique
          </Link>
          <h1>{product.title}</h1>
          <p className="detail-price">{product.price.toFixed(2)} EUR</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            <button className="button" onClick={() => dispatch(addItem(product))}>
              Ajouter au panier
            </button>
            <Link to="/panier" className="button ghost">
              Voir le panier
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
