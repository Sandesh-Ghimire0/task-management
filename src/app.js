import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
})) // to allow or restrict requests from the origin specified in .env

app.use(express.json({limit:'16kb'})) // Parses incoming JSON payloads in req.body.

// Parses URL-encoded data (from HTML form submissions) into req.body.
//Useful if you're submitting traditional HTML forms with POST method.
app.use(express.urlencoded({extended:true}))

// Serves static assets from a public folder e.g. http://localhost:8000/logo.png without defining route
app.use(express.static('public')) 

app.use(cookieParser()) // it is used to read and write the cookies from the user browser


//-----------------------------------------------------------------------------------------

import { taskRouter } from './routes/task.route.js'
app.use('/api/task',taskRouter)