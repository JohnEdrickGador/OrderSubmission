import type { Order } from "../types/types.js";

const PRICE_CHART: Record<string, number> = {
  item_1: 100,
  item_2: 250,
  item_3: 500,
  item_4: 750,
  item_5: 1000,
};

const REJECTION_THRESHOLD = 3000;

const orders: Order[] = [];

export const processOrder = (data: Order) => {
  orders.push(data);
  if (!data.items || data.items.length === 0) {
    throw new Error("At least one item must be provided.");
  }

  if (!data.customer.name || !data.customer.email) {
    throw new Error("Customer name and email are required.");
  }

  let totalPrice = 0;

  for (let index = 0; index < data.items.length; index++) {
    const item = data.items[index];

    if (item === undefined) {
      throw new Error("Item is undefined");
    }

    if (item.quantity <= 0) {
      throw new Error("Item quantity must be greater than 0");
    }

    const price = PRICE_CHART[item.id];

    if (!price) {
      throw new Error(`Invalid item ID: ${item.id}`);
    }
    totalPrice += price * item.quantity;
  }

  if (totalPrice > REJECTION_THRESHOLD) {
    const status = "REJECTED";
    const returnBody = {
      orderId: `ord_${orders.length}`,
      status: status,
      reason: "ORDER_TOTAL_TOO_HIGH",
    };
    return returnBody;
  } else {
    const status = "CONFIRMED";
    const returnBody = {
      orderId: `ord_${orders.length}`,
      status: status,
      total: totalPrice,
    };
    return returnBody;
  }
};
