// server/controllers/authController.ts
 import type{ Request, Response, NextFunction } from "express";
 import User from "../models/User";
 import jwt from "jsonwebtoken";
 import { compare } from "bcrypt-ts";
 import config from "../config/config";

 const generateToken = (id: string) => {
    return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: '1h' });
 };

 export const signUp = async (
     req: Request,
     res: Response,
     next: NextFunction
 ) => {
     const { username, email, password } = req.body;
     try {
         const existingUser = await User.findOne({ email });
         if (existingUser) {
             return res.status(400).json({ message: 'E-Mail existiert bereits' });
         }

         const newUser = new User({ username, email, password });
         await newUser.save();

         res.status(201).json({
             _id: newUser._id,
             username: newUser.username,
             email: newUser.email,
            token: generateToken(newUser._id.toString())
         });
     } catch (e) {
         next(e);
     }
 };

 export const signIn = async (
     req: Request,
     res: Response,
     next: NextFunction
 ) => {
     const { email, password } = req.body;
     try {
         const user = await User.findOne({ email });
         if (!user) {
             return res.status(400).json({ message: 'Ungültige Anmeldeinformationen' });
         }

         const isMatch = await compare(password, user.password);
         if (!isMatch) {
             return res.status(400).json({ message: 'Ungültige Anmeldeinformationen' });
         }

         res.status(200).json({
             _id: user._id,
             username: user.username,
             email: user.email,
             token: generateToken(user._id.toString())
         });
     } catch (e) {
         next(e);
     }
 };

 // Logout: clear the auth cookie
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Get own profile (user info from req.user)
export const getOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.user should be set by your auth middleware
    const userId = (req.user as any)?.id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update own profile
export const updateOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req.user as any)?.id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password");
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

 export { signUp as register, signIn as login };