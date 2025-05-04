const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  status: String,
  notes: String,
  userId: String,
});

module.exports = mongoose.model("Book", BookSchema);
