export type ProductProps = {
    id: string,
    name: string,
    price: number,
    quantity: number
}

export class Product {

    private constructor(private props: ProductProps){}

    public static create(name: string, price: number) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            price,
            quantity: 0
        })
    }

    public static with(props: ProductProps){
        return new Product(props)
    }

    private validate() {
        if (this.props.quantity < 0 ) {
            throw new Error("Product quantity should be positive")
        }
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get price(){
        return this.props.price
    }

    public get quantity() {
        return this.props.quantity
    }

    public increaseQuantity(quantity: number) {

        //it need validate data
        this.props.quantity += quantity
    }

    public decreaseQuantity(quantity: number) {
        this.props.quantity -= quantity
    }
}