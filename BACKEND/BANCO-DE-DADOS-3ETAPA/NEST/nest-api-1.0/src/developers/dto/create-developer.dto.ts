import { IsDateString, IsEmail, isEmail, IsEnum, IsString, isString } from "class-validator";
import { DeveloperLevel, DeveloperStatus } from "../entities/developer.entity";

export class CreateDeveloperDto {

    @IsString()
    name: string
    @IsEmail()
    email: string;
    @IsEnum(DeveloperLevel)
    developerlevel: DeveloperLevel
    @IsEnum(DeveloperStatus)
    status: DeveloperStatus
    @IsDateString()
    dateOfBirth: string;
}
