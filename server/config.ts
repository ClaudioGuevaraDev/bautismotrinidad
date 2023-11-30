import { config } from "dotenv";

config();

export const PORT = process.env.PORT ?? "3000";
export const MONGODB_URI = process.env.MONGODB_URI ?? "";
export const CLOUDINAY_CLOUD_NAME = process.env.CLOUDINAY_CLOUD_NAME ?? "";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY ?? "";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET ?? "";
export const USER_ADMIN = process.env.USER_ADMIN ?? "";
export const USER_PASSWORD = process.env.USER_PASSWORD ?? "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
