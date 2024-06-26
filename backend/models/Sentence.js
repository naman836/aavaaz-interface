const mongoose = require("mongoose");

const sentenceSchema = new mongoose.Schema({
  id:{type:Number},
  text: { type: String, required: true },
  hindi: { type: String, required: true },
  IsUpdated:{
    type:Boolean,
    required:true
  },
  spanish: { type: String, required: true},
  tamil: { type: String, required: true},
  gujarati: { type: String, required: true},
Corrected: { type: String, default: null },
});

module.exports = mongoose.model("Sentence", sentenceSchema);

// const sentenceSchema = new mongoose.Schema({
//     english: { type: String, required: true },
//     hindi: { type: String, required: true },
//     isCorrect: { type: Boolean, default: null }
//   });