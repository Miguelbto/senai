/** Saída de GetUser. `createdAt` é texto ISO (como o legado devolvia o created_at). */

export interface UserOutput {
    id: string;
    name: string;
    email: string;
    isVip: boolean;
    createdAt: string;
}