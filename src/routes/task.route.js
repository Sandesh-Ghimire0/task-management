import { Router } from "express";
import { addTask, deleteTask, getAllTasks, updateTask } from "../controllers/task.controller.js";

export const taskRouter = Router()


taskRouter.route('/tasks').get(getAllTasks)
taskRouter.route('/add-task').post(addTask)
taskRouter.route('/delete-task').post(deleteTask)
taskRouter.route('/update-task').put(updateTask)
