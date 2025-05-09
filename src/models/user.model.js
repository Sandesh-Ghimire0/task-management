import mongoose, {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
        },
    },
    {
        timestamps:true
    }
)

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword

    next()

})


userSchema.methods.isPasswordCorrect = async function(password){
    const isMatched = await bcrypt.compare(this.password, password)
    return isMatched
}
export const User = model('User',userSchema)