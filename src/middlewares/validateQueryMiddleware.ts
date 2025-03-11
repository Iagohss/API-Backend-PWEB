import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

export function validateQueryMiddleware<T extends object>(
  dtoClass: new () => T
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.query) as T;
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Query strings inválidas",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }

    (req.query as any) = dtoInstance;
    next();
  };
}
