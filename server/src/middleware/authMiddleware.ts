// server/src/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { get } from 'mongoose';

// 1. Definiere das Interface für das Benutzer-Payload im Token
//    Dieses Interface wird benötigt, um die Daten im JWT-Token zu typisieren
//    und sie dem Express Request-Objekt hinzuzufügen.
interface UserPayload {
  id: string;
  roles?: string[];
  permissions?: string[];
}
// 2. Erweitere das Express Request-Objekt, um das 'user'-Feld hinzuzufügen
//    Dies ermöglicht es uns, in späteren Routen auf `req.user` zuzugreifen.
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
            
            const decoded = jwt.verify(token, config.JWT_SECRET as string);
        

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
        return; // Wichtig: Sonst läuft der Code unten weiter!
    }

    res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
};


export default protect;
