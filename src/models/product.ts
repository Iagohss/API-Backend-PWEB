import { Caimento, Tamanho } from '@prisma/client';

export class Product {
    id: string;
    nome: string;
    cor: string;
    tipo: string;
    caimento: Caimento;
    material: string;
    tamanho: Tamanho;
    preco: number;

    constructor(tipo: string, nome: string, cor: string, caimento: Caimento, material: string, tamanho: Tamanho, preco: number) {
        this.id = "";
        this.tipo = tipo;
        this.cor = cor;
        this.nome = nome;
        this.caimento = caimento;
        this.material = material;
        this.tamanho = tamanho;
        this.preco = preco;
    }
}
