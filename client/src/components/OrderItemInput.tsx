interface OrderItemInputProps {
  index: number;
  item: { id: string; quantity: number };
  onChange: (index: number, item: { id: string; quantity: number }) => void;
  onRemove: (index: number) => void;
  options: { id: string; name: string }[]; // dropdown options
}

const OrderItemInput = ({
  index,
  item,
  onChange,
  onRemove,
  options,
}: OrderItemInputProps) => {
  return (
    <div className="item-row">
      {/* Dropdown for item selection */}
      <select
        value={item.id}
        onChange={(e) => onChange(index, { ...item, id: e.target.value })}
        required
      >
        <option value="" disabled>
          Select an item
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>

      {/* Quantity input */}
      <input
        type="number"
        placeholder="Quantity"
        value={item.quantity}
        min={1}
        onChange={(e) =>
          onChange(index, { ...item, quantity: Number(e.target.value) })
        }
        required
      />

      {/* Remove button */}
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default OrderItemInput;
