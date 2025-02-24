class UserConflictError extends Error {
  constructor(message: string = "Conflito: email já está em uso.") {
    super(message);
    this.name = "UserConflictError";
  }
}

export default UserConflictError;
