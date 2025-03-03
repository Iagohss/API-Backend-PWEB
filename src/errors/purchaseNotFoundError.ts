class PurchaseNotFoundError extends Error {
    constructor(message = "Compra não encontrada.") {
      super(message);
      this.name = "PurchaseNotFoundError";
    }
  }
  
  export default PurchaseNotFoundError;
  