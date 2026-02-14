function Loader({ label = 'Chargement en cours...' }) {
  return (
    <div className="bg-white/10 p-8 rounded-[18px] text-center border border-dashed border-white/20 grid gap-4 place-items-center">
      <div
        className="w-8 h-8 rounded-full border-[3px] border-white/20 border-t-[#ffb347] animate-spin"
        aria-hidden="true"
      />
      <p>{label}</p>
    </div>
  )
}

export default Loader
