import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";



const getAllTasks = asyncHandler( async (req, res)=>{
    const tasks = await Task.find()

    if(!tasks){
        throw new ApiError(400, "something went wrong while retrivieng the tasks")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            tasks,
            "All Tasks retrieved successfully"
        )
    )
})


const addTask = asyncHandler( async (req, res)=>{
    /*  
        - get the data from the body
        - validate: not empty
        - create task object in db
        - return response
    */ 
    console.log(req.body)
    const {title, description,status, priority, dueDate} = req.body

    if (!title){
        throw new ApiError(400,"Title is required")
    }
    

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate
    })

    const createdTask = await Task.findById(task._id)

    console.log(createdTask)

    if(!createdTask){
        throw new ApiError(400, "Something went wrong while adding the task")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdTask,
            "Task Added SuccessFully !!!"
        )
    )
})

export {
    addTask,
    getAllTasks
}