import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(logout)