/**
 * DTO = Data Transfer Object: um "envelope" de dados simples que entra/sai do
 * caso de uso. Não tem regra, não tem método. Serve para a Aplicação NÃO expor
 * entidades de domínio nem formatos de banco para fora.
 */

/** Entrada: o que a camada de interface (HTTP) entrega ao caso de uso. */

export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
    isVip: boolean;
}

export interface registerUserOutput {
    id: string;
    name: string;
    email: string;
    isVip: boolean;
}