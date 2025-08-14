// server/src/types/permissions.ts

// Definiert die verfügbaren Berechtigungen im System
export type Permission =
  | "CREATE_USER"
  | "VIEWER_USER"
  | "UPDATE_USER"
  | "DELETE_USER";

// Konstanten für Standardrollen und -berechtigungen
export const DEFAULT_ROLE = ["USER"];
export const DEFAULT_PERMISSIONS = ["VIEWER_USER", "UPDATE_USER"];

// Admin-Rollen und -Berechtigungen
// Admin hat volle Kontrolle über alle Benutzeraktionen
const adminPermissions: Permission[] = [
  "CREATE_USER",
  "VIEWER_USER",
  "UPDATE_USER",
  "DELETE_USER",
];

// Normaler User hat eingeschränkte Berechtigungen
const userPermissions: Permission[] = ["VIEWER_USER", "UPDATE_USER"];
