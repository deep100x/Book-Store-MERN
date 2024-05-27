import mongoose from "mongoose";

const testSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Test = mongoose.model('Test',testSchema)



//index.js
import { Test } from "./models/testModel.js";
app.post('/test',async (req,res) => {
  try
  {
    if (
      !req.body.title
    )
    {
      return res.status(400).send({
        message: 'Send all details'
      })
    }
    const newTest = {
      title: req.body.title
    }
    const test = await Test.craete(newTest)
    return req.status(201).send(test)
  }
  catch (error)
  {
    console.log(error);
  }
})
