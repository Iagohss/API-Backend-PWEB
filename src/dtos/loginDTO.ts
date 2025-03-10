import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginDTO {
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  @IsString({ message: "O email deve ser uma string" })
  @IsEmail({}, { message: "O email deve estar em um formato válido" })
  email!: string;

  @IsNotEmpty({ message: "O password não pode ser vazio" })
  @IsString({ message: "O password deve ser uma string" })
  password!: string;
}
