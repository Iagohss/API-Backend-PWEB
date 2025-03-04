import { IsString, IsEnum, IsNumber, Min, IsNotEmpty } from "class-validator";
import { Caimento, Tamanho } from "@prisma/client";

export class CreateProductDTO {
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  @IsString({ message: "O nome deve ser uma string" })
  nome!: string;

  @IsNotEmpty({ message: "A cor não pode ser vazia" })
  @IsString({ message: "A cor deve ser uma string" })
  cor!: string;

  @IsNotEmpty({ message: "O tipo não pode ser vazio" })
  @IsString({ message: "O tipo deve ser uma string" })
  tipo!: string;

  @IsNotEmpty({ message: "O caimento não pode ser vazio" })
  @IsEnum(Caimento, {
    message: `Caimento deve ser um dos seguintes valores: ${Object.values(
      Caimento
    ).join(", ")}`,
  })
  caimento!: Caimento;

  @IsNotEmpty({ message: "O material não pode ser vazio" })
  @IsString({ message: "O material deve ser uma string" })
  material!: string;

  @IsNotEmpty({ message: "O tamanho não pode ser vazio" })
  @IsEnum(Tamanho, {
    message: `Tamanho deve ser um dos seguintes valores: ${Object.values(
      Tamanho
    ).join(", ")}`,
  })
  tamanho!: Tamanho;

  @IsNotEmpty({ message: "O preço não pode ser vazio" })
  @IsNumber({}, { message: "O preço deve ser um número" })
  @Min(0, { message: "Preço deve ser um número positivo" })
  preco!: number;
}
