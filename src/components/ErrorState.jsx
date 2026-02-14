function ErrorState({ message }) {
  return (
    <div className="state-box error">
      <p>Erreur: {message}</p>
    </div>
  )
}

export default ErrorState
