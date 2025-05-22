import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";



const getAllTasks = asyncHandler( async (req, res)=>{
    console.log(req.user)
    const tasks = await Task.find({user:req.user?._id})

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
    const {title, description,status, priority, dueDate} = req.body

    if (!title){
        throw new ApiError(400,"Title is required")
    }
    

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        user:req.user?._id
    })

    const createdTask = await Task.findById(task._id)


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

const deleteTask = asyncHandler( async (req, res)=>{
    console.log(req.body)
    const {_id} = req.body

    if(!_id){
        throw new ApiError(400,"id not given to delete task")
    }

    await Task.findByIdAndDelete(_id)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            [],
            "Task deleted successfully"
        )
    )
})


const updateTask = asyncHandler( async (req, res)=>{

    /*
        - get all the updated data from the body
        - check if id is avialable
        - update the data using findbyidandupdate method
        - check if data is updated or not
        - return the updated data as response
    */
    const {_id, title, description, status, priority, dueDate} = req.body

    if(!_id){
        throw new ApiError(400, "Id not available for update")
    }

    const updatedTask = await Task.findByIdAndUpdate(
        _id,
        {
            title,
            description,
            status,
            priority,
            dueDate
        },
        {
            new:true
        }
    )

    if(!updatedTask){
        throw new ApiError(400, "Something went wrong while updating the task")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedTask,
            "Task updated successfully"
        )
    )


})


export {
    addTask,
    getAllTasks,
    deleteTask,
    updateTask
}