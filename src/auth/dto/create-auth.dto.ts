import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";
import { IntersectionType, OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { CreateProfileDto } from "../../profiles/dto/create-profile.dto";

export class CreateAuthDto extends IntersectionType(
    CreateUserDto,
    OmitType(CreateProfileDto, ['id'] as const)
){}

// export class CreateAuthDto {
//     @IsEmail()
//     @IsNotEmpty()
//     email: string;

//     @IsNotEmpty()
//     @MinLength(6)
//     password: string;

//     @IsString()
//     name: string;

//     @IsString()
//     hobby: string;
// }
