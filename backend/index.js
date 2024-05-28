import express from "express"
import { PORT,mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js"

const app = express()

// MiddleWare for parsing request body
app.use(express.json())

app.get('/',(req,res) => {
  console.log(req);
  return res.status(234).send('welcome to mern stack tutorial')
})

app.use('/books',booksRoute)

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