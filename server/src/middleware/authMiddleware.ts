// server/middleware/authMiddleware.ts
 import { Request, Response, NextFunction } from 'express';
 import jwt from 'jsonwebtoken';
 import config from '../config/config';

 interface UserPayload {
     id: string;
 }

 declare global {
     namespace Express {
         interface Request {
             user?: UserPayload;
         }
     }
 }

 const protect = (req: Request, res: Response, next: NextFunction) => {
     let token;
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         try {
             token = req.headers.authorization.split(' ')[1];
             const decoded = jwt.verify(token, config.KEY_CODE) as UserPayload;
             req.user = decoded;
             next();
         } catch (error) {
             res.status(401).json({ message: 'Nicht autorisiert, Token fehlgeschlagen' });
         }
     }
     if (!token) {
         res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
     }
 };

 export default protect;