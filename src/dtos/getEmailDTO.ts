import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class GetEmailDTO {
  @IsNotEmpty({ message: "O id não pode ser vazio" })
  @IsString({ message: "O id deve ser uma string" })
  email!: string;
}
