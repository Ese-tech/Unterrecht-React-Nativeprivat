// server/src/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// 1. Definiere das erweiterte Interface für das Benutzer-Payload im Token
interface UserPayload {
    id: string;
    roles?: string[];
    permissions?: string[];
}

// 2. Erweitere das Express Request-Objekt
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

// 3. Middleware-Funktion zum Schutz der Routen
const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // ❗ FEHLERBEHEBUNG: Stelle sicher, dass der Token nach dem Split existiert
            if (!token) {
                return res.status(401).json({ message: 'Nicht autorisiert, Token ungültig' });
            }

            // ❗ FEHLERBEHEBUNG: Stelle sicher, dass der geheime Schlüssel existiert
            if (!config.JWT_SECRET) {
                return res.status(500).json({ message: 'Server-Konfigurationsfehler: Geheimer Schlüssel fehlt.' });
            }

            const decoded = jwt.verify(token, config.JWT_SECRET);
            if (typeof decoded === "object" && decoded && "id" in decoded) {
                req.user = decoded as UserPayload;
                next();
            } else {
                res.status(401).json({ message: 'Nicht autorisiert, Token ungültig' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Nicht autorisiert, Token fehlgeschlagen' });
        }
    } else {
        res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
    }
};

export default protect;
