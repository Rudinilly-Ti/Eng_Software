import { Product } from "./product"

export type Pedido = {

    id: number;
    costumerName: string;
    product: [Product];
};