const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create Express app
const app = express();
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose
  .connect(
    MONGOURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Define a Mongoose schema for keep posts
const keepSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Define a Mongoose model for keep posts
const KeepPost = mongoose.model("KeepPost", keepSchema);

// Parse JSON request bodies
app.use(bodyParser.json());

// Define GET endpoint for retrieving all keep posts
app.get("/", async (req, res) => {
  try {
    const posts = await KeepPost.find();
    res.json(posts);
  } catch (err) {
    console.error("Error retrieving posts", err);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

// Define POST endpoint for creating a new keep post
app.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newPost = new KeepPost({ title, content });
  await newPost.save();
  res.json(newPost);
});

// PUT an existing blog post
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await KeepPost.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  res.json(updatedPost);
});

// Define DELETE endpoint for deleting a keep post by title
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await KeepPost.deleteOne({ _id: id });
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(deletedPost);
  } catch (err) {
    console.error("Error deleting post", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
