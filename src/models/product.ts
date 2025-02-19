export class Product {
    id: string;
    tipo: string;
    caimento: string;
    material: string;
    tamanho: string;
    preco: number;

    constructor(tipo: string, caimento: string, material: string, tamanho: string, preco: number) {
        this.id = "";
        this.tipo = tipo;
        this.caimento = caimento;
        this.material = material;
        this.tamanho = tamanho;
        this.preco = preco;
    }
}
