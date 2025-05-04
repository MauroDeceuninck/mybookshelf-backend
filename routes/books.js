const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const verifyToken = require("../middleware/auth");

// GET books for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// POST a new book
router.post("/", verifyToken, async (req, res) => {
  try {
    const book = new Book({ ...req.body, userId: req.userId });
    const saved = await book.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// PUT (update) an existing book
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Book not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

// DELETE a book
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Book.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deleted) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

module.exports = router;
