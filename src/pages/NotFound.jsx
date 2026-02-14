import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="section">
      <div className="state-box">
        <h1>404</h1>
        <p>La page demandee est introuvable.</p>
        <Link to="/" className="button">
          Retour a l'accueil
        </Link>
      </div>
    </section>
  )
}

export default NotFound
