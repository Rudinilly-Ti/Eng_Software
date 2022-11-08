import { Product } from "./product"

export type Pedido = {
    id: number;
    customerName: string;
    product: Product[];
};