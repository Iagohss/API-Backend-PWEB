export class Purchase {
    id: string;
    cartId: string;
    precoTotal: number;
    formaPagamento: string;
    data: Date;

    constructor(cartId: string, precoTotal: number, formaPagamento: string, data: Date = new Date()) {
        this.id = "";
        this.cartId = cartId;
        this.precoTotal = precoTotal;
        this.formaPagamento = formaPagamento;
        this.data = data;
    }
}
