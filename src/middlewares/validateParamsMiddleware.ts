import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateParamsMiddleware(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoInstance = new dtoClass();
    Object.assign(dtoInstance, req.params);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Parâmetros de entrada inválidos",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }
    req.params = dtoInstance;
    next();
  };
}
