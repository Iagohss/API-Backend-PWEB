import { IsString, IsNotEmpty, IsUUID, IsInt, Min } from "class-validator";

export class CartProductDTO {
  @IsNotEmpty({ message: "O cartId não pode ser vazio" })
  @IsString({ message: "O cartId deve ser uma string" })
  @IsUUID("all", { message: "O cartId deve estar no formato UUID" })
  cartId!: string;

  @IsNotEmpty({ message: "O productId não pode ser vazio" })
  @IsString({ message: "O productId deve ser uma string" })
  @IsUUID("all", { message: "O productId deve estar no formato UUID" })
  productId!: string;

  @IsNotEmpty({ message: "A quantidade não pode ser vazia" })
  @IsInt({ message: "A quantidade deve ser um inteiro" })
  @Min(1, { message: "A quantidade de produtos deve ser maior que zero" })
  quantidade!: number;
}
