import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


const registerUser = asyncHandler( async (req, res)=>{
    const {username, email, password } = req.body

    if(!username){
        throw new ApiError(400,'username not given')
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        throw new ApiError(400, "User already exist")
    }
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        throw new ApiError(400, "email already exist")
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id)


    if(!createdUser){
        throw new ApiError(400,"something went wrong while creating the user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User created successfully !!!"
        )
    )

})


const login = asyncHandler( async (req, res)=>{
    const {email, password} = req.body
    if(!email && !password){
        throw new ApiError(400, "Email and password is required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400, "Incorrect password")
    }

    const accessToken = await user.generateAccessToken()
    const loggedInUser = await User.findById(user._id)

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie('accessToken',accessToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken
            },
            "User logged in Successfully !!!"
        )
    )

})


const logout = asyncHandler( async (req, res) => {
    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie('accessToken',options)
    .json(
        new ApiResponse(
            200,{},"User logged out successfullly...!!!"
        )
    )
})




export { 
    registerUser,
    login,
    logout
}