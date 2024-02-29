import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-comment", verifyToken, createComment);
router.get("/getPostComments/:postId", getComments);
router.put("/like-comment/:commentId", verifyToken, likeComment);
router.put("/edit-comment/:commentId", verifyToken, editComment);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);

export default router;
