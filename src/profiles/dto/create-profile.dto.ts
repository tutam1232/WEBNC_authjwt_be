import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    name: string;

    @IsString()
    hobby: string;
}
