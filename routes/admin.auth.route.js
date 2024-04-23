const express = require("express");
const adminAuthRouter = express();
const adminAuthController = require("../controllers/admin.auth.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

/**
 * @swagger
 * /admin/auth/login:
 *   post:
 *     summary: Login for admin using email and password
 *     tags: [Admin Auth]
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
 *                password: "AdminVjpPro!234"
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
adminAuthRouter.post("/login", adminAuthController.login);


/**
 * @swagger
 * /admin/auth/refresh_token:
 *   get:
 *     summary: Refresh token
 *     tags: [Admin Auth]
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
adminAuthRouter.get("/refresh_token", adminAuthController.refreshToken);

adminAuthRouter.get("/validate", jwtMiddleware.validateToken, adminAuthController.validate);

module.exports = adminAuthRouter;
