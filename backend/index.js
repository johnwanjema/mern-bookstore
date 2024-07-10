import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js'
import cors from 'cors'

const app = express();

//Middleware for handling cors
//option 1: Allow all origins
app.use(cors({
    origin:'http://127.0.0.1:3000/',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['content-Type']
}))

//option 2 : Allow custom origins
app.use(cors())


app.use(express.json());

app.get('/',(request,response)=>{
    return response.status(234).send('Welcome')
})

app.use('/books', booksRoute);

mongoose.connect( mongoDBURL).then(()=>{
    console.log("App connected to DB")
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`);
    })
}).catch((error)=>{
    console.log(error)
})