import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import ProductCard from '../components/ProductCard'

const API_URL = 'https://fakestoreapi.com/products/category/electronics'

function Home() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    const loadProducts = async () => {
      setStatus('loading')
      setError('')
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Impossible de charger les produits')
        }
        const data = await response.json()
        if (isActive) {
          setProducts(data)
          setStatus('success')
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError.message)
          setStatus('error')
        }
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="section">
      <div className="hero">
        <div>
          <p className="eyebrow">Nouveau stock 2026</p>
          <h1>Equipements premium pour votre setup</h1>
          <p className="lead">
            PC portables, ecrans, accessoires et composants testes par notre
            equipe.
          </p>
        </div>
        <div className="hero-card">
          <p className="hero-title">Service express</p>
          <p>Commande en ligne, retrait en magasin sous 2h.</p>
        </div>
      </div>

      <h2 className="section-title">Selection high-tech</h2>

      {status === 'loading' && <Loader label="Chargement du catalogue..." />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'success' && (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
