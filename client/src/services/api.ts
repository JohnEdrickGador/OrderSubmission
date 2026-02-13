export type OrderItem = {
  id: string;
  quantity: number;
};

export type CustomerData = {
  name: string;
  email: string;
};

export type OrderData = {
  items: OrderItem[];
  customer: CustomerData;
};

export const submitOrder = async (order: OrderData) => {
  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };
  const response = await fetch("http://localhost:5000/api/orders", body);

  console.log(body.body);
  if (!response.ok) {
    throw new Error("Failed to submit order");
  }

  return response.json();
};
