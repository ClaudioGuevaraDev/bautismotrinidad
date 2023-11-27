import { type Request, type Response } from "express";

import { MessageModel } from "../models/Message";

export const getMessages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const messages = await MessageModel.find({});

    return res.status(200).json({ data: messages });
  } catch (error) {
    return res.status(500).end();
  }
};

export const createMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { text } = req.body;

    const newMessage = new MessageModel({ text });
    const createdMessage = await newMessage.save();

    return res.status(201).json({ data: createdMessage });
  } catch (error) {
    return res.status(500).end();
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;

    await MessageModel.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
};

export const updateMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const { text } = req.body;

    await MessageModel.findByIdAndUpdate(id, { text });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
};
