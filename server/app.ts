import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import fileupload from "express-fileupload";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINAY_CLOUD_NAME,
  PORT,
} from "./config";
import { imagesRoutes, messagesRoutes } from "./routes";

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

app.use("/api/messages", messagesRoutes);
app.use("/api/images", imagesRoutes);

export default app;
