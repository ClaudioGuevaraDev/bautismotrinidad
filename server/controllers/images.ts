import { v2 as cloudinary } from "cloudinary";
import { type Request, type Response } from "express";

import { ImageModel } from "../models/Images";

export const getImages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const images = await ImageModel.find({});

    return res.status(200).json({ data: images });
  } catch (error) {
    return res.status(500).end();
  }
};

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    req.files == null ||
    Object.keys(req.files).length === 0 ||
    Array.isArray(req.files.file)
  ) {
    return res.status(400).end();
  }

  try {
    const file = req.files.file;

    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "bautismotrinidad",
    });

    const newImage = new ImageModel({
      publicId: uploaded.public_id,
      url: uploaded.secure_url,
    });
    const insertedImage = await newImage.save();

    return res.status(201).json({ data: insertedImage });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export const deleteImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  const foundedImage = await ImageModel.findById(id);
  if (foundedImage == null) {
    return res.status(404).end();
  }

  try {
    const { publicId } = foundedImage;

    await cloudinary.uploader.destroy(publicId);
    await ImageModel.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
};

export const updateImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const { show } = req.body;

    await ImageModel.findByIdAndUpdate(id, { show });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
};
