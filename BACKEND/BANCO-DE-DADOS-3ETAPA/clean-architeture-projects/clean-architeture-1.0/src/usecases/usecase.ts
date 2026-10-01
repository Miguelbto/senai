// Use case input port


export interface Usecase<InputDto, OutputDto>{
    execute(input: InputDto): Promise<OutputDto>
}