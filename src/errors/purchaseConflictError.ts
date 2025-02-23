class PurchaseConflictError extends Error {
    constructor(message = "Conflito ao processar a compra.") {
      super(message);
      this.name = "PurchaseConflictError";
    }
  }
  
  export default PurchaseConflictError;
  