import { model, Schema } from "mongoose";

const imageSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ImageModel = model("image", imageSchema);

export { ImageModel };
