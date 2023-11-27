import cors from "cors";
import express from "express";

import { PORT } from "./config";
import { messagesRoutes } from "./routes";

const app = express();

app.set("port", PORT);

app.use(cors());
app.use(express.json());

app.use("/api/messages", messagesRoutes);

export default app;
