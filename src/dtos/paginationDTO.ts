import { IsOptional, IsNumber, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "O offset deve ser um número" })
  @Min(0, { message: "O offset mínimo deve ser um número positivo" })
  offset: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "O limite deve ser um número" })
  @Min(0, { message: "O limite deve ser um número positivo" })
  @Max(500, { message: "O limite máximo é de 500 itens" })
  limit: number = 500;
}
