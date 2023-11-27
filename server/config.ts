import { config } from "dotenv";

config();

export const PORT = process.env.PORT ?? "3000";
export const MONGODB_URI = process.env.MONGODB_URI ?? "";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY ?? "";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET ?? "";
