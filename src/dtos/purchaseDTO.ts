import { IsString, IsNotEmpty } from "class-validator";

export class PurchaseDTO {
  @IsNotEmpty({ message: "O cartId não pode ser vazio" })
  @IsString({ message: "O cartId deve ser uma string" })
  cartId!: string;

  @IsNotEmpty({ message: "A forma de pagamento não pode ser vazia" })
  @IsString({ message: "A forma de pagamento deve ser uma string" })
  formaPagamento!: string;
}
