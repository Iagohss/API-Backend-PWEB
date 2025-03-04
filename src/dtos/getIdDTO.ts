import { IsString, IsNotEmpty, IsUUID } from "class-validator";
import { ALL } from "dns";

export class GetIdDTO {
  @IsNotEmpty({ message: "O id não pode ser vazio" })
  @IsString({ message: "O id deve ser uma string" })
  @IsUUID("all", { message: "O id deve estar no formato UUID" })
  id!: number;
}
