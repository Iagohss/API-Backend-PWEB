class PurchaseConflictError extends Error {
    constructor(message = "Já existe uma compra para este carrinho.") {
      super(message);
      this.name = "PurchaseConflictError";
    }
  }
  
  export default PurchaseConflictError;
  