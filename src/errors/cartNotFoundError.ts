class CartNotFoundError extends Error {
  constructor(message: string = "Carrinho não encontrado.") {
    super(message);
    this.name = "CartNotFoundError";
  }
}

export default CartNotFoundError;
