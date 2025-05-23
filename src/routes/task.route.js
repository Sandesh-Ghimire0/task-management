import { Router } from "express";
import { addTask, deleteTask, getAllTasks, updateTask } from "../controllers/task.controller.js";
import passport from "../middlewares/localAuth.middleware.js";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";

export const taskRouter = Router()


// const localAuthMiddleware = passport.authenticate('local',{session:false})

// taskRouter.route('/tasks').get(localAuthMiddleware,getAllTasks)
taskRouter.route('/tasks').get(verifyJWT, getAllTasks)
taskRouter.route('/add-task').post(verifyJWT, addTask)
taskRouter.route('/delete-task').post(deleteTask)
taskRouter.route('/update-task').put(updateTask)
