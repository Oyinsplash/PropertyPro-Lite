import express from "express";
import UserController from "../controllers/auth";

const router = express.Router();

router.post("/signup", UserController.createAccount);

export default router;
