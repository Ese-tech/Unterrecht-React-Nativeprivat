// server/src/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// 1. Definiere das Interface für das Benutzer-Payload im Token
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
    // ❗ FIXED: Variable umbenennen - authToken statt token
    let authToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrahiere den Token aus dem Authorization Header
            authToken = req.headers.authorization.split(' ')[1];
            
            // ❗ FIXED: JWT_SECRET Validierung BEVOR jwt.verify()
            const jwtSecret = config.JWT_SECRET;
            if (!jwtSecret) {
                return res.status(500).json({ message: 'Server-Konfigurationsfehler: JWT_SECRET nicht gesetzt' });
            }
            
            // Jetzt verwenden wir authToken und jwtSecret - beide sind garantiert strings
            const decoded = jwt.verify(authToken, jwtSecret);

            // Type-Check: Ist decoded ein Objekt und hat es ein id-Feld?
            if (typeof decoded === "object" && decoded && "id" in decoded) {
                req.user = decoded as UserPayload;
                next();
            } else {
                res.status(401).json({ message: 'Nicht autorisiert, Token ungültig' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Nicht autorisiert, Token fehlgeschlagen' });
        }
        return;
    }

    res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
};

export default protect;
