import { IsString, IsOptional, IsEmail, IsBoolean } from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: "O nome deve ser uma string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "O email deve ser uma string" })
  @IsEmail({}, { message: "O email deve estar em um formato válido" })
  email?: string;

  @IsOptional()
  @IsString({ message: "O password deve ser uma string" })
  password?: string;

  @IsOptional()
  @IsBoolean({ message: "Admin deve ser um boolean" })
  admin?: boolean;
}
