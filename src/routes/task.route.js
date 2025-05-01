import { Router } from "express";
import { addTask, getAllTasks } from "../controllers/task.controller.js";

export const taskRouter = Router()


taskRouter.route('/tasks').get(getAllTasks)
taskRouter.route('/add-task').post(addTask)
