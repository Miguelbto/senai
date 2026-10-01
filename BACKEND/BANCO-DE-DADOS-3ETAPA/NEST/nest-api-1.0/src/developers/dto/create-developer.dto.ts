import { IsDateString, IsEmail, isEmail, IsString, isString } from "class-validator";

export class CreateDeveloperDto {

    @IsString()
    name: string

    @IsEmail()
    email: string;

    @IsDateString()
    dateOfBirth: string;
}
