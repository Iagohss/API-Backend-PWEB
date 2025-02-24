class InvalidInputError extends Error {
  constructor(message: string = "Dados de entrada inválidos.") {
    super(message);
    this.name = "InvalidInputError";
  }
}

export default InvalidInputError;
