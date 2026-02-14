import { useEffect, useMemo, useState } from 'react'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import ProductCard from '../components/ProductCard'

const PAGE_SIZE = 16
const CATEGORY_OPTIONS = [
  { id: 'chargeurs', label: 'Chargeurs', query: 'charger' },
  { id: 'ecrans', label: 'Ecrans', query: 'monitor' },
  { id: 'portables', label: 'Portables', query: 'laptop' },
  { id: 'accessoires', label: 'Accessoires', query: 'accessory' },
  { id: 'composants', label: 'Composants', query: 'component' },
]

function Home() {
  const [products, setProducts] = useState([])
  const [categoryId, setCategoryId] = useState(CATEGORY_OPTIONS[0].id)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const category = useMemo(
    () => CATEGORY_OPTIONS.find((item) => item.id === categoryId),
    [categoryId],
  )
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  useEffect(() => {
    let isActive = true
    const loadProducts = async () => {
      setStatus('loading')
      setError('')
      try {
        const query = encodeURIComponent(category?.query ?? '')
        const skip = (page - 1) * PAGE_SIZE
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=${PAGE_SIZE}&skip=${skip}`,
        )
        if (!response.ok) {
          throw new Error('Impossible de charger les produits')
        }
        const data = await response.json()
        if (isActive) {
          const normalized = data.products.map((item) => ({
            ...item,
            image: item.thumbnail ?? item.images?.[0],
          }))
          setProducts(normalized)
          setTotal(data.total ?? normalized.length)
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
  }, [category, page])

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

      <div className="flex flex-wrap items-center gap-3">
        {CATEGORY_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCategoryId(item.id)
              setPage(1)
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
              item.id === categoryId
                ? 'bg-[#ffb347] text-[#1a1a1a] border-transparent'
                : 'border-white/30 text-[#f5f4f1] hover:border-white/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="m-0">Selection high-tech</h2>
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span>
            Page {page} / {pageCount}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded-full px-3 py-1.5 border border-white/30 text-[#f5f4f1] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Precedent
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
              disabled={page >= pageCount}
              className="rounded-full px-3 py-1.5 border border-white/30 text-[#f5f4f1] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {status === 'loading' && <Loader label="Chargement du catalogue..." />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'success' && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {products.length === 0 ? (
            <div className="bg-white/10 p-8 rounded-[18px] text-center border border-dashed border-white/20">
              <p>Aucun produit trouve pour cette categorie.</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </section>
  )
}

export default Home
