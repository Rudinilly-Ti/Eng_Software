export type Category = {
  id: number;
  name: string;
};

export type Size = {
  id: string;
  price: number;
  productSize: {
    id: string;
    unit: string;
    value: string;
  };
}

export type Product = {
  id: number;
  name: string;
  productType: Category;
  description: string;
  isAvailable: boolean;
  sizes: Size[];
  size: string;
  price: number;
  img_url: string;
};
