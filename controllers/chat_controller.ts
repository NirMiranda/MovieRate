import { Request, Response } from "express";
import Chat, { chatType } from "../models/chat_model";

const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Chat.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getChatByUserId = async (req: Request, res: Response) => {
    const userId = req.params._id;
    try {
        const chat = await Chat.findOne({ users: userId });
        if (chat) {
            res.status(200).json(chat);
        } else {
            res.status(404).send("Chat not found for the specified user");
        }
    } catch (error) {
        console.error("Error retrieving chat by user ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

const postChat = async (req: Request, res: Response) => {
    const { timesStamp, messeges, users } = req.body;
    try {
        const chat = new Chat({ timesStamp, messeges, users });
        const savedChat = await chat.save();
        res.status(201).json(savedChat);
    } catch (error) {
        console.error("Error saving chat:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteAllMessages = async (req: Request, res: Response) => {
    const userId = req.params._id;
    try {
        const deletedMessages = await Chat.deleteMany({ users: userId });
        if (deletedMessages.deletedCount && deletedMessages.deletedCount > 0) {
            res.status(200).send(`Deleted ${deletedMessages.deletedCount} messages for user ${userId}`);
        } else {
            res.status(404).send("No messages found for the specified user");
        }
    } catch (error) {
        console.error("Error deleting messages:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateChat = async (req: Request, res: Response) => {
    const { timesStamp, messeges, users } = req.body;
    try {
        const updatedChat = await Chat.findOneAndUpdate(
            { users },
            { timesStamp, messeges },
            { new: true }
        );
        if (updatedChat) {
            res.status(200).json(updatedChat);
        } else {
            res.status(404).send("Chat not found");
        }
    } catch (error) {
        console.error("Error updating chat:", error);
        res.status(500).send("Internal Server Error");
    }
};

export default {
    getAllMessages,
    getChatByUserId,
    postChat,
    deleteAllMessages,
    updateChat,
};
