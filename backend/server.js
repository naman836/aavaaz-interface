const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Sentence = require("./models/Sentence");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello i am Backend");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Routes
// Fetch all sentences
app.get("/api/sentences", async (req, res) => {
  try {
    const sentences = await Sentence.find();
    res.json(sentences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/correctSentences/:id",async(req,res)=>{
    const {id}=req.params;
   try {
    const updatedSentence = await Sentence.findOneAndUpdate(
        { id: id },
        {IsUpdated:true,Corrected:"YES corrected yet"},
        { new: true }
      );
      if (!updatedSentence) {
        return res.status(404).send("Sentence not found");
      }
  
      res.send(updatedSentence);
   } catch (error) {
    res.status(500).send(error.message);
   } 
})

// Update a sentence's translation and correctness
app.put("/api/sentences/:id", async (req, res) => {
  const { id } = req.params;
  const { Corrected, isUpdated } = req.body;

  try {
    // Determine the language field to update based on the request body
    const languageField = Object.keys(req.body).find((key) =>
      ["hindi", "spanish", "gujarati", "tamil"].includes(key)
    );

    if (!languageField) {
      return res.status(400).send("Language field not provided");
    }

    // Create a dynamic update object
    const update = {
      [languageField]: req.body[languageField],
      IsUpdated: isUpdated,
      Corrected: Corrected,
    };

    // Perform the update operation
    const updatedSentence = await Sentence.findOneAndUpdate(
      { id: id },
      update,
      { new: true }
    );

    if (!updatedSentence) {
      return res.status(404).send("Sentence not found");
    }

    res.send(updatedSentence);
  } catch (error) {
    res.status(500).send(error.message);
  }
});