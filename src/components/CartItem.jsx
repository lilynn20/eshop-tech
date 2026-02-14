function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-info">
        <h4>{item.title}</h4>
        <p>{item.price.toFixed(2)} EUR</p>
      </div>
      <div className="cart-actions">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(event) => onUpdate(item.id, Number(event.target.value))}
          aria-label={`Quantite pour ${item.title}`}
        />
        <button className="button ghost" onClick={() => onRemove(item.id)}>
          Retirer
        </button>
      </div>
    </div>
  )
}

export default CartItem
