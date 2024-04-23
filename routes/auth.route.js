const express = require("express");
const authRouter = express();
const authController = require("../controllers/auth.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login for user using email and password
 *     tags: [User Auth]
 *     requestBody:
 *       description: Login request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                email: "a@yopmail.com"
 *                password: "Abcd!234"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               access_token: ""
 *               refresh_token: ""
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *              message: "Email or password is wrong!"
 */
authRouter.post("/login", authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register for normal user
 *     tags: [User Auth]
 *     requestBody:
 *       description: Register request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *             example:
 *                email: "a@yopmail.com"
 *                password: "Abcd!234"
 *                full_name: "Dawn Nguyen"
 *     responses:
 *       200:
 *         description: Successful register
 *         content:
 *           application/json:
 *             example:
 *               access_token: ""
 *               refresh_token: ""
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             message: "Email already exists!"
 */
authRouter.post("/register", authController.register);

/**
 * @swagger
 * /auth/refresh_token:
 *   get:
 *     summary: Refresh token
 *     tags: [User Auth]
 *     parameters:
 *      - in: header
 *        name: refresh_token
 *        required: true
 *        description: Refresh token
 *        type: string
 *        example: ""
 *     responses:
 *       200:
 *         description: Successful refresh token
 *         content:
 *           application/json:
 *             example:
 *               access_token: ""
 *               refresh_token: ""
 *       403:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             message: "Access is forbidden"
 */
authRouter.get("/refresh_token", authController.refreshToken);

authRouter.get("/validate", jwtMiddleware.validateToken, authController.validate);

module.exports = authRouter;
