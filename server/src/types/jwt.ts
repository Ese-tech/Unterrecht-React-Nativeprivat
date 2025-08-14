// types/jwt.ts
export interface JwtPayload {
  id: string;
  roles?: string[];
  permissions?: string[];
  // weitere Felder falls nötig
}