import { useState } from "react";
import { submitOrder, OrderItem } from "../services/api";
import { OrderData } from "../services/api";
import OrderItemInput from "./OrderItemInput";
import Notification from "./Notification";

export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const availableItems = [
    { id: "1", name: "item_1" },
    { id: "2", name: "item_2" },
    { id: "3", name: "item_3" },
    { id: "4", name: "item_4" },
    { id: "5", name: "item_5" },
  ];

  const handleItemChange = (index: number, newItem: OrderItem) => {
    const updated = [...items];
    updated[index] = newItem;
    setItems(updated);
  };

  const handleItemRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleAddItem = () => setItems([...items, { id: "", quantity: 1 }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    let order: OrderData = {
      items: items,
      customer: { name: customerName, email: customerEmail },
    };

    console.log(order.customer);
    console.log(order.items[0]);

    try {
      await submitOrder(order);
      setSuccessMessage("Order submitted successfully!");
      setCustomerName("");
      setCustomerEmail("");
      setItems([]);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Submit Order</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
      />

      {items.map((item, index) => (
        <OrderItemInput
          key={index}
          index={index}
          item={item}
          onChange={handleItemChange}
          onRemove={handleItemRemove}
          options={availableItems}
        />
      ))}

      <div className="buttons-container">
        <button type="button" className="add-btn" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Order"}
        </button>
      </div>

      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}
      {errorMessage && <Notification message={errorMessage} type="error" />}
    </form>
  );
}
