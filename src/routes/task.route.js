import { Router } from "express";
import { addTask } from "../controllers/task.controller.js";

export const taskRouter = Router()


taskRouter.route('/add-task').post(addTask)