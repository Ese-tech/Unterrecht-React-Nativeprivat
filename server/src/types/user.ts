// server/src/types/user.ts

import type { InferSchemaType } from "mongoose";
import userSchema from "../models/User";
import type { Permission } from "./permissions";

//Usertype funktioniert jetzt überall: JWT, middleware, req.user, usw.

type BaseUser = InferSchemaType<typeof userSchema>;

export interface UserType {
  username: string;
  password: string;
  email: string;
  roles?: string[];
  permissions?: string[];
}