//Camada verde

import { Product } from "../entity/product.entity";

export interface Productgateway {
    save(product: Product): Promise<void>
    list(): Promise<Product[]>
}