import express from "express"
import { PORT,mongoDBURL } from "./config.js"
import { Book } from "./models/bookModel.js";
import mongoose from "mongoose";

const app = express()

// MiddleWare for parsing request body
app.use(express.json())

app.get('/',(req,res) => {
  console.log(req);
  return res.status(234).send('welcome to mern stack tutorial')
})


// Route for save a new book
app.post('/books',async (request,response) => {
  try
  {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    )
    {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    }

    const book = await Book.create(newBook)
    return response.status(201).send(book)
  }
  catch (error)
  {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`);

    app.listen(PORT,() => {
      console.log(`App is listening to port http://localhost:${ PORT }`);
    })
  })
  .catch((error) => {
    console.log(error);
  })