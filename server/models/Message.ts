import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MessageModel = model("message", messageSchema);

export { MessageModel };
