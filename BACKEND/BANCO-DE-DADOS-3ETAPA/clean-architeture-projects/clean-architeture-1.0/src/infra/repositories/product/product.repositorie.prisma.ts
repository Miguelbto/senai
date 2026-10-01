import { PrismaClient } from '@prisma/client/extension';
import { Product } from '../../../domain/product/entity/product.entity';
import { ProductGateway } from '../../../domain/product/gateway/product.gateway'


export class ProductRepositoryPrisma implements ProductGateway {

    private contructor (readonly private prismaClient: PrismaClient ) {}

    public static create(prismaClient: PrismaCLient) {
        return new ProductRepositoryPrisma(prismaClient)
    }

    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }

        await this.prismaClient.product.create({
            data,
        })
    }

    public async list(): Promise<Product[]>{
        const products = await this.prismaClient.product.findMany()

        const productList = products.map((p) => {
            const products = Product.with({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity

                return products
            })
            
            return productList
        })
    }
}