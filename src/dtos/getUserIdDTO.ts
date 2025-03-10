import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class GetUserIdDTO {
  @IsNotEmpty({ message: "O id não pode ser vazio" })
  @IsString({ message: "O id deve ser uma string" })
  @IsUUID("all", { message: "O id deve estar no formato UUID" })
  userId!: number;
}
