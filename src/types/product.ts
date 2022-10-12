export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  category: Category;
  description: string;
  available: boolean;
  price: number;
  img_url: string;
};
