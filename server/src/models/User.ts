 // server/models/User.ts

 import { Schema, model, InferSchemaType } from "mongoose";
 import validator from "validator";
 import { hash } from "bcrypt-ts";

 //1. Schema erstellen
 const userSchema = new Schema({
     username: {
         type: String,
         required: true,
     },
     email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         validate: [validator.isEmail, "Bitte eine gültige E-Mail-Adresse angeben"],
     },
     password: {
         type: String,
         required: true,
         minlength: 6,
     },
 });

//#### Bereinigung + Password Erstellung
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
    }
    next();
});

 export type UserType = InferSchemaType<typeof userSchema>;

//3. Modell erstellen
const User = model<UserType>("User", userSchema);

//4. export
export default User;