import mongoose, {Schema, model} from 'mongoose'

const taskSchema = new Schema(
    {
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
        }
    }
,{timestamps:true})


export const Task = model('Task',taskSchema)