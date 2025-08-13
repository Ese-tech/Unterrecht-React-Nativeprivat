 import type{ Request, Response, NextFunction } from "express";

export const errorHandling = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Fehler", err.message);
    const status = err.status || 500;

    const message = err.message || "Ein Fehler ist aufgetreten";

    res.status(status).json({ message });
};
