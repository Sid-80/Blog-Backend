import { Router } from "express";
import { verifyJWT } from "../middleware/middleware.js";
import {
  createNewPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/Post.js";

const router = Router();

router.post("/post", verifyJWT, createNewPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPostById);
router.put("/post/:id", verifyJWT, updatePost);
router.delete("/post/:id", verifyJWT, deletePost);

export default router;
