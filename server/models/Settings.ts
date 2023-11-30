import { model, Schema } from "mongoose";

const settingsSchema = new Schema(
  {
    messagesDelay: {
      type: String,
      default: "15",
    },
    imagesDelay: {
      type: String,
      default: "15",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SettingsModel = model("settings", settingsSchema);

export { SettingsModel };
