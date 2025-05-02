import mongoose, {Schema, model} from 'mongoose'

const taskSchema = new Schema(
    {
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
        },
        status:{
            type:String,
            enum:['pending','in-progress','completed','delayed'],
            default:'pending'
        },
        priority:{
            type:String,
            enum:['low','medium','high'],
            default:'medium'
        },
        dueDate:{
            type:Date,
        }
    }
,{timestamps:true})


export const Task = model('Task',taskSchema)