import {
  IsString,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
} from "class-validator";
import { Caimento, Tamanho } from "@prisma/client";

export class UpdateProductDTO {
  @IsOptional()
  @IsString({ message: "O nome deve ser uma string" })
  nome?: string;

  @IsOptional()
  @IsString({ message: "A cor deve ser uma string" })
  cor?: string;

  @IsOptional()
  @IsString({ message: "O tipo deve ser uma string" })
  tipo?: string;

  @IsOptional()
  @IsEnum(Caimento, {
    message: `Caimento deve ser um dos seguintes valores: ${Object.values(
      Caimento
    ).join(", ")}`,
  })
  caimento?: Caimento;

  @IsOptional()
  @IsString({ message: "O material deve ser uma string" })
  material?: string;

  @IsOptional()
  @IsEnum(Tamanho, {
    message: `Tamanho deve ser um dos seguintes valores: ${Object.values(
      Tamanho
    ).join(", ")}`,
  })
  tamanho?: Tamanho;

  @IsOptional()
  @IsNumber({}, { message: "O preço deve ser um número" })
  @Min(0, { message: "Preço deve ser um número positivo" })
  preco?: number;
}
