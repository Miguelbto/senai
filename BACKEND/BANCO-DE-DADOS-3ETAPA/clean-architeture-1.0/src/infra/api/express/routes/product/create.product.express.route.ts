import { CreateProductInputDto, CreateProductOutputDto, CreateProductUsecase } from "../../../../../usecases/products/create-product/create.product";
import { Usecase } from "../../../../../usecases/usecase";
import { HttpMethod, Route } from "../route";

export type CreateProductResponseDto = {
    id: string
}

export class CreateProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createproductService: CreateProductUsecase
    ) {}

    public static create(createproductService: CreateProductUsecase) {
        return new CreateProductRoute(
            "/products",
            HttpMethod.POST,
            createproductService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, price } = request.body

            const input:  CreateProductInputDto = {
                name, 
                price,
            }

            const output: CreateProductOutputDto = await this.createproductService.execute(input)

            const responseBody = this.present(output)

            response.status(201).json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod{
        return this.method
    }

    private present(input: CreateProductInputDto): CreateProductResponseDto {
        const response = { id: input.id }

        return response
    }
}