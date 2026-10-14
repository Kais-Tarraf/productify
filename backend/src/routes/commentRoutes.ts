import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { createComment, deleteComment } from "../controllers/commentController";

const router = Router();
router.post("/:productId", requireAuth(), createComment);
router.delete("/:commentId", requireAuth(), deleteComment);
export default router;
