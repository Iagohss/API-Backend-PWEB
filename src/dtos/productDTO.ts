import { Caimento, Tamanho } from '@prisma/client';

export interface ProductDTO {
    nome: string;
    cor: string;
    tipo: string;
    caimento: Caimento;
    material: string;
    tamanho: Tamanho;
    preco: number;
}
