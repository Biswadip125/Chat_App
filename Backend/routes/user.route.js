import express from "express";
import { getOtherUsers } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getOtherUsers);

export default router;
