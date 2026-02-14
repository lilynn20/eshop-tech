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
    <section className="grid gap-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 items-center mb-12">
        <div>
          <p className="uppercase tracking-[0.2em] text-xs text-[#ffb347] font-bold">
            Nouveau stock 2026
          </p>
          <h1>Equipements premium pour votre setup</h1>
          <p className="text-[1.05rem] max-w-[520px]">
            PC portables, ecrans, accessoires et composants testes par notre
            equipe.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-[18px] border border-white/10">
          <p className="font-bold mb-2">Service express</p>
          <p>Commande en ligne, retrait en magasin sous 2h.</p>
        </div>
      </div>

      <h2 className="mb-6">Selection high-tech</h2>

      {status === 'loading' && <Loader label="Chargement du catalogue..." />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'success' && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
