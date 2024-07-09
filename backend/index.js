import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'

const app = express();

app.use(express.json());

app.get('/',(request,response)=>{
    return response.status(234).send('Welcome')
})

app.post('/books',async (request, response)=>{
    console.log(request.body)
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message : `Send all required fields: title, author,publishYear `
            })
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book)
      
    }catch(error){
        console.log(error)
        response.status(500).send({message : error.message})
    }
});

// Get all books
app.get('/books',async (request, response)=>{
    console.log(request.body)
    try{
        const books = await Book.find({});

        return response.status(201).json({
            count : books.length,
            data :books
            })
    }catch(error){
        console.log(error)
        response.status(500).send({message : error.message})
    }
});

mongoose.connect( mongoDBURL).then(()=>{
    console.log("App connected to DB")
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`);
    })
}).catch((error)=>{
    console.log(error)
})