// server/src/controllers/userController.ts

import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/User";
import mongoose from "mongoose";
import type{ UserType } from "../types/user";

/*****
 * @Get All Users
 *
 **/
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      throw createHttpError(401, "Du wirst nicht zugelassen");
    }
    res.status(200).json({ message: "succesfull", users });
  } catch (error) {
    next(error);
  }
};
/*****
 * @Get One User by ID
 *
 **/
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    //if (!mongoose.Types.ObjectId.isValid(id)) {
    if (!id) {
      throw createHttpError(404, "Benutzer nicht gefunden");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(404, "Ungültiger Benutzer-Id");
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw createHttpError(404, "Benutzer nicht gefunden");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/*****
 *
 * @UPDATE One User by ID
 *
 **/
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //change any requests
  const userFields: (keyof UserType)[] = [
    "username",
    "password",
    "email",
    "roles",
    "permissions",
  ];

  const id = req.params.id;
  try {
    if (!id) throw createHttpError(400, "Benutzer-Id nicht gefunden");

    if (!mongoose.Types.ObjectId.isValid(id))
      throw createHttpError(400, "Ungültiger Benutzer-Id");

    const user = await User.findById(id);

    if (!user) throw createHttpError(404, "Benutzer nicht gefunden");

   for (let field of userFields) {
  if (req.body[field] !== undefined) {
    (user as any)[field] = req.body[field];
  }
}
    await user.save();
    res.status(200).json({ message: "Profil wurde aktualisert", user });
  } catch (error) {
    next(error);
  }
};
/* ** */
//DELETE One User by ID
export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw createHttpError(400, "Benutzer-Id gibt es nicht");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(400, "Ungültiger Benutzer-Id ");
    }
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `Benutzer mit der id:${id} wurde gelöscht` });
  } catch (error) {
    next(error);
  }
};