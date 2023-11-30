import { type Request, type Response } from "express";

import { SettingsModel } from "../models/Settings";

export const getSettings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const settings = await SettingsModel.find();
    if (settings.length === 0) {
      const createSettings = new SettingsModel();
      const createdSettings = await createSettings.save();
      return res.status(200).json({ data: [createdSettings] });
    }
    return res.status(200).json({ data: settings });
  } catch (error) {
    return res.status(500).end();
  }
};

export const updateSettings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { messagesDelay, imagesDelay } = req.body;
    const id = req.params.id;

    await SettingsModel.findByIdAndUpdate(id, {
      $set: { messagesDelay, imagesDelay },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
};
