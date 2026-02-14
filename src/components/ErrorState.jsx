function ErrorState({ message }) {
  return (
    <div className="bg-white/10 p-8 rounded-[18px] text-center border border-dashed border-rose-400/60">
      <p>Erreur: {message}</p>
    </div>
  )
}

export default ErrorState
