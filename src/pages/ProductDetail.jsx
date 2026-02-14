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
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error('Produit introuvable')
        }
        const data = await response.json()
        if (isActive) {
          setProduct({
            ...data,
            image: data.thumbnail ?? data.images?.[0],
          })
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
    <section className="grid gap-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10 items-center">
        <div className="bg-[#f7f1e8] rounded-[20px] p-8 grid place-items-center">
          <img
            className="max-w-full max-h-[320px] object-contain"
            src={product.image ?? product.thumbnail ?? product.images?.[0]}
            alt={product.title}
          />
        </div>
        <div className="space-y-3">
          <Link to="/" className="text-[#ffb347] no-underline font-semibold">
            Retour a la boutique
          </Link>
          <h1>{product.title}</h1>
          <p className="text-2xl font-bold">{product.price.toFixed(2)} MAD</p>
          <p className="text-white/80">{product.description}</p>
          <div className="flex gap-4 flex-wrap">
            <button
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors bg-[#ffb347] text-[#1a1a1a] hover:bg-[#ffc76f]"
              onClick={() =>
                dispatch(
                  addItem({
                    ...product,
                    image: product.image ?? product.thumbnail ?? product.images?.[0],
                  }),
                )
              }
            >
              Ajouter au panier
            </button>
            <Link
              to="/panier"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors border border-white/40 text-[#f5f4f1] hover:border-white/60"
            >
              Voir le panier
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
