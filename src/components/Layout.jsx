import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../store/cartSlice'

function Layout() {
  const cartCount = useSelector(selectCartCount)

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand">
          <span className="brand-mark">E</span>
          <div>
            <p className="brand-title">E-Shop Tech</p>
            <p className="brand-subtitle">Materiel informatique</p>
          </div>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/panier">Panier</NavLink>
          <NavLink to="/checkout">Commande</NavLink>
        </nav>
        <div className="cart-chip">
          <span>Panier</span>
          <span className="cart-count">{cartCount}</span>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Support: 7j/7 - Livraison rapide en France</p>
      </footer>
    </div>
  )
}

export default Layout
