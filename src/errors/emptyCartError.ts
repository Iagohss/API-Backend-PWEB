class EmptyCartError extends Error {
  constructor(message: string = "Não é possível comprar um carrinho vazio") {
    super(message);
    this.name = "EmptyCartError";
  }
}

export default EmptyCartError;
