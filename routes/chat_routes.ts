import { Router } from "express";
import chatController from "../controllers/chat_controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: The Chat API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       required:
 *         - timesStamp
 *         - messeges
 *         - users
 *       properties:
 *         timesStamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the chat
 *         messeges:
 *           type: array
 *           items:
 *             type: string
 *           description: The messages in the chat
 *         users:
 *           type: array
 *           items:
 *             type: string
 *           description: The users participating in the chat
 *       example:
 *         timesStamp: "2024-01-30T12:34:56Z"
 *         messeges: ["Hello", "How are you?"]
 *         users: ["609c6b96f259f218afafd42a", "609c6b96f259f218afafd42b"]
 */

/**
 * @swagger
 * /Chat/getAllMessages:
 *   get:
 *     summary: Get all messages
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: Returns a list of all messages
 */
router.get("/getAllMessages", chatController.getAllMessages);

/**
 * @swagger
 * /chat/getChatByUserId/{_id}:
 *   get:
 *     summary: Get chat by user ID
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve chat for
 *     responses:
 *       200:
 *         description: Returns the chat details for the specified user
 */
router.get("/getChatByUserId/:_id", chatController.getChatByUserId);

/**
 * @swagger
 * /chat/postChat:
 *   post:
 *     summary: Add a new chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: Returns the details of the newly added chat
 */
router.post("/postChat", chatController.postChat);

/**
 * @swagger
 * /chat/updateChat:
 *   post:
 *     summary: Update a chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: Returns the details of the updated chat
 */
router.post("/updateChat", chatController.updateChat);

/**
 * @swagger
 * /chat/deleteAllMessages:
 *   delete:
 *     summary: Delete all messages for a user
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *     responses:
 *       200:
 *         description: All messages for the specified user are deleted
 */
router.delete("/deleteAllMessages", chatController.deleteAllMessages);

export default router;
