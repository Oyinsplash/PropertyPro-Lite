import express from "express";
import UserController from "../controllers/auth";
import Validator from "../middleware/validate";

const router = express.Router();

router.post(
  "/signup",
  Validator.validateSignUp(),
  Validator.myValidationResult,
  UserController.createAccount
);

router.post(
  "/signin",
  // Validator.validateSignIn(),
  // Validator.myValidationResult,
  UserController.loginAccount
);

export default router;
