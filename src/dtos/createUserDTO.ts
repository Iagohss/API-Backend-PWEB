import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @IsString({ message: "O nome deve ser uma string" })
  name!: string;

  @IsNotEmpty({ message: "O email não pode ser vazio" })
  @IsString({ message: "O email deve ser uma string" })
  @IsEmail({}, { message: "O email deve estar em um formato válido" })
  email!: string;

  @IsNotEmpty({ message: "O password não pode ser vazio" })
  @IsString({ message: "O password deve ser uma string" })
  password!: string;

  @IsBoolean({ message: "Admin deve ser um boolean" })
  admin: boolean = false;
}
