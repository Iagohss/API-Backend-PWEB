class CartClosedError extends Error {
  constructor(message: string = "Não é possível alterar um carrinho fechado") {
    super(message);
    this.name = "CartClosedError";
  }
}

export default CartClosedError;
