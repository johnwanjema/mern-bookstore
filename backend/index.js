import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js'


const app = express();

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