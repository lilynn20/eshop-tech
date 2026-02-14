function Loader({ label = 'Chargement en cours...' }) {
  return (
    <div className="state-box">
      <div className="loader" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export default Loader
