type Order = {
  items: Item[];
  customer: Customer;
};

type Customer = {
  name: string;
  email: string;
};

type Item = {
  id: string;
  quantity: number;
};

export type { Order, Item, Customer };
