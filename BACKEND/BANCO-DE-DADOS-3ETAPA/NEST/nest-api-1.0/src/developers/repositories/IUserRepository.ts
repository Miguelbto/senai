type InputUser = {
    name: string,
    email: string,
    passwordHash: String
}

type OutputUser = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    active: string;
    createAt: Date;
    updateAt: Date;
}

export abstract class IUserRepository {
    abstract create(data: InputUser): Promise<OutputUser>
    abstract findAll(): Promise<OutputUser>
    abstract findById(id: string): Promise<OutputUser>
    abstract update(id: string, data: Partial<InputUser>): Promise<OutputUser>
    abstract remove(id: string): Promise<void>
}