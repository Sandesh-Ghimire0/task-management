import { Router } from "express";
import { login, registerUser } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(login)