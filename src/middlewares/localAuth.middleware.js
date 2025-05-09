import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { User } from '../models/user.model.js'
import {ApiError} from '../utils/apiError.js'

passport.use( new LocalStrategy( async (username, password, done) =>{
    try {
        const user = await User.findOne({username})

        if(!user){
            // throw new ApiError(400, "User not found")
            return done(null, false, {message:"User not found"})
        }

        const isMatched = await user.isPasswordCorrect(password)
        if(isMatched){
            return done(null, user)
        } else{
            return done(null, false, {message:"Incorrect password"})
        }

    } catch (error) {
        console.log(error.message)
        return done(error)
    }
}))

export default passport