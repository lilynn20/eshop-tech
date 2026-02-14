import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../store/cartSlice'

function Layout() {
  const cartCount = useSelector(selectCartCount)
  const navLinkClass = ({ isActive }) =>
    `text-[#f5f4f1] font-semibold relative transition ${
      isActive
        ? "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-0.5 after:bg-[#ffb347]"
        : ''
    }`

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between gap-8 px-[6vw] py-6 bg-[rgba(15,19,29,0.92)] backdrop-blur-xl border-b border-white/10 sticky top-0 z-10 max-[720px]:flex-col max-[720px]:items-start">
        <div className="flex items-center gap-4 text-[#f5f4f1]">
          <span className="grid place-items-center w-[42px] h-[42px] rounded-[14px] bg-gradient-to-br from-[#ffb347] to-[#ff5f6d] text-[#111] font-bold text-[1.1rem]">
            E
          </span>
          <div>
            <p className="text-[1.1rem] m-0">E-Shop Tech</p>
            <p className="m-0 text-[0.85rem] opacity-70">Materiel informatique</p>
          </div>
        </div>
        <nav className="flex gap-6">
          <NavLink to="/" className={navLinkClass}>
            Accueil
          </NavLink>
          <NavLink to="/panier" className={navLinkClass}>
            Panier
          </NavLink>
          <NavLink to="/checkout" className={navLinkClass}>
            Commande
          </NavLink>
        </nav>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[#f5f4f1] font-semibold">
          <span>Panier</span>
          <span className="grid place-items-center w-[22px] h-[22px] rounded-full bg-[#ffb347] text-[#111] text-[0.8rem]">
            {cartCount}
          </span>
        </div>
      </header>
      <main className="flex-1 px-[6vw] pt-10 pb-16">
        <Outlet />
      </main>
      <footer className="px-[6vw] py-6 text-center text-white/60">
        <p>Support: 7j/7 - Livraison rapide au Maroc</p>
      </footer>
    </div>
  )
}

export default Layout
