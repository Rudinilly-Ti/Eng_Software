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

export type ProductSize = {
  id: string;
  unit: string;
  value: string;
  checked?: boolean;
  price: number;
};

export type ProductType = {
  id: string;
  name: string;
};

export type ProductSizeElement = {
  id: string;
  price: number;
  productSize?: ProductSize;
};

export type Product = {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  price?: number;
  isAvailable: boolean;
  productTypeId: string;
  productType?: ProductType;
  sizes: ProductSizeElement[] | undefined;
  size?: string;
};
