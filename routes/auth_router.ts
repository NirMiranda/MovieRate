import Router, { NextFunction } from "express";
import auth from '../controllers/auth_controller';
import express, { Request, Response } from "express";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Authentication API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - age
 *         
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         age:
 *           type: number
 *           description: The user age
 *         name:
 *           type: string
 *           description: The user name
 *       example:
 *         email: bob@gmail.com
 *         password: '123456'
 *         age: 25
 *         name: ilay
 */

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request (e.g., validation error)
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', (req: Request, res: Response) => {
    auth.register(req, res);
});
/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*           - accessToken
*           - refreshToken
*       properties:
*           accessToken:
*               type: string
*               description: The JWT access token
*           refreshToken:
*               type: string
*               description: The JWT refresh token
*       example:
*           accessToken: '123cd123x1xx1'
*           refreshToken: '134r2134cr1x3c'
  */
/**
* @swagger
* /auth/login:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/User'
*     responses:
*       200:
*           description: The acess & refresh tokens
*           content:
*               application/json:
*                   schema:
*                     $ref: '#/components/schemas/Tokens'
*       401:
*         description: Unauthorized (invalid credentials)
*       500:
*         description: Internal Server Error
*/
router.post('/login', (req: Request, res: Response) => {
    auth.login(req, res);
});

router.post('/google', (req: Request, res: Response) => {
    auth.googleSignIn(req, res);
});
/**
* @swagger
* /auth/logout:
*   post:
*     summary: logout a user
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Internal Server Error
 */
router.post('/logout', (req: Request, res: Response) => {
    auth.logout(req, res);
});
/**
* @swagger
* /auth/refreshToken:
*   post:
*     summary: get a new access token using the refresh token
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*          description: The acess & refresh tokens
*          content:
*             application/json:
*               schema:
*                   $ref: '#/components/schemas/Tokens'
*/
router.post('/refreshToken', (req: Request, res: Response) => {
    auth.refreshToken(req, res);
});

export default router;
