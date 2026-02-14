function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center bg-white/10 p-4 rounded-[16px]">
      <img
        className="w-[72px] h-[72px] object-contain bg-[#f7f1e8] rounded-[12px] p-2"
        src={item.image}
        alt={item.title}
      />
      <div className="space-y-1">
        <h4>{item.title}</h4>
        <p>{item.price.toFixed(2)} MAD</p>
      </div>
      <div className="grid gap-2 justify-items-end">
        <input
          className="w-16 px-2 py-1 rounded-lg border border-white/30 bg-transparent text-inherit"
          type="number"
          min="1"
          value={item.quantity}
          onChange={(event) => onUpdate(item.id, Number(event.target.value))}
          aria-label={`Quantite pour ${item.title}`}
        />
        <button
          className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-bold transition-colors border border-white/40 text-[#f5f4f1] hover:border-white/60"
          onClick={() => onRemove(item.id)}
        >
          Retirer
        </button>
      </div>
    </div>
  )
}

export default CartItem
