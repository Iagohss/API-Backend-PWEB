class CartConflictError extends Error {
  constructor(message: string = "O usuário já possui um carrinho aberto.") {
    super(message);
    this.name = "CartConflictError";
  }
}

export default CartConflictError;
