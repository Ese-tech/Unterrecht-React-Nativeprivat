// types/express/index.d.ts
//types/express.d.ts
//sehr wichtig für req.id
import { JwtPayload } from "./jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}