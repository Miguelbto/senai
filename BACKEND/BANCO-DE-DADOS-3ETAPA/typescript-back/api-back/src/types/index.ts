export interface Produto {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
}

export interface ItemPedidoInput {
    produtoId: number;
    quantidade: number;
}

export interface Pedido {
    id: number;
    usuarioId: number;
    total: number;
    criadoEm: Date;
}

export interface JwtPayload {
    userId: number;
    email: string;
}