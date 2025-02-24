class ProductNotFoundError extends Error {
  constructor(message: string = "Produto não encontrado.") {
    super(message);
    this.name = "ProductNotFoundError";
  }
}

export default ProductNotFoundError;
