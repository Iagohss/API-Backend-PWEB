import { Caimento, Tamanho } from "@prisma/client";

export class ProductFilter {
  nome?: string;
  cor?: string;
  tipo?: string;
  caimento?: Caimento;
  material?: string;
  tamanho?: Tamanho;
  minPrice?: number;
  maxPrice?: number;

  constructor(
    nome?: string,
    cor?: string,
    tipo?: string,
    caimento?: Caimento,
    material?: string,
    tamanho?: Tamanho,
    minPrice?: number,
    maxPrice?: number
  ) {
    this.nome = nome;
    this.cor = cor;
    this.tipo = tipo;
    this.caimento = caimento;
    this.material = material;
    this.tamanho = tamanho;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
