import mongoose from "mongoose";
import config from "../config/config";

const uri = config.MONGODB_URL;

// Mit dieser Funktion verbinden wir unser Projekt mit MongoDB
export const connect = async () => {
    if (!uri) {
        throw new Error("MONGO_URL ist nicht definiert");
    }
    try {
        // hier entsteht die Verbindung
        mongoose.connection.on("connected", () => {
            console.log("✅ Connected to MongoDB 🛜");
        });

        await mongoose.connect(uri);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
};
