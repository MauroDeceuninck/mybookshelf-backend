const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  const books = await Book.find({ userId: req.query.userId });
  res.json(books);
});

router.post("/", async (req, res) => {
  console.log("POST body:", req.body); // <--- Add this line

  const book = new Book(req.body);
  const saved = await book.save();
  res.json(saved);
});

router.put("/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
