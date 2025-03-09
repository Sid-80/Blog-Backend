import { Post } from "../models/Post.js";

export const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, authorId: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { author, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const query = author ? { authorId: author } : {};

    const posts = await Post.find(query)
      .skip(skip)
      .limit(limitNumber)
      .populate("authorId")
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments(query);

    res.json({
      posts,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalPosts / limitNumber),
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById(id).populate("authorId");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: id, authorId: req.user.id },
      { title, content },
      { new: true }
    );
    if (!post)
      return res.status(404).json({ error: "Post not found or unauthorized" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({
      _id: id,
      authorId: req.user.id,
    });
    if (!post)
      return res.status(404).json({ error: "Post not found or unauthorized" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
