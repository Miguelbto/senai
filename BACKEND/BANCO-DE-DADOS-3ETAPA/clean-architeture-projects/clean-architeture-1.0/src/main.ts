import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create.product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list.product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repositorie.prisma";
import { prisma } from "./packge/prisma/prisma";
import { CreateProductUsecase } from "./usecases/products/create-product/create.product";
import { ListProductUsecase } from "./usecases/products/list-product/list.product";

function main() {

    const aRepository = ProductRepositoryPrisma.create(prisma)

    const createProductUsecase = CreateProductUsecase.create(aRepository)
    const listProductUsecase = ListProductUsecase.create(aRepository)

    const createRoute = CreateProductRoute.create(createProductUsecase)
    const listRoute = ListProductRoute.create(listProductUsecase)

    const port = 8000
    const api = ApiExpress.create([createRoute, listRoute])
    api.start(port)

}

main()