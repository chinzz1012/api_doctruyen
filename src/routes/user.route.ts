import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.get("/verify/:email/:uniqueString", userController.verifyEmail);

router.get("/verified", userController.verified);

router.get("/get-user", userController.getUser);

router.post("/create-user", userController.createUser);

router.post("/login", userController.login);

router.post("/login-token", userController.loginByToken);

export default router;
