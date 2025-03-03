import { Caimento, Tamanho } from "@prisma/client";

export interface ProductFilterDTO {
  nome?: string;
  cor?: string;
  tipo?: string;
  caimento?: Caimento;
  material?: string;
  tamanho?: Tamanho;
  minPrice?: number;
  maxPrice?: number;
}
