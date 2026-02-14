import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="grid gap-6">
      <div className="bg-white/10 p-8 rounded-[18px] text-center border border-dashed border-white/20 grid gap-4 place-items-center">
        <h1>404</h1>
        <p>La page demandee est introuvable.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors bg-[#ffb347] text-[#1a1a1a] hover:bg-[#ffc76f]"
        >
          Retour a l'accueil
        </Link>
      </div>
    </section>
  )
}

export default NotFound
