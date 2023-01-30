export type BookType = {
  isbn: string;
  name: string;
  category: string;
  quantity: number;
  price: number| string;
  availableQuantity: number;
  priceHistory: any;
  quantityHistory: any
  borrowedBy: any;
};

export type LoginType = {
  username: string;
};
