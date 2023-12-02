import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import fileupload from "express-fileupload";
import path from "path";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINAY_CLOUD_NAME,
  PORT,
} from "./config";
import {
  authRoutes,
  imagesRoutes,
  messagesRoutes,
  settingsRoutes,
} from "./routes";

const app = express();

cloudinary.config({
  cloud_name: CLOUDINAY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

app.set("port", PORT);

app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.use("/", express.static(path.join(__dirname, "..", "client", "dist")));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/settings", settingsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

export default app;
