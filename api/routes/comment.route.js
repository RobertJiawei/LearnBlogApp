import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-comment", verifyToken, createComment);
router.get("/getPostComments/:postId", getComments);

export default router;
