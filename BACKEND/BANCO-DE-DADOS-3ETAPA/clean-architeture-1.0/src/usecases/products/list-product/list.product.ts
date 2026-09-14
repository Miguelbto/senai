import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";

export type ListProductsInputDto = void

export type ListProductOutputDto = {
    products: {
        id: string;
        name: string;
        price: number;
        quantity: number
    }[]
}

export class ListProductUsecase 
    implements Usecase<ListProductsInputDto, ListProductOutputDto> {
    private constructor(private readonly productGateway: ProductGateway) {}

    public static create(productGateway: ProductGateway) {
        return new ListProductUsecase(productGateway)
    }

    public async execute(input: void): Promise<ListProductOutputDto> {
        const aProducts = await this.productGateway.list()

        const output = this.presentOutput(aProducts)

        return output
    }

    private presentOutput(products: Product[]): ListProductOutputDto {

        return {
            products: products.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity
                }
            })
        }
    }
}