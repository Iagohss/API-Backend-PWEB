import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded.admin) {
      res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
      return;
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
